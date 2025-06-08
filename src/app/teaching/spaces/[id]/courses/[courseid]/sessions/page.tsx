
'use client';

import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, CalendarDays, Users, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getSpaceById, getCourseById, type SessionData } from '@/lib/spaces-data'; 

export default function ManageSessionsPage() {
  const params = useParams();
  const spaceId = params.id as string; // Ensuring this uses params.id
  const courseId = params.courseId as string;

  const space = getSpaceById(spaceId);
  const course = getCourseById(spaceId, courseId);

  if (!space || !course) {
    return (
      <PageTitle 
        title="Error" 
        description="No se pudo encontrar el espacio o el curso especificado." 
      />
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };
  
  const sessions: SessionData[] = course.sessions || [];


  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <PageTitle title={`Sesiones para: ${course.title}`} description={`Gestiona los horarios y cupos para este curso en ${space.name}.`} className="mb-2" />
            <Link href={`/teaching/spaces/${spaceId}`} className="text-sm text-primary hover:underline">
                &larr; Volver a {space.name}
            </Link>
        </div>
        <Button className="bg-primary hover:bg-primary/80 text-primary-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> Programar Nueva Sesión
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center"><CalendarDays className="mr-2 text-primary"/>Sesiones Programadas</CardTitle>
          <CardDescription>Lista de todas las sesiones programadas para el curso "{course.title}".</CardDescription>
        </CardHeader>
        <CardContent>
          {sessions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Cupos (Inscritos/Capacidad)</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map(session => (
                  <TableRow key={session.id} className="hover:bg-muted/50">
                    <TableCell>{formatDate(session.dateTime)}</TableCell>
                    <TableCell>{formatTime(session.dateTime)}</TableCell>
                    <TableCell>{session.duration}</TableCell>
                    <TableCell className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground"/> {session.enrolled}/{session.capacity}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        session.status === 'Confirmada' ? 'bg-green-500/20 text-green-700 dark:text-green-400' :
                        session.status === 'Cancelada' ? 'bg-red-500/20 text-red-700 dark:text-red-400' :
                        'bg-blue-500/20 text-blue-700 dark:text-blue-400' // Default for Programada
                      }`}>
                        {session.status || 'Programada'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" /> <span className="sr-only">Editar</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" /> <span className="sr-only">Cancelar Sesión</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <CalendarDays className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl font-semibold text-muted-foreground">Aún no hay sesiones programadas.</p>
              <p className="text-sm text-muted-foreground mb-6">Comienza programando la primera sesión para este curso.</p>
              <Button className="bg-primary hover:bg-primary/80 text-primary-foreground">
                <PlusCircle className="mr-2 h-5 w-5" /> Programar Primera Sesión
              </Button>
            </div>
          )}
        </CardContent>
        {sessions.length > 0 && (
             <CardFooter className="justify-end border-t pt-4">
                <p className="text-sm text-muted-foreground">Total de {sessions.length} sesiones programadas.</p>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
