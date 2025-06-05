import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { PlusCircle, BookOpen, Users, CalendarDays, BarChart2, MessageSquare, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Mock data for demonstration
const stats = [
  { label: 'Estudiantes Activos', value: '120', icon: Users },
  { label: 'Cursos Totales', value: '15', icon: BookOpen },
  { label: 'Clases Próximas', value: '8', icon: CalendarDays },
  { label: 'Valoración Media', value: '9.6 / 10', icon: BarChart2 }, // Updated rating
];

const recentActivity = [
  { description: 'Nuevo estudiante inscrito en "JavaScript Avanzado".', time: 'Hace 2 horas' },
  { description: 'Tarea entregada para "Fundamentos de Diseño Web".', time: 'Hace 5 horas' },
  { description: 'Programaste una nueva clase: "Introducción a la IA".', time: 'Hace 1 día' },
];

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-12">
      <PageTitle title="Panel del Profesor" description="Gestiona tus aulas, contenido y estudiantes de forma eficiente." />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-lg hover:shadow-primary/20 transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-headline">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <Button size="lg" className="w-full justify-start text-left h-auto py-3 bg-primary hover:bg-primary/80 text-primary-foreground" asChild>
              <Link href="/teacher/classrooms/new">
                <PlusCircle className="mr-3 h-6 w-6" />
                <div>
                  <p className="font-semibold">Crear Nueva Aula</p>
                  <p className="text-xs text-primary-foreground/80">Configura un nuevo espacio de aprendizaje virtual.</p>
                </div>
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="w-full justify-start text-left h-auto py-3" asChild>
               <Link href="/teacher/content">
                <BookOpen className="mr-3 h-6 w-6" />
                 <div>
                  <p className="font-semibold">Gestionar Contenido</p>
                  <p className="text-xs text-secondary-foreground/80">Sube o edita materiales de aprendizaje.</p>
                </div>
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="w-full justify-start text-left h-auto py-3" asChild>
              <Link href="/teacher/schedule">
                <CalendarDays className="mr-3 h-6 w-6" />
                 <div>
                  <p className="font-semibold">Programar una Clase</p>
                  <p className="text-xs text-secondary-foreground/80">Planifica tus próximas lecciones.</p>
                </div>
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="w-full justify-start text-left h-auto py-3" asChild>
              <Link href="/teacher/reviews">
                <Eye className="mr-3 h-6 w-6" />
                <div>
                  <p className="font-semibold">Ver Reseñas</p>
                  <p className="text-xs text-secondary-foreground/80">Consulta el feedback de los estudiantes.</p>
                </div>
              </Link>
            </Button>
          </CardContent>
           <CardFooter>
             <Image src="https://placehold.co/600x200.png" data-ai-hint="panel profesor" alt="Ilustración de profesor" width={600} height={200} className="rounded-md mt-4 w-full object-cover h-32" />
           </CardFooter>
        </Card>

        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center"><MessageSquare className="mr-2 text-primary" />Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivity.map((activity, index) => (
                <li key={index} className="text-sm">
                  <p className="text-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

       <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Mis Aulas</CardTitle>
            <CardDescription>Resumen de tus aulas virtuales activas.</CardDescription>
        </CardHeader>
        <CardContent>
            {/* Placeholder for classroom list */}
            <p className="text-muted-foreground">No tienes aulas activas. <Link href="/teacher/classrooms/new" className="text-primary hover:underline">¡Crea una ahora!</Link></p>
             <Button variant="outline" className="mt-4 w-full" asChild>
                <Link href="/teacher/classrooms">Gestionar Todas las Aulas</Link>
            </Button>
        </CardContent>
      </Card>

    </div>
  );
}
