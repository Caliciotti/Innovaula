'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import {
  BookOpen, Users, CalendarDays, BarChart2, MessageSquare, Eye, School,
  Home as PhysicalSpaceIcon, 
  Bot,
  TrendingUp,
  Settings,
  FileText as FileTextIcon, 
  Video as VideoIcon
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Mock data for demonstration
const stats = [
  { label: 'Estudiantes Activos', value: '120', icon: Users },
  { label: 'Cursos Totales', value: '15', icon: BookOpen },
  { label: 'Clases Próximas', value: '8', icon: CalendarDays },
  { label: 'Valoración Media', value: '9.6 / 10', icon: BarChart2 },
];

const recentActivity = [
  { description: 'Nuevo estudiante inscrito en "JavaScript Avanzado".', time: 'Hace 2 horas' },
  { description: 'Tarea entregada para "Fundamentos de Diseño Web".', time: 'Hace 5 horas' },
  { description: 'Programaste una nueva clase: "Introducción a la IA".', time: 'Hace 1 día' },
];

const mockClassroomsSummary = [
  { id: 'c1', name: '10º Grado - Matemáticas Avanzadas', students: 25, subject: 'Matemáticas' },
  { id: 'c2', name: 'AP Física C: Mecánica', students: 18, subject: 'Física' },
  { id: 'c3', name: 'Taller de Escritura Creativa', students: 30, subject: 'Lengua' },
];

const mockEducatorContentSummary = [
  { id: 'cnt1', name: 'Fundamentos de Álgebra.pdf', type: 'Documento', classroom: 'Matemáticas 9º Grado', icon: FileTextIcon },
  { id: 'cnt2', name: 'Clase de Cálculo - Parte 1.mp4', type: 'Video', classroom: '10º Grado - Matemáticas Avanzadas', icon: VideoIcon },
  { id: 'cnt3', name: 'Simulación Interactiva de Física', type: 'Módulo', classroom: 'AP Física C: Mecánica', icon: BookOpen },
];

const quickActions = [
  { href: '/teaching/classrooms/new', label: 'Crear Aula Virtual', description: 'Configura un nuevo espacio de aprendizaje online.', icon: School },
  { href: '/teaching/spaces/new', label: 'Registrar Espacio Físico', description: 'Define un lugar para tus clases presenciales.', icon: PhysicalSpaceIcon },
  { href: '/teaching/content', label: 'Gestionar Contenido', description: 'Sube y organiza materiales educativos.', icon: BookOpen },
  { href: '/teaching/avatars', label: 'Mis Avatares IA', description: 'Configura asistentes virtuales para tus cursos.', icon: Bot },
  { href: '/teaching/schedule', label: 'Programar Evento', description: 'Planifica tus próximas clases o talleres.', icon: CalendarDays },
  { href: '/teaching/reviews', label: 'Ver Reseñas', description: 'Consulta el feedback de los estudiantes.', icon: Eye },
  { href: '/teaching/analytics', label: 'Analíticas Detalladas', description: 'Revisa ingresos, estudiantes y más.', icon: TrendingUp },
  { href: '/teaching/settings', label: 'Configuración General', description: 'Ajusta tus preferencias de educador.', icon: Settings },
];


export default function TeacherDashboardPage() {
  return (
    <div className="space-y-12 pt-4">

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-md hover:shadow-lg transition-shadow">
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

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href} className="block group">
                <Card className="h-full hover:bg-muted/50 transition-colors duration-200 ease-in-out transform hover:scale-[1.02] shadow-sm hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="p-2 bg-primary/10 rounded-md group-hover:bg-primary transition-colors">
                        <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <CardTitle className="text-md font-semibold group-hover:text-primary transition-colors">{action.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </CardContent>
        <CardFooter>
          <Image src="https://placehold.co/600x200.png" data-ai-hint="panel profesor" alt="Ilustración de profesor" width={600} height={200} className="rounded-md mt-4 w-full object-cover h-32" />
        </CardFooter>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Mis Aulas</CardTitle>
            <CardDescription>Un vistazo a tus aulas virtuales activas.</CardDescription>
          </CardHeader>
          <CardContent>
            {mockClassroomsSummary.length > 0 ? (
              <div className="space-y-3">
                {mockClassroomsSummary.slice(0, 3).map(classroom => ( 
                  <Link key={classroom.id} href={`/teaching/classrooms/${classroom.id}`} className="block p-3 bg-muted/50 rounded-md hover:bg-muted transition-colors">
                    <h4 className="font-semibold text-md">{classroom.name}</h4>
                    <p className="text-xs text-muted-foreground">{classroom.subject} - {classroom.students} estudiantes</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No tienes aulas activas. <Link href="/teaching/classrooms/new" className="text-primary hover:underline">¡Crea una ahora!</Link></p>
            )}
            <Button variant="outline" className="mt-4 w-full" asChild>
              <Link href="/teaching/classrooms">Gestionar Todas las Aulas</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Contenido Educativo</CardTitle>
            <CardDescription>Un resumen de tus materiales recientes.</CardDescription>
          </CardHeader>
          <CardContent>
            {mockEducatorContentSummary.length > 0 ? (
              <div className="space-y-3">
                {mockEducatorContentSummary.slice(0, 3).map(content => { 
                  const Icon = content.icon;
                  return (
                    <Link key={content.id} href={'/teaching/content'} className="block p-3 bg-muted/50 rounded-md hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <h4 className="font-semibold text-md">{content.name}</h4>
                          <p className="text-xs text-muted-foreground">{content.type} - {content.classroom}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground">Aún no has añadido contenido a tu biblioteca. <Link href="/teaching/content" className="text-primary hover:underline">¡Sube tu primer material!</Link></p>
            )}
            <Button variant="outline" className="mt-4 w-full" asChild>
              <Link href="/teaching/content">Gestionar Todo el Contenido</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

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
  );
}

