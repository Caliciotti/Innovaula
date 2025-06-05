'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { BookOpen, Award, Star, Code, Clock, TrendingUp, ArrowRight, ListChecks, CalendarClock, ExternalLink, Search as SearchIcon, Video } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CourseCard, type CourseCardProps } from '@/app/courses/page';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { format, isToday, isTomorrow, isPast, differenceInDays, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import { Progress } from '@/components/ui/progress';


const currentCourses = [
  { id: 'course1', title: 'Introducción a Python para Ciencia de Datos', progress: 75, imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'python código', category: 'Programación' },
  { id: 'course2', title: 'Fundamentos del Diseño Gráfico y Branding', progress: 40, imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'diseño paleta', category: 'Diseño' },
  { id: 'course3', title: 'Marketing Digital Esencial 2024', progress: 90, imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'marketing gráfico', category: 'Marketing' },
];

const completedCourses = [
  { id: 'course4', title: 'Desarrollo Web con HTML, CSS y JavaScript', completionDate: '2024-05-15', imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'web código', certificateLink: '/achievements#cert-webdev' },
];

const mockRecommendedCourses: CourseCardProps['course'][] = [
  { id: 'rec1', title: 'Machine Learning de la A a la Z', description: 'Aprende los algoritmos más importantes y aplícalos en Python.', category: 'Programación', instructor: 'Prof. IA Experto', rating: 9.5, students: 1500, imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'machine learning', tags: ['IA', 'Python', 'Datos'] },
  { id: 'rec2', title: 'Diseño de Experiencias de Usuario (UX) Avanzado', description: 'Domina las técnicas para crear productos digitales intuitivos.', category: 'Diseño', instructor: 'Diseñadora UX Pro', rating: 9.7, students: 950, imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'ux diseño', tags: ['UX', 'UI', 'Investigación'] },
  { id: 'rec3', title: 'Estrategias de Contenido para Redes Sociales', description: 'Crea contenido que enganche y convierta en plataformas sociales.', category: 'Marketing', instructor: 'Gurú de Redes', rating: 9.3, students: 1200, imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'redes sociales', tags: ['Marketing', 'Contenido', 'Social Media'] },
];

const studentStats = {
  averageGrade: 9.2,
  topSubject: 'Programación',
  coursesCompleted: 3,
  hoursStudied: 120,
};

const performanceChartDataServer = [
  { area: "Programación", score: 90, fill: "var(--color-programacion)" },
  { area: "Diseño", score: 75, fill: "var(--color-diseno)" },
  { area: "Marketing", score: 85, fill: "var(--color-marketing)" },
  { area: "Ciencia", score: 60, fill: "var(--color-ciencia)" },
];

const chartConfig: ChartConfig = {
  score: {
    label: "Puntuación",
    color: "hsl(var(--foreground))",
  },
  programacion: {
    label: "Programación",
    color: "hsl(var(--chart-1))",
  },
  diseno: {
    label: "Diseño",
    color: "hsl(var(--chart-2))",
  },
  marketing: {
    label: "Marketing",
    color: "hsl(var(--chart-3))",
  },
   ciencia: {
    label: "Ciencia",
    color: "hsl(var(--chart-4))",
  },
};

interface PendingAssignment {
  id: string;
  name: string;
  courseName: string;
  dueDate: Date;
  statusText?: string;
  statusVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  submissionLink?: string;
}

const mockPendingAssignmentsData: Omit<PendingAssignment, 'dueDate' | 'statusText' | 'statusVariant'> & { dayOffset: number }[] = [
  { id: 'assign1', name: 'Ensayo sobre Kant', courseName: 'Filosofía Moderna', dayOffset: 1, submissionLink: '#' },
  { id: 'assign2', name: 'Práctica de Laboratorio #3', courseName: 'Química Orgánica', dayOffset: 0, submissionLink: '#' },
  { id: 'assign3', name: 'Entrega Final Proyecto Web', courseName: 'Desarrollo Web Avanzado', dayOffset: 7 },
  { id: 'assign4', name: 'Cuestionario Módulo 2', courseName: 'Introducción a Python', dayOffset: -1, submissionLink: '#' },
  { id: 'assign5', name: 'Presentación sobre Fotosíntesis', courseName: 'Biología Celular', dayOffset: 3 },
  { id: 'assign6', name: 'Resumen Capítulo 5', courseName: 'Historia del Arte', dayOffset: 5, submissionLink: '#' },
  { id: 'assign7', name: 'Boceto Diseño App Móvil', courseName: 'Diseño UI/UX Figma', dayOffset: 2, submissionLink: '#' },
];

interface UpcomingClass {
  id: string;
  title: string;
  description: string;
  dateTime: Date;
  duration: string;
  type: string;
  actionButton?: React.ReactNode;
}

const mockUpcomingClassesRawData: Omit<UpcomingClass, 'dateTime' | 'actionButton'> & { dayOffset: number, hour: number, minute: number }[] = [
  { id: 'learn1', title: 'Módulo 3: Backend con Node.js', description: 'Desarrollo Web Avanzado', dayOffset: 2, hour: 10, minute: 0, duration: '2 horas', type: 'Clase en Vivo' },
  { id: 'learn2', title: 'Qubits y Superposición', description: 'Introducción a la Computación Cuántica', dayOffset: 0, hour: new Date().getHours() + 2, minute: 0, duration: '1.5 horas', type: 'Sesión 1 a 1' },
  { id: 'learn3', title: 'Análisis de Métricas y KPIs', description: 'Marketing Digital Esencial', dayOffset: 5, hour: 14, minute: 0, duration: '1 hora', type: 'Clase en Vivo' },
  { id: 'learn4', title: 'Impresionismo y Postimpresionismo', description: 'Historia del Arte Moderno', dayOffset: 8, hour: 11, minute: 0, duration: '1 hora', type: 'Clase Grabada' },
  { id: 'learn5', title: 'Club de Debate: Existencialismo', description: 'Filosofía Contemporánea', dayOffset: 1, hour: 16, minute: 0, duration: '1 hora', type: 'Debate' },
];

const ClientFormattedCompletionDate: React.FC<{ dateString: string }> = ({ dateString }) => {
  const [formattedDate, setFormattedDate] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (dateString) {
      setFormattedDate(
        new Date(dateString).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
      );
    }
  }, [dateString]);
  if (!formattedDate) return <span className="text-sm text-muted-foreground">cargando...</span>;
  return <>{formattedDate}</>;
};

const processAssignmentDueDate = (dueDate: Date): Pick<PendingAssignment, 'statusText' | 'statusVariant'> => {
  const today = new Date();
  if (isPast(dueDate) && !isSameDay(dueDate, today)) {
    return { statusText: 'Vencida', statusVariant: 'destructive' };
  }
  if (isToday(dueDate)) {
    return { statusText: 'Vence Hoy', statusVariant: 'secondary' };
  }
  if (isTomorrow(dueDate)) {
    return { statusText: 'Vence Mañana', statusVariant: 'default' };
  }
  const daysDiff = differenceInDays(dueDate, today);
  return { statusText: `Vence en ${daysDiff} días`, statusVariant: 'outline' };
};

export default function MyLearningPage() {
  const [clientChartData, setClientChartData] = React.useState<typeof performanceChartDataServer | null>(null);
  const [pendingAssignments, setPendingAssignments] = React.useState<PendingAssignment[]>([]);
  const [upcomingClasses, setUpcomingClasses] = React.useState<UpcomingClass[]>([]);

  const [isAssignmentsModalOpen, setIsAssignmentsModalOpen] = React.useState(false);
  const [assignmentSearchTerm, setAssignmentSearchTerm] = React.useState('');
  const [isClassesModalOpen, setIsClassesModalOpen] = React.useState(false);
  const [classSearchTerm, setClassSearchTerm] = React.useState('');

  React.useEffect(() => {
    setClientChartData(performanceChartDataServer);

    const processedAssignments = mockPendingAssignmentsData.map(item => {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + item.dayOffset);
      dueDate.setHours(23, 59, 59, 999); // End of day
      const statusInfo = processAssignmentDueDate(dueDate);
      return { ...item, dueDate, ...statusInfo };
    }).sort((a,b) => a.dueDate.getTime() - b.dueDate.getTime());
    setPendingAssignments(processedAssignments);

    const processedClasses = mockUpcomingClassesRawData.map(e => {
        let eventDateTime;
        const baseDate = new Date();
        if (e.id === 'learn2') { // For the class that is today + 2 hours
            eventDateTime = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + e.dayOffset, e.hour, e.minute);
        } else {
            eventDateTime = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + e.dayOffset);
            eventDateTime.setHours(e.hour, e.minute, 0, 0);
        }
        return {
            ...e,
            dateTime: eventDateTime,
            actionButton: <Button size="sm" className="bg-primary hover:bg-primary/80 text-primary-foreground"><Video className="mr-2 h-4 w-4" /> Unirse</Button>
        };
    }).sort((a,b) => a.dateTime.getTime() - b.dateTime.getTime());
    setUpcomingClasses(processedClasses);

  }, []);

  const filteredAssignments = pendingAssignments.filter(
    (a) =>
      a.name.toLowerCase().includes(assignmentSearchTerm.toLowerCase()) ||
      a.courseName.toLowerCase().includes(assignmentSearchTerm.toLowerCase())
  );

  const filteredClasses = upcomingClasses.filter(
    (c) =>
      c.title.toLowerCase().includes(classSearchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(classSearchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pt-4">
      <Card className="shadow-xl overflow-hidden">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center text-primary"><TrendingUp className="mr-3 h-7 w-7"/>Tu Rendimiento de un Vistazo</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-muted/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calificación Promedio</CardTitle>
                <Star className="h-5 w-5 text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{studentStats.averageGrade}/10</div>
                <p className="text-xs text-muted-foreground">En todos tus cursos completados</p>
              </CardContent>
              <CardFooter className="pt-2 pb-4 !px-4">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/my-learning/grades">
                    Ver Calificaciones Detalladas <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
             <Card className="bg-muted/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Materia Estrella</CardTitle>
                <Code className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{studentStats.topSubject}</div>
                <p className="text-xs text-muted-foreground">Área con mejor desempeño</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cursos Completados</CardTitle>
                <Award className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{studentStats.coursesCompleted}</div>
                 <p className="text-xs text-muted-foreground">Total de cursos finalizados</p>
              </CardContent>
            </Card>
             <Card className="bg-muted/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Horas Estimadas</CardTitle>
                <Clock className="h-5 w-5 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{studentStats.hoursStudied}h</div>
                 <p className="text-xs text-muted-foreground">De estudio en plataforma</p>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Rendimiento por Área</CardTitle>
                    <CardDescription>Visualiza tu progreso en diferentes campos de estudio.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                 {clientChartData ? (
                    <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
                        <RechartsBarChart data={clientChartData} layout="vertical" margin={{left:10, right: 20}}>
                            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                            <XAxis type="number" dataKey="score" domain={[0,100]} tickFormatter={(value) => `${value}%`} />
                            <YAxis type="category" dataKey="area" width={80} tickLine={false} axisLine={false} />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel indicator="line" />}
                            />
                            <Bar dataKey="score" radius={5} background={{ fill: 'hsl(var(--muted))', radius: 5 }} />
                        </RechartsBarChart>
                    </ChartContainer>
                    ) : (
                        <div className="flex items-center justify-center h-[280px] text-muted-foreground">Cargando gráfico...</div>
                    )}
                </CardContent>
                 <CardFooter className="pt-4 text-xs text-muted-foreground">
                    Actualizado recientemente.
                </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Nueva sección: Tareas Pendientes y Próximas Clases */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-lg flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center"><ListChecks className="mr-2 text-primary"/>Tareas Pendientes</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            {pendingAssignments.length > 0 ? (
              <ul className="space-y-4">
                {pendingAssignments.slice(0,4).map(task => (
                  <li key={task.id} className="p-3 bg-muted/30 rounded-md hover:bg-muted/40 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{task.name}</h4>
                        <p className="text-xs text-muted-foreground">{task.courseName}</p>
                      </div>
                      <Badge variant={task.statusVariant}>{task.statusText}</Badge>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-muted-foreground">Vence: {format(task.dueDate, 'PPP', { locale: es })}</p>
                      {task.submissionLink ? (
                        <Button size="sm" variant="link" className="p-0 h-auto text-primary" asChild>
                          <Link href={task.submissionLink}><ExternalLink className="mr-1 h-3 w-3"/> Entregar/Ver</Link>
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled>Ver Detalles</Button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-4">¡Felicidades! No tienes tareas pendientes.</p>
            )}
          </CardContent>
          {pendingAssignments.length > 0 && (
            <CardFooter className="border-t pt-3 mt-auto">
              <Button variant="outline" className="w-full" onClick={() => setIsAssignmentsModalOpen(true)}>
                Ver Todas las Tareas ({pendingAssignments.length})
              </Button>
            </CardFooter>
          )}
        </Card>

        <Card className="shadow-lg flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center"><CalendarClock className="mr-2 text-primary"/>Próximas Clases</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            {upcomingClasses.length > 0 ? (
              <div className="space-y-4">
                {upcomingClasses.slice(0,3).map(item => (
                  <Card key={item.id} className="bg-muted/30 hover:shadow-sm transition-shadow">
                    <CardHeader className="pb-2 pt-3">
                      <CardTitle className="text-md font-semibold">{item.title}</CardTitle>
                      <CardDescription className="text-xs">{item.description} - {item.type}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-1">
                      <div className="text-xs text-muted-foreground">
                        <p className="flex items-center"><Clock className="h-3 w-3 mr-1"/>{format(item.dateTime, 'PPP p', { locale: es })} ({item.duration})</p>
                      </div>
                      {React.isValidElement(item.actionButton) ? React.cloneElement(item.actionButton as React.ReactElement<any>, { className: `${(item.actionButton as React.ReactElement<any>).props.className} w-full sm:w-auto mt-1 sm:mt-0` }) : null}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No tienes próximas clases programadas.</p>
            )}
          </CardContent>
          {upcomingClasses.length > 0 && (
             <CardFooter className="border-t pt-3 mt-auto">
                <Button variant="outline" className="w-full" onClick={() => setIsClassesModalOpen(true)}>
                    Ver Todas Mis Clases ({upcomingClasses.length})
                </Button>
            </CardFooter>
          )}
        </Card>
      </div>
      {/* Fin Nueva sección */}


      <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center"><BookOpen className="mr-2 text-primary" />Cursos en Progreso</CardTitle>
          <CardDescription>Continúa donde lo dejaste.</CardDescription>
        </CardHeader>
        <CardContent>
          {currentCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCourses.map(course => (
              <Card key={course.id} className="overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out group flex flex-col">
                <Image src={course.imageUrl} alt={course.title} width={300} height={200} className="w-full h-40 object-cover" data-ai-hint={course.dataAiHint}/>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-headline group-hover:text-primary transition-colors">{course.title}</CardTitle>
                  <CardDescription className="text-xs">{course.category}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                    <Progress value={course.progress} className="h-2.5 [&>div]:bg-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{course.progress}% completado</p>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="link" className="p-0 h-auto text-primary group-hover:underline" asChild>
                    <Link href={`/courses/${course.id}`}>Continuar Aprendiendo</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          ) : (
            <div className="text-center py-8">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No tienes cursos en progreso actualmente.</p>
                <Button asChild className="mt-4 bg-primary hover:bg-primary/80 text-primary-foreground">
                    <Link href="/courses">Explorar Cursos</Link>
                </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Cursos Completados</CardTitle>
          <CardDescription>Revisa los cursos que has finalizado.</CardDescription>
        </CardHeader>
        <CardContent>
          {completedCourses.length > 0 ? (
            <ul className="space-y-4">
              {completedCourses.map(course => (
                <li key={course.id} className="p-4 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center gap-3">
                    <Image src={course.imageUrl} alt={course.title} width={80} height={50} className="rounded object-cover" data-ai-hint={course.dataAiHint} />
                    <div>
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">Completado el: <ClientFormattedCompletionDate dateString={course.completionDate} /></p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/courses/${course.id}`}>Ver Curso</Link>
                    </Button>
                    <Button variant="secondary" size="sm" asChild>
                      <Link href={`/achievements#cert-${course.id.replace('course', '')}`}>Ver Certificado/Logro</Link>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
             <p className="text-muted-foreground text-center py-6">Aún no has completado ningún curso.</p>
          )}
           <Button variant="outline" className="mt-6 w-full" asChild>
                <Link href="/achievements">Ver Todos Mis Logros</Link>
            </Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Cursos Recomendados para Ti</CardTitle>
          <CardDescription>Basado en tus intereses y progreso.</CardDescription>
        </CardHeader>
        <CardContent>
          {mockRecommendedCourses.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRecommendedCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-6">No hay recomendaciones disponibles por el momento.</p>
          )}
        </CardContent>
      </Card>

      {/* Modal para Todas las Tareas */}
      <Dialog open={isAssignmentsModalOpen} onOpenChange={setIsAssignmentsModalOpen}>
        <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl text-primary">Todas las Tareas Pendientes</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Buscar por nombre de tarea o curso..."
                    value={assignmentSearchTerm}
                    onChange={(e) => setAssignmentSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>
            <ScrollArea className="h-[calc(60vh-80px)] pr-3">
              {filteredAssignments.length > 0 ? (
                <ul className="space-y-3">
                  {filteredAssignments.map(task => (
                    <li key={task.id} className="p-4 border rounded-md hover:bg-muted/20 transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <h4 className="font-semibold text-lg">{task.name}</h4>
                          <p className="text-sm text-muted-foreground">{task.courseName}</p>
                        </div>
                        <Badge variant={task.statusVariant} className="mt-1 sm:mt-0">{task.statusText}</Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 pt-2 border-t">
                        <p className="text-sm text-muted-foreground">Vence: {format(task.dueDate, 'PPP', { locale: es })}</p>
                        {task.submissionLink ? (
                          <Button size="sm" variant="default" className="mt-2 sm:mt-0 bg-primary hover:bg-primary/80 text-primary-foreground" asChild>
                            <Link href={task.submissionLink}><ExternalLink className="mr-1.5 h-4 w-4"/> Entregar/Ver Tarea</Link>
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="mt-2 sm:mt-0" disabled>Ver Detalles de Tarea</Button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-center py-6">
                  {assignmentSearchTerm ? "No se encontraron tareas que coincidan con tu búsqueda." : "No tienes tareas pendientes."}
                </p>
              )}
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignmentsModalOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

       {/* Modal para Todas las Clases */}
      <Dialog open={isClassesModalOpen} onOpenChange={setIsClassesModalOpen}>
        <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl text-primary">Todas Mis Próximas Clases</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Buscar por título o curso..."
                    value={classSearchTerm}
                    onChange={(e) => setClassSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>
            <ScrollArea className="h-[calc(60vh-80px)] pr-3">
              {filteredClasses.length > 0 ? (
                <div className="space-y-4">
                  {filteredClasses.map(item => (
                     <Card key={item.id} className="bg-muted/30 hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2 pt-3">
                            <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                            <CardDescription className="text-xs">{item.description} - {item.type}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-1">
                             <div className="text-xs text-muted-foreground">
                                <p className="flex items-center"><Clock className="h-3 w-3 mr-1"/>{format(item.dateTime, 'PPP p', { locale: es })} (Duración: {item.duration})</p>
                            </div>
                            {React.isValidElement(item.actionButton) ? React.cloneElement(item.actionButton as React.ReactElement<any>, { className: `${(item.actionButton as React.ReactElement<any>).props.className} w-full sm:w-auto mt-1 sm:mt-0` }) : null}
                        </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-6">
                  {classSearchTerm ? "No se encontraron clases que coincidan con tu búsqueda." : "No tienes próximas clases."}
                </p>
              )}
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsClassesModalOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
