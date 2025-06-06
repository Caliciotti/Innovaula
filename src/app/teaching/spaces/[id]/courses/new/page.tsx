
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams, useRouter } from 'next/navigation';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { PlusCircle, Loader2, BookOpen, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import Image from 'next/image';

const coursePresencialSchema = z.object({
  title: z.string().min(5, 'El título del curso debe tener al menos 5 caracteres.').max(100),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres.').max(1000),
  temary: z.string().optional().describe('Temario detallado del curso, un tema por línea.'),
  level: z.string().optional().describe('Ej: Principiante, Intermedio, Avanzado'),
  price: z.string().optional().describe('Ej: $50 por sesión, $300 curso completo'),
  classDuration: z.string().optional().describe('Ej: 2 horas por clase'),
});

type CoursePresencialFormData = z.infer<typeof coursePresencialSchema>;

// Mock function to simulate fetching space name - replace with actual data fetching
const getSpaceName = async (spaceId: string): Promise<string | null> => {
  // In a real app, fetch this from your data source
  const mockSpaces = [
    { id: 'space1', name: 'Estudio Creativo de Ana' },
    { id: 'space2', name: 'Rincón de Ciencias de Carlos' },
  ];
  return mockSpaces.find(s => s.id === spaceId)?.name || null;
};


export default function CreatePresentialCoursePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [spaceName, setSpaceName] = useState<string | null>(null);
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  const spaceId = params.id as string;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CoursePresencialFormData>({
    resolver: zodResolver(coursePresencialSchema),
  });
  
  React.useEffect(() => {
    if (spaceId) {
      getSpaceName(spaceId).then(setSpaceName);
    }
  }, [spaceId]);

  const onSubmit: SubmitHandler<CoursePresencialFormData> = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Datos del curso presencial para el espacio', spaceId, ':', data); // In a real app, this would be an API call
    
    setIsSubmitting(false);
    setIsSuccess(true);
    toast({
      title: "¡Curso Presencial Creado!",
      description: `El curso "${data.title}" ha sido añadido exitosamente al espacio ${spaceName || ''}.`,
      variant: 'default',
    });
    // reset(); // Don't reset, so user can see success message and then decide
  };
  
  if (!spaceId) {
    return (
      <PageTitle title="Error" description="No se ha especificado un ID de espacio." />
    );
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
        <PageTitle 
            title="¡Curso Presencial Añadido!" 
            description={`El curso ha sido agregado a tu espacio "${spaceName || 'seleccionado'}". Ahora puedes programar sesiones.`} 
        />
        <Image src="https://placehold.co/400x250.png" alt="Creación de curso exitosa" width={400} height={250} className="rounded-lg shadow-md my-6" data-ai-hint="aprendizaje pizarra"/>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button onClick={() => { setIsSuccess(false); reset(); }} variant="outline" size="lg">Añadir Otro Curso a este Espacio</Button>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground">
            <Link href={`/teaching/spaces/${spaceId}`}>Volver al Espacio</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <PageTitle 
        title="Añadir Nuevo Curso Presencial" 
        description={`Estás añadiendo un curso al espacio: ${spaceName || 'Cargando...'}. Completa los detalles a continuación.`} 
      />
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center"><BookOpen className="mr-2 text-primary"/>Detalles del Curso Presencial</CardTitle>
          <CardDescription>Proporciona la información para este curso que se impartirá en tu espacio físico.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title" className="font-semibold">Título del Curso</Label>
              <Input id="title" {...register('title')} placeholder="Ej: Taller de Fotografía Nocturna" className={errors.title ? 'border-destructive' : ''} />
              {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <Label htmlFor="description" className="font-semibold">Descripción Completa</Label>
              <Textarea id="description" {...register('description')} rows={5} placeholder="Describe el curso en detalle: qué aprenderán los estudiantes, a quién va dirigido, metodología, etc." className={errors.description ? 'border-destructive' : ''} />
              {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="temary" className="font-semibold">Temario (Opcional, un tema por línea)</Label>
              <Textarea id="temary" {...register('temary')} rows={5} placeholder="Módulo 1: Introducción\n- Tema 1.1\n- Tema 1.2\nMódulo 2: Práctica Avanzada..." />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="level" className="font-semibold">Nivel (Opcional)</Label>
                  <Input id="level" {...register('level')} placeholder="Ej: Principiante, Intermedio" />
                </div>
                <div>
                  <Label htmlFor="classDuration" className="font-semibold">Duración por Clase (Opcional)</Label>
                  <Input id="classDuration" {...register('classDuration')} placeholder="Ej: 2 horas, 90 minutos" />
                </div>
            </div>

            <div>
              <Label htmlFor="price" className="font-semibold">Precio (Opcional)</Label>
              <Input id="price" {...register('price')} placeholder="Ej: $50 por clase, $200 curso completo" />
            </div>
            
            <div className="pt-4">
               <Image src="https://placehold.co/600x250.png" alt="Estudiantes en clase presencial" width={600} height={250} className="rounded-lg shadow-sm w-full object-cover" data-ai-hint="clase aprendizaje"/>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => router.push(`/teaching/spaces/${spaceId}`)} disabled={isSubmitting}>
                Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting || !spaceName} className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground text-lg py-3">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Creando Curso...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-5 w-5" /> Añadir Curso al Espacio
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

