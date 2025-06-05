import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, CalendarDays, Award, MessageSquare, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function StudentHomePage() {
  const upcomingLessons = [
    { id: 1, title: 'Cálculo Avanzado', time: 'Mañana, 10:00 AM', subject: 'Matemáticas' },
    { id: 2, title: 'Introducción a la Física Cuántica', time: 'Próximo Lunes, 2:00 PM', subject: 'Física' },
  ];

  const recentCourses = [
    { id: 'course1', title: 'Introducción a Python', progress: 75, imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'código programación' },
    { id: 'course2', title: 'Fundamentos del Arte Digital', progress: 40, imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'arte digital' },
  ];

  return (
    <div className="space-y-12 pt-8">
      <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center"><Search className="mr-2 text-primary" />Descubrimiento de Cursos</CardTitle>
          <CardDescription>Encuentra tu próxima aventura de aprendizaje.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 items-center">
          <Input type="search" placeholder="Buscar cursos (ej: 'Desarrollo Web', 'Historia')" className="flex-grow" />
          <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground">
            <Link href="/student/courses">Explorar Todos los Cursos</Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-1 gap-8"> {/* Adjusted grid to single column as one card is removed */}
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center"><CalendarDays className="mr-2 text-primary" />Próximas Lecciones</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingLessons.length > 0 ? (
              <ul className="space-y-4">
                {upcomingLessons.map(lesson => (
                  <li key={lesson.id} className="p-4 bg-muted/50 rounded-md hover:bg-muted transition-colors">
                    <h3 className="font-semibold text-lg">{lesson.title}</h3>
                    <p className="text-sm text-muted-foreground">{lesson.subject} - {lesson.time}</p>
                    <Button variant="link" size="sm" className="p-0 h-auto mt-1 text-primary">Unirse a la Lección</Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No hay próximas lecciones programadas. <Link href="/student/courses" className="text-primary hover:underline">¡Reserva una nueva!</Link></p>
            )}
             <Button variant="outline" className="mt-4 w-full" asChild>
                <Link href="/student/schedule">Ver Horario Completo</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center"><BookOpen className="mr-2 text-primary" />Mis Materiales de Aprendizaje</CardTitle>
          <CardDescription>Accede a los materiales de tus cursos comprados y gratuitos.</CardDescription>
        </CardHeader>
        <CardContent>
          {recentCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentCourses.map(course => (
              <Card key={course.id} className="overflow-hidden hover:scale-105 transition-transform">
                <Image src={course.imageUrl} alt={course.title} width={300} height={200} className="w-full h-40 object-cover" data-ai-hint={course.dataAiHint}/>
                <CardHeader>
                  <CardTitle className="text-lg font-headline">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground">{course.progress}% completado</p>
                  <Button variant="link" className="p-0 h-auto mt-2 text-primary" asChild>
                    <Link href={`/student/courses/${course.id}`}>Continuar Aprendiendo</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          ) : (
            <p className="text-muted-foreground">No hay cursos activos. <Link href="/student/courses" className="text-primary hover:underline">¡Explora cursos ahora!</Link></p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center"><Award className="mr-2 text-primary" />Calificar y Opinar</CardTitle>
          <CardDescription>Comparte tu feedback sobre cursos y educadores completados.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for courses to review */}
          <p className="text-muted-foreground">No tienes cursos para calificar en este momento.</p>
          <Button variant="outline" className="mt-4">Ver Cursos Anteriores</Button>
        </CardContent>
      </Card>
    </div>
  );
}
