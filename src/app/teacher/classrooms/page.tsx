import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { PlusCircle, Users, BookOpen, Edit3, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Mock data for classrooms
const mockClassrooms = [
  { id: 'c1', name: '10º Grado - Matemáticas Avanzadas', students: 25, subject: 'Matemáticas', activeSince: '2023-09-01', imageUrl: 'https://placehold.co/400x200.png', dataAiHint: 'aula matemáticas' },
  { id: 'c2', name: 'AP Física C: Mecánica', students: 18, subject: 'Física', activeSince: '2023-08-15', imageUrl: 'https://placehold.co/400x200.png', dataAiHint: 'laboratorio física' },
  { id: 'c3', name: 'Taller de Escritura Creativa - Otoño 2024', students: 30, subject: 'Lengua', activeSince: '2024-01-10', imageUrl: 'https://placehold.co/400x200.png', dataAiHint: 'clase escritura' },
];

export default function ManageClassroomsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageTitle title="Gestionar Aulas" description="Supervisa tus aulas virtuales, gestiona contenido e interactúa con los estudiantes." className="mb-0" />
        <Button asChild className="bg-primary hover:bg-primary/80 text-primary-foreground whitespace-nowrap">
          <Link href="/teacher/classrooms/new">
            <PlusCircle className="mr-2 h-5 w-5" /> Crear Nueva Aula
          </Link>
        </Button>
      </div>

      {mockClassrooms.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClassrooms.map(classroom => (
            <Card key={classroom.id} className="shadow-lg hover:shadow-primary/20 transition-shadow flex flex-col">
              <Image src={classroom.imageUrl} alt={classroom.name} width={400} height={200} className="w-full h-48 object-cover rounded-t-lg" data-ai-hint={classroom.dataAiHint} />
              <CardHeader className="pb-2">
                <CardTitle className="font-headline text-xl hover:text-primary">
                  <Link href={`/teacher/classrooms/${classroom.id}`}>{classroom.name}</Link>
                </CardTitle>
                <CardDescription>{classroom.subject}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{classroom.students} estudiantes inscritos</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>Activa desde {new Date(classroom.activeSince).toLocaleDateString('es-ES')}</span>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex gap-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href={`/teacher/classrooms/${classroom.id}/edit`}>
                    <Edit3 className="mr-1 h-4 w-4" /> Editar
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="flex-1 text-primary hover:bg-primary/10">
                   <Link href={`/teacher/classrooms/${classroom.id}`}>
                    <Eye className="mr-1 h-4 w-4" /> Ver
                  </Link>
                </Button>
                <Button variant="destructive" size="icon" className="h-9 w-9">
                  <Trash2 className="h-4 w-4" />
                   <span className="sr-only">Eliminar Aula</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Aún no hay Aulas</CardTitle>
            <CardDescription>Comienza creando tu primera aula virtual para interactuar con tus estudiantes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Image src="https://placehold.co/300x200.png" data-ai-hint="aula vacía" alt="Ilustración de aula vacía" width={300} height={200} className="mx-auto mb-6 rounded-md" />
            <Button size="lg" asChild className="bg-primary hover:bg-primary/80 text-primary-foreground">
              <Link href="/teacher/classrooms/new">
                <PlusCircle className="mr-2 h-5 w-5" /> Crea tu Primera Aula
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
