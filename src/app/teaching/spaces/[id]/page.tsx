'use client';

import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Home, MapPin, Edit, BookOpen, PlusCircle, CalendarPlus, Settings, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getSpaceById, type SpaceData, type CoursePresencial } from '@/lib/spaces-data';

export default function SpaceDetailPage() {
  const params = useParams();
  const spaceId = params.id as string;
  const space = getSpaceById(spaceId);

  if (!space) {
    return (
      <div>
        <PageTitle title="Espacio no encontrado" description="El espacio que buscas no existe o ha sido movido." />
        <Link href="/teaching/spaces">
          <Button variant="outline">Volver a Mis Espacios</Button>
        </Link>
      </div>
    );
  }

  const getSpaceTypeDescription = (type: string) => {
    switch (type) {
      case 'home':
        return 'Domicilio / Estudio Particular';
      case 'innovaula_rented':
        return 'Espacio Alquilado en InnovAula';
      case 'third_party':
        return 'Espacio de Terceros';
      default:
        return 'No especificado';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageTitle title={space.name} description={`Gestiona los detalles y cursos de tu espacio presencial.`} className="mb-0" />
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />Editar Espacio
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />Eliminar Espacio
          </Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">Detalles del Espacio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Image src={space.coverImageUrl} alt={`Portada de ${space.name}`} width={800} height={300} className="rounded-lg shadow-md w-full object-cover max-h-72" data-ai-hint={space.coverImageAiHint} />
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <p className="text-sm text-muted-foreground flex items-center mb-1">
                <MapPin className="h-4 w-4 mr-2 text-accent" /> Dirección:
              </p>
              <p className="font-medium">{space.address}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center mb-1">
                <Home className="h-4 w-4 mr-2 text-accent" /> Tipo de Espacio:
              </p>
              <p className="font-medium">{getSpaceTypeDescription(space.type)}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Descripción del Espacio:</p>
            <p className="text-foreground whitespace-pre-line">{space.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">Icono para el Mapa:</p>
            <Image src={space.mapIconUrl} alt="Icono del mapa" width={40} height={40} className="rounded-md border p-1" data-ai-hint={space.mapIconAiHint} />
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card className="shadow-lg">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="font-headline text-2xl text-primary flex items-center">
              <BookOpen className="mr-2" />Cursos Presenciales en este Espacio
            </CardTitle>
            <CardDescription>Define y gestiona los cursos que impartes aquí.</CardDescription>
          </div>
          <Button asChild className="bg-accent hover:bg-accent/80 text-accent-foreground">
            <Link href={`/teaching/spaces/${space.id}/courses/new`}>
              <PlusCircle className="mr-2 h-5 w-5" />Añadir Nuevo Curso Presencial
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {space.courses && space.courses.length > 0 ? (
            <div className="space-y-6">
              {space.courses.map(course => (
                <Card key={course.id} className="bg-muted/30 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-semibold">{course.title}</CardTitle>
                    {course.level && <CardDescription>Nivel: {course.level}</CardDescription>}
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      {course.price && <span>Precio: {course.price}</span>}
                      {course.classDuration && <span>Duración: {course.classDuration}</span>}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-3 border-t">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-1.5 h-4 w-4" />Editar Curso
                    </Button>
                    <Button variant="secondary" size="sm" asChild>
                      <Link href={`/teaching/spaces/${space.id}/courses/${course.id}/sessions`}>
                        <CalendarPlus className="mr-1.5 h-4 w-4" />Gestionar Sesiones
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <BookOpen className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl font-semibold text-muted-foreground">Aún no has añadido cursos a este espacio.</p>
              <p className="text-sm text-muted-foreground mb-6">Comienza creando el primer curso presencial para este lugar.</p>
              <Button asChild className="bg-primary hover:bg-primary/80 text-primary-foreground">
                <Link href={`/teaching/spaces/${space.id}/courses/new`}>
                  <PlusCircle className="mr-2 h-5 w-5" />Añadir Primer Curso
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
