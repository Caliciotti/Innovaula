'use client';

import * as React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Users, ArrowRight, Search, Filter as FilterIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';


interface StudentSummary {
  id: string;
  name: string;
  avatarUrl: string;
  avatarFallback: string;
  profileAiHint: string;
  lastCourse?: string;
  overallProgress?: number; // e.g. 75 for 75%
}

const mockStudentsData: StudentSummary[] = [
  { id: 's1', name: 'Alicia Wonderland', avatarUrl: 'https://placehold.co/100x100.png', avatarFallback: 'AW', profileAiHint: 'estudiante sonriendo', lastCourse: 'Álgebra Avanzada', overallProgress: 85 },
  { id: 's2', name: 'Roberto El Constructor', avatarUrl: 'https://placehold.co/100x100.png', avatarFallback: 'RB', profileAiHint: 'estudiante concentrado', lastCourse: 'Física Aplicada', overallProgress: 60 },
  { id: 's3', name: 'Carlos Brown', avatarUrl: 'https://placehold.co/100x100.png', avatarFallback: 'CB', profileAiHint: 'estudiante amable', lastCourse: 'Literatura Universal', overallProgress: 92 },
  { id: 's4', name: 'Diana Prince', avatarUrl: 'https://placehold.co/100x100.png', avatarFallback: 'DP', profileAiHint: 'estudiante pensativa', lastCourse: 'Álgebra Avanzada', overallProgress: 70 },
  { id: 's5', name: 'Pedro Picapiedra', avatarUrl: 'https://placehold.co/100x100.png', avatarFallback: 'PP', profileAiHint: 'estudiante robusto', lastCourse: 'Introducción a la Historia Antigua', overallProgress: 55 },
];

export default function TeacherStudentsPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredStudents = mockStudentsData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.lastCourse && student.lastCourse.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 pt-8">
      {/* El título ha sido eliminado de aquí */}

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Filtros y Búsqueda</CardTitle>
          <CardDescription>Encuentra rápidamente a tus estudiantes.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Buscar por nombre o curso..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="shrink-0" onClick={() => alert("Filtro por aula próximamente.")}> 
              <FilterIcon className="mr-2 h-4 w-4" /> Filtrar por Aula (Próximamente)
            </Button>
        </CardContent>
      </Card>


      {filteredStudents.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 ease-in-out flex flex-col transform hover:scale-105">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={student.avatarUrl} alt={student.name} data-ai-hint={student.profileAiHint} />
                  <AvatarFallback>{student.avatarFallback}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <CardTitle className="text-lg font-semibold">{student.name}</CardTitle>
                  {student.lastCourse && <CardDescription className="text-xs text-muted-foreground">En: {student.lastCourse}</CardDescription>}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                {student.overallProgress !== undefined ? (
                    <div className="mb-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Progreso General</span>
                            <span>{student.overallProgress}%</span>
                        </div>
                        <Progress value={student.overallProgress} className="h-2" />
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground italic">
                        Aún no hay datos de progreso.
                    </p>
                )}
                 <p className="text-xs text-muted-foreground mt-2">Última actividad: Hace 2 días</p>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button 
                  variant="outline" 
                  className="w-full text-sm" 
                  asChild
                >
                  <Link href={`/teaching/students/${student.id}`}>
                    Ver Progreso Detallado <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="col-span-full text-center py-12 shadow-md">
          <CardHeader>
            <Users className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <CardTitle className="font-headline text-2xl">No se encontraron estudiantes</CardTitle>
            <CardDescription>
                {searchTerm ? "Intenta con otros términos de búsqueda." : "Parece que aún no tienes estudiantes activos o no se han asignado a tus aulas."}
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
