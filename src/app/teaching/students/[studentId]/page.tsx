'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, BookOpen, Edit, UserCircle, FileText, CalendarCheck2, Info, Eye, MessageCircle, AlertTriangle as AnomalyIcon, Brain as AiIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";


interface AssignmentData {
  id: string;
  name: string;
  type: 'Tarea' | 'Examen' | 'Proyecto' | 'Oral';
  dueDate: string;
  submittedDate?: string;
  grade?: number | string;
  status: 'Pendiente' | 'Entregado' | 'Calificado' | 'Atrasado';
  submissionLink?: string;
  evaluationType?: 'standard' | 'ai';
  aiEvaluationSummary?: string;
  aiAnomalyReport?: string;
  aiFullTranscriptLink?: string; // Placeholder for now
}

interface EnrolledCourseData {
  id: string;
  title: string;
  overallProgress: number;
  assignments: AssignmentData[];
  averageGrade?: number;
}

interface StudentDetailData {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  avatarFallback: string;
  profileAiHint: string;
  joinedDate: string;
  enrolledCourses: EnrolledCourseData[];
  educatorNotes?: string;
}

const mockStudentsDetails: StudentDetailData[] = [
  {
    id: 's1',
    name: 'Alicia Wonderland',
    email: 'alicia.w@example.com',
    avatarUrl: 'https://placehold.co/100x100.png',
    avatarFallback: 'AW',
    profileAiHint: 'estudiante sonriendo',
    joinedDate: '2023-09-15',
    enrolledCourses: [
      {
        id: 'courseAdvMath',
        title: 'Álgebra Avanzada',
        overallProgress: 85,
        averageGrade: 9.2,
        assignments: [
          { id: 'am-t1', name: 'Tarea 1: Ecuaciones Lineales', type: 'Tarea', dueDate: '2024-07-10', submittedDate: '2024-07-09', grade: 9, status: 'Calificado', submissionLink: '#', evaluationType: 'standard' },
          { id: 'am-e1', name: 'Examen Parcial 1 (IA)', type: 'Examen', dueDate: '2024-07-20', submittedDate: '2024-07-20', grade: 8.5, status: 'Calificado', evaluationType: 'ai', aiEvaluationSummary: 'Alicia demostró un buen entendimiento de los conceptos de derivadas, pero tuvo algunas dificultades con integrales complejas. Respondió consistentemente y sin demoras inusuales.', aiAnomalyReport: 'No se detectaron anomalías significativas. Una respuesta fue ligeramente más rápida de lo esperado, pero dentro de los límites aceptables.', aiFullTranscriptLink: '#' },
          { id: 'am-p1', name: 'Proyecto: Modelado Matemático', type: 'Proyecto', dueDate: '2024-08-05', status: 'Pendiente', evaluationType: 'standard' },
        ]
      },
      {
        id: 'courseIntroCS',
        title: 'Introducción a Ciencias de la Computación',
        overallProgress: 70,
        averageGrade: 8.0,
        assignments: [
          { id: 'cs-t1', name: 'Actividad: Pseudocódigo (IA)', type: 'Tarea', dueDate: '2024-07-15', submittedDate: '2024-07-14', grade: 'Aprobado', status: 'Calificado', evaluationType: 'ai', aiEvaluationSummary: 'El estudiante comprendió bien los bucles y condicionales. Se mostró seguro en sus respuestas.', aiAnomalyReport: 'Ligera vacilación al explicar la recursividad, pero no parece ser una anomalía mayor.', aiFullTranscriptLink: '#' },
          { id: 'cs-t2', name: 'Tarea 2: Algoritmos Básicos', type: 'Tarea', dueDate: '2024-07-25', status: 'Pendiente', evaluationType: 'standard' },
        ]
      },
    ],
    educatorNotes: 'Alicia muestra gran interés en álgebra, pero necesita repasar los conceptos básicos de estructuras de datos en CS.'
  },
  {
    id: 's2',
    name: 'Roberto El Constructor',
    email: 'roberto.builder@example.com',
    avatarUrl: 'https://placehold.co/100x100.png',
    avatarFallback: 'RB',
    profileAiHint: 'estudiante concentrado',
    joinedDate: '2023-10-01',
    enrolledCourses: [
      {
        id: 'coursePhysics',
        title: 'Física Aplicada',
        overallProgress: 60,
        averageGrade: 7.5,
        assignments: [
          { id: 'phy-t1', name: 'Práctica de Laboratorio 1', type: 'Tarea', dueDate: '2024-07-12', submittedDate: '2024-07-15', grade: 7, status: 'Atrasado', submissionLink: '#', evaluationType: 'standard' },
          { id: 'phy-e1', name: 'Examen de Cinemática (IA)', type: 'Examen', dueDate: '2024-07-28', status: 'Pendiente', evaluationType: 'ai', aiEvaluationSummary: 'Pendiente de evaluación.', aiAnomalyReport: 'Pendiente de evaluación.', aiFullTranscriptLink: '#' },
        ]
      },
    ],
  },
];

const getStudentDetailsById = (id: string): StudentDetailData | undefined => {
  return mockStudentsDetails.find(student => student.id === id) || mockStudentsDetails[0]; // Fallback for safety in mock
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
};

const getStatusBadgeVariant = (status: AssignmentData['status']) => {
  switch (status) {
    case 'Calificado': return 'default';
    case 'Entregado': return 'secondary';
    case 'Pendiente': return 'outline';
    case 'Atrasado': return 'destructive';
    default: return 'outline';
  }
};


export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const studentId = params.studentId as string;

  const [studentData, setStudentData] = React.useState<StudentDetailData | null | undefined>(undefined);
  const [isGradeModalOpen, setIsGradeModalOpen] = React.useState(false);
  const [selectedCourseForGrades, setSelectedCourseForGrades] = React.useState<EnrolledCourseData | null>(null);
  
  const [isAiEvaluationDetailModalOpen, setIsAiEvaluationDetailModalOpen] = React.useState(false);
  const [selectedAiAssignmentDetails, setSelectedAiAssignmentDetails] = React.useState<AssignmentData | null>(null);
  const [educatorGrade, setEducatorGrade] = React.useState('');
  const [educatorComments, setEducatorComments] = React.useState('');


  React.useEffect(() => {
    if (studentId) {
      const data = getStudentDetailsById(studentId);
      setStudentData(data);
    }
  }, [studentId]);

  const handleViewCourseGrades = (course: EnrolledCourseData) => {
    setSelectedCourseForGrades(course);
    setIsGradeModalOpen(true);
  };

  const handleViewAiEvaluationDetails = (assignment: AssignmentData) => {
    setSelectedAiAssignmentDetails(assignment);
    setEducatorGrade(assignment.grade?.toString() || '');
    setEducatorComments(''); // Reset comments
    setIsAiEvaluationDetailModalOpen(true);
  };

  const handleSaveEducatorGrade = () => {
    if (!selectedAiAssignmentDetails) return;
    console.log("Guardando calificación para:", selectedAiAssignmentDetails.name);
    console.log("Nota:", educatorGrade);
    console.log("Comentarios:", educatorComments);
    // En una app real, aquí se haría una llamada API para guardar
    toast({
        title: "Calificación Guardada (Simulación)",
        description: `La nota para "${selectedAiAssignmentDetails.name}" ha sido registrada.`,
    });
    setIsAiEvaluationDetailModalOpen(false);
    // Opcional: actualizar localmente el estado de la tarea si es necesario
  };

  if (studentData === undefined) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground">Cargando datos del estudiante...</p>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="space-y-8 pt-8 text-center">
        <Info className="mx-auto h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold text-destructive">Estudiante no encontrado</h2>
        <p className="text-muted-foreground">No se pudo encontrar la información para el estudiante con ID: {studentId}</p>
        <Button variant="outline" onClick={() => router.push('/teaching/students')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Listado de Estudiantes
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={studentData.avatarUrl} alt={studentData.name} data-ai-hint={studentData.profileAiHint} />
            <AvatarFallback>{studentData.avatarFallback}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-headline font-bold text-primary">{studentData.name}</h1>
            <p className="text-sm text-muted-foreground">{studentData.email}</p>
            <p className="text-xs text-muted-foreground">Miembro desde: {formatDate(studentData.joinedDate)}</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => router.push('/teaching/students')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Listado
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><BookOpen className="mr-2 text-primary" />Cursos y Progreso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {studentData.enrolledCourses.length > 0 ? (
                studentData.enrolledCourses.map(course => (
                  <Card key={course.id} className="bg-muted/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                       {course.averageGrade && <CardDescription>Promedio en este curso: {course.averageGrade.toFixed(1)}/10</CardDescription>}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Progreso General:</span>
                        <span className="text-sm font-semibold text-primary">{course.overallProgress}%</span>
                      </div>
                      <Progress value={course.overallProgress} className="h-2" />
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary"
                        onClick={() => handleViewCourseGrades(course)}
                      >
                        Ver Calificaciones del Curso
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground">Este estudiante no está inscrito en ningún curso actualmente.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><UserCircle className="mr-2 text-primary"/>Resumen General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong className="text-muted-foreground">Cursos Activos:</strong> {studentData.enrolledCourses.length}</p>
              <p><strong className="text-muted-foreground">Promedio Global (Estimado):</strong> {
                studentData.enrolledCourses.length > 0 && studentData.enrolledCourses.some(c => c.averageGrade) ?
                (studentData.enrolledCourses.filter(c=>c.averageGrade).reduce((acc, c) => acc + (c.averageGrade || 0), 0) / studentData.enrolledCourses.filter(c => c.averageGrade).length).toFixed(1) + "/10"
                : 'N/A'
              }</p>
              <p className="text-muted-foreground pt-2">Más estadísticas próximamente...</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><FileText className="mr-2 text-primary"/>Notas del Educador</CardTitle>
            </CardHeader>
            <CardContent>
              {studentData.educatorNotes ? (
                <p className="text-sm text-muted-foreground whitespace-pre-line">{studentData.educatorNotes}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">No hay notas para este estudiante.</p>
              )}
              <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => toast({title: "Funcionalidad Próxima", description: "La edición de notas estará disponible pronto."})}>
                <Edit className="mr-2 h-4 w-4" /> Editar Notas
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal para Calificaciones del Curso */}
      {selectedCourseForGrades && (
        <Dialog open={isGradeModalOpen} onOpenChange={setIsGradeModalOpen}>
          <DialogContent className="sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl text-primary flex items-center">
                <CalendarCheck2 className="mr-2 h-6 w-6" />Calificaciones: {selectedCourseForGrades.title}
              </DialogTitle>
              <DialogDescription>
                Detalle de entregas y calificaciones para {studentData.name} en este curso.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 max-h-[60vh] overflow-y-auto">
              {selectedCourseForGrades.assignments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Actividad</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fecha Límite</TableHead>
                      <TableHead>Fecha Envío</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Calificación</TableHead>
                      <TableHead className="text-center">Acción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCourseForGrades.assignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">{assignment.name}</TableCell>
                        <TableCell>{assignment.type}</TableCell>
                        <TableCell>{formatDate(assignment.dueDate)}</TableCell>
                        <TableCell>{formatDate(assignment.submittedDate)}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(assignment.status)}>
                            {assignment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-right">
                          {assignment.grade !== undefined ? assignment.grade.toString() : 'S/C'}
                        </TableCell>
                        <TableCell className="text-center">
                          {assignment.evaluationType === 'ai' ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleViewAiEvaluationDetails(assignment)}
                              title="Ver Evaluación IA"
                            >
                              <AiIcon className="h-4 w-4 text-primary" />
                            </Button>
                          ) : assignment.submissionLink && (assignment.status === 'Entregado' || assignment.status === 'Calificado' || assignment.status === 'Atrasado') ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => window.open(assignment.submissionLink, '_blank')}
                              title="Ver entrega estándar"
                            >
                              <Eye className="h-4 w-4 text-primary" />
                            </Button>
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground text-center py-8">No hay actividades o calificaciones registradas para este curso.</p>
              )}
            </div>
            <DialogFooter className="sm:justify-start">
              <Button onClick={() => setIsGradeModalOpen(false)} variant="outline">
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal para Detalles de Evaluación IA */}
      {selectedAiAssignmentDetails && (
        <Dialog open={isAiEvaluationDetailModalOpen} onOpenChange={setIsAiEvaluationDetailModalOpen}>
            <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl text-primary flex items-center">
                        <AiIcon className="mr-2 h-6 w-6"/>Detalles de Evaluación IA: {selectedAiAssignmentDetails.name}
                    </DialogTitle>
                    <DialogDescription>
                        Revisión del desempeño de {studentData.name} y resumen generado por la IA.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center"><MessageCircle className="mr-2 text-accent"/>Resumen de la IA</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">{selectedAiAssignmentDetails.aiEvaluationSummary || "No hay resumen disponible."}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center"><AnomalyIcon className="mr-2 text-destructive"/>Patrones Anómalos Detectados por IA</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-sm text-muted-foreground whitespace-pre-line">{selectedAiAssignmentDetails.aiAnomalyReport || "No se detectaron patrones anómalos."}</p>
                        </CardContent>
                    </Card>
                    
                    <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => toast({ title: "Funcionalidad Próxima", description: "La visualización completa del chat estará disponible pronto."})}
                    >
                        Ver Transcripción Completa del Chat
                    </Button>

                    <Card className="border-primary/50">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center"><Edit className="mr-2 text-primary"/>Calificación y Feedback del Educador</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="educatorGrade">Nota Final (Ej: 8.5, Aprobado)</Label>
                                <Input 
                                    id="educatorGrade" 
                                    value={educatorGrade}
                                    onChange={(e) => setEducatorGrade(e.target.value)}
                                    placeholder="Ingresa la calificación..."
                                />
                            </div>
                            <div>
                                <Label htmlFor="educatorComments">Comentarios Adicionales</Label>
                                <Textarea 
                                    id="educatorComments"
                                    value={educatorComments}
                                    onChange={(e) => setEducatorComments(e.target.value)}
                                    rows={4}
                                    placeholder="Escribe tus comentarios y feedback para el estudiante..."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <DialogFooter className="gap-2 sm:gap-0">
                    <Button onClick={() => setIsAiEvaluationDetailModalOpen(false)} variant="outline">
                        Cerrar
                    </Button>
                    <Button onClick={handleSaveEducatorGrade} className="bg-primary hover:bg-primary/80 text-primary-foreground">
                        Guardar Calificación y Feedback
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

