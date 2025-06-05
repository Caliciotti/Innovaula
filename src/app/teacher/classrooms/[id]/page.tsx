import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadCloud, Users, BookOpen, FileText, Video, MessageSquare, Settings, Trash2, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for a single classroom
const mockClassroom = {
  id: 'c1',
  name: '10º Grado - Matemáticas Avanzadas',
  subject: 'Matemáticas',
  description: 'Esta aula cubre temas avanzados de álgebra, cálculo y trigonometría para estudiantes de 10º Grado. Nos enfocamos en habilidades de resolución de problemas y preparación para matemáticas de nivel superior.',
  uniqueCode: 'MATHX10ADV',
  joinLink: '/join/MATHX10ADV',
  students: [
    { id: 's1', name: 'Alicia Wonderland' }, { id: 's2', name: 'Roberto El Constructor' }, { id: 's3', name: 'Carlos Brown' }
  ],
  content: [
    { id: 'doc1', name: 'Formulario de Álgebra.pdf', type: 'documento', size: '1.2MB', uploaded: '2024-07-15' },
    { id: 'vid1', name: 'Clase de Introducción al Cálculo', type: 'video', duration: '45:17', uploaded: '2024-07-16' },
    { id: 'mod1', name: 'Módulo Interactivo de Geometría', type: 'módulo', uploaded: '2024-07-18' },
  ]
};

type ClassroomDetailPageProps = {
  params: { id: string };
};

export default function ClassroomDetailPage({ params }: ClassroomDetailPageProps) {
  // In a real app, you'd fetch classroom data based on params.id
  const classroom = mockClassroom;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageTitle title={classroom.name} description={`Asignatura: ${classroom.subject} | Código Único: ${classroom.uniqueCode}`} className="mb-0" />
        <div className="flex gap-2">
        <Button variant="outline" asChild>
            <Link href={`/teacher/classrooms/${classroom.id}/edit`}><Settings className="mr-2 h-4 w-4" />Configuración</Link>
        </Button>
        <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" />Eliminar Aula</Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="font-headline text-xl">Resumen del Aula</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{classroom.description}</p>
            <p className="mt-2 text-sm">Comparte este enlace para que los estudiantes se unan: <Link href={classroom.joinLink} className="text-primary hover:underline font-mono">{classroom.joinLink}</Link></p>
            <Image src="https://placehold.co/800x250.png" data-ai-hint="aula virtual" alt="Banner del aula" width={800} height={250} className="mt-4 rounded-md" />
        </CardContent>
      </Card>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="content"><BookOpen className="mr-2 h-4 w-4" />Contenido</TabsTrigger>
          <TabsTrigger value="students"><Users className="mr-2 h-4 w-4" />Estudiantes ({classroom.students.length})</TabsTrigger>
          <TabsTrigger value="assignments"><FileText className="mr-2 h-4 w-4" />Tareas</TabsTrigger>
          <TabsTrigger value="discussions"><MessageSquare className="mr-2 h-4 w-4" />Debates</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <Card className="shadow-md">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle className="font-headline text-xl">Materiales de Aprendizaje</CardTitle>
                <CardDescription>Gestiona documentos, videos y módulos interactivos para esta aula.</CardDescription>
              </div>
              <Button><UploadCloud className="mr-2 h-4 w-4" />Subir Contenido</Button>
            </CardHeader>
            <CardContent>
              {classroom.content.length > 0 ? (
                <ul className="space-y-3">
                  {classroom.content.map(item => (
                    <li key={item.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors">
                      <div className="flex items-center">
                        {item.type === 'documento' && <FileText className="h-5 w-5 mr-3 text-primary" />}
                        {item.type === 'video' && <Video className="h-5 w-5 mr-3 text-primary" />}
                        {item.type === 'módulo' && <BookOpen className="h-5 w-5 mr-3 text-primary" />}
                        <span>{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{item.type === 'documento' ? item.size : item.type === 'video' ? item.duration : 'Interactivo'}</span>
                        <span>Subido: {item.uploaded}</span>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Settings className="h-4 w-4"/></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><Trash2 className="h-4 w-4"/></Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                    <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">Aún no se ha subido contenido. Comienza agregando materiales para tus estudiantes.</p>
                    <Button className="mt-4"><PlusCircle className="mr-2 h-4 w-4" /> Agregar Primer Material</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Estudiantes Inscritos</CardTitle>
              <CardDescription>Ver y gestionar estudiantes en esta aula.</CardDescription>
            </CardHeader>
            <CardContent>
              {classroom.students.length > 0 ? (
                <ul className="space-y-2">
                  {classroom.students.map(student => (
                    <li key={student.id} className="flex justify-between items-center p-2 bg-muted/30 rounded hover:bg-muted/50">
                      <span>{student.name}</span>
                      <Button variant="outline" size="sm">Ver Progreso</Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">Ningún estudiante se ha unido a esta aula todavía.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assignments">
            <Card className="shadow-md">
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle className="font-headline text-xl">Tareas</CardTitle>
                        <CardDescription>Crear, gestionar y calificar tareas.</CardDescription>
                    </div>
                    <Button><PlusCircle className="mr-2 h-4 w-4" />Crear Tarea</Button>
                </CardHeader>
                <CardContent className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">Aún no se han creado tareas.</p>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="discussions">
             <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Debates del Aula</CardTitle>
                    <CardDescription>Facilitar la comunicación y preguntas y respuestas.</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-8">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">No hay debates activos. ¡Comienza un nuevo tema!</p>
                    <Button variant="outline" className="mt-4"><PlusCircle className="mr-2 h-4 w-4"/>Iniciar Debate</Button>
                </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
