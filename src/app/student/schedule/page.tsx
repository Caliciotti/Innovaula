import { PageTitle } from '@/components/shared/PageTitle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Video, Clock } from 'lucide-react';
import Link from 'next/link';

// Mock data for student's schedule
const upcomingClasses = [
  { id: '1', courseTitle: 'Desarrollo Web Avanzado', lessonTitle: 'Módulo 3: Backend con Node.js y Express', dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), duration: '2 horas', type: 'Clase en Vivo' },
  { id: '2', courseTitle: 'Introducción a la Computación Cuántica', lessonTitle: 'Qubits y Superposición', dateTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), duration: '1.5 horas', type: 'Sesión 1 a 1' },
  { id: '3', courseTitle: 'Maestría en Marketing Digital', lessonTitle: 'Taller de Fundamentos de SEO', dateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), duration: '3 horas', type: 'Taller' },
];

const pastClasses = [
 { id: '4', courseTitle: 'Taller de Escritura Creativa', lessonTitle: 'Desarrollo de Personajes', dateTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), duration: '2 horas', type: 'Taller', reviewable: true },
];

export default function StudentSchedulePage() {
  return (
    <div className="space-y-8">
      <PageTitle title="Mi Horario" description="Lleva un registro de tus lecciones futuras y pasadas." />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center"><CalendarDays className="mr-2 text-primary" />Próximas Lecciones</CardTitle>
          <CardDescription>Tus clases y sesiones programadas.</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingClasses.length > 0 ? (
            <div className="space-y-6">
              {upcomingClasses.map(item => (
                <Card key={item.id} className="bg-muted/30 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl font-headline">{item.lessonTitle}</CardTitle>
                    <CardDescription>{item.courseTitle} - {item.type}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center text-muted-foreground">
                            <Clock className="h-4 w-4 mr-2"/>
                            {item.dateTime.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} a las {item.dateTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <p className="text-sm text-muted-foreground">Duración: {item.duration}</p>
                    </div>
                    <Button className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground">
                      <Video className="mr-2 h-4 w-4" /> Unirse a la Lección
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No tienes próximas lecciones. <Link href="/student/courses" className="text-primary hover:underline">¡Explora cursos para reservar nuevas lecciones!</Link></p>
          )}
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Lecciones Pasadas</CardTitle>
           <CardDescription>Revisa los materiales de tus lecciones completadas.</CardDescription>
        </CardHeader>
        <CardContent>
          {pastClasses.length > 0 ? (
             <div className="space-y-4">
              {pastClasses.map(item => (
                <Card key={item.id} className="bg-muted/20">
                   <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                     <div>
                        <h4 className="font-semibold">{item.lessonTitle}</h4>
                        <p className="text-sm text-muted-foreground">{item.courseTitle} - {item.dateTime.toLocaleDateString('es-ES')}</p>
                     </div>
                     <div className="flex gap-2">
                        <Button variant="outline" size="sm">Ver Grabación</Button>
                        {item.reviewable && <Button variant="secondary" size="sm" asChild><Link href={`/student/courses/${item.id}/review`}>Calificar Lección</Link></Button>}
                     </div>
                   </CardContent>
                </Card>
              ))}
            </div>
          ) : (
             <p className="text-muted-foreground">Aún no hay lecciones pasadas registradas.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
