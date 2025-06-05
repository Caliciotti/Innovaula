import { PageTitle } from '@/components/shared/PageTitle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, PlusCircle, Clock, Video } from 'lucide-react';
import Link from 'next/link';

// Mock data for teacher's schedule
const teacherSchedule = [
  { id: 'ts1', title: 'Matemáticas 10º Grado - Intro Cálculo', classroom: '10º Grado - Matemáticas Avanzadas', dateTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), duration: '1 hora', type: 'Clase en Vivo' },
  { id: 'ts2', title: 'AP Física - Horas de Consulta', classroom: 'AP Física C: Mecánica', dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), duration: '45 mins', type: 'Sesión de Preguntas' },
  { id: 'ts3', title: 'Escritura Creativa - Revisión por Pares', classroom: 'Taller de Escritura Creativa - Otoño 2024', dateTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), duration: '1.5 horas', type: 'Taller' },
];

export default function TeacherSchedulePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageTitle title="Mi Horario" description="Gestiona los horarios de tus clases, talleres y horas de consulta." className="mb-0" />
        <Button className="bg-primary hover:bg-primary/80 text-primary-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> Programar Nuevo Evento
        </Button>
      </div>
      
      {/* A simple calendar view placeholder */}
      <Card className="shadow-lg">
          <CardHeader>
              <CardTitle className="font-headline text-xl">Vista General del Calendario</CardTitle>
              <CardDescription>Representación visual de tus eventos programados (calendario interactivo próximamente).</CardDescription>
          </CardHeader>
          <CardContent className="h-64 bg-muted/30 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Placeholder Simple de Calendario</p>
              {/* Future: Implement a proper calendar component like ShadCN Calendar or FullCalendar */}
          </CardContent>
      </Card>


      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center"><CalendarDays className="mr-2 text-primary" />Próximos Eventos</CardTitle>
          <CardDescription>Tus clases y sesiones programadas.</CardDescription>
        </CardHeader>
        <CardContent>
          {teacherSchedule.length > 0 ? (
            <div className="space-y-6">
              {teacherSchedule.map(item => (
                <Card key={item.id} className="bg-muted/30 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl font-headline">{item.title}</CardTitle>
                    <CardDescription>{item.classroom} - {item.type}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                     <div className="space-y-1">
                        <div className="flex items-center text-muted-foreground">
                            <Clock className="h-4 w-4 mr-2"/>
                            {item.dateTime.toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' })} a las {item.dateTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <p className="text-sm text-muted-foreground">Duración: {item.duration}</p>
                    </div>
                    <div className="flex gap-2  w-full sm:w-auto">
                        <Button variant="outline" className="flex-1 sm:flex-none">
                            Editar
                        </Button>
                        <Button className="flex-1 sm:flex-none bg-primary hover:bg-primary/80 text-primary-foreground">
                          <Video className="mr-2 h-4 w-4" /> Iniciar Evento
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-6">No tienes próximos eventos programados. <Link href="#" className="text-primary hover:underline">¡Programa uno ahora!</Link></p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
