'use client';

import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusCircle, Loader2, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import Image from 'next/image';

const classroomSchema = z.object({
  name: z.string().min(5, 'El nombre del aula debe tener al menos 5 caracteres.').max(100),
  subject: z.string().min(3, 'La asignatura debe tener al menos 3 caracteres.').max(50),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres.').max(500),
  gradeLevel: z.string().optional(),
});

type ClassroomFormData = z.infer<typeof classroomSchema>;

export default function CreateClassroomPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ClassroomFormData>({
    resolver: zodResolver(classroomSchema),
  });

  const onSubmit: SubmitHandler<ClassroomFormData> = async (data) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Datos del aula:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
    toast({
      title: "¡Aula Creada!",
      description: `El aula "${data.name}" ha sido creada exitosamente.`,
    });
    reset();
  };
  
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
         <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
        <PageTitle title="¡Aula Creada Exitosamente!" description="Ahora puedes gestionar contenido e invitar estudiantes." />
        <Image src="https://placehold.co/400x250.png" alt="Creación exitosa" width={400} height={250} className="rounded-lg shadow-md my-6" data-ai-hint="celebración éxito"/>
        <div className="flex gap-4 mt-8">
          <Button onClick={() => setIsSuccess(false)} variant="outline" size="lg">Crear Otra Aula</Button>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground">
            <Link href="/teacher/classrooms">Ver Mis Aulas</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <PageTitle title="Crear Nueva Aula" description="Configura un nuevo espacio virtual para tus estudiantes." />
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Detalles del Aula</CardTitle>
          <CardDescription>Proporciona la información necesaria para crear tu aula.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="name">Nombre del Aula</Label>
              <Input id="name" {...register('name')} placeholder="Ej: 10º Grado - Álgebra Avanzada" className={errors.name ? 'border-destructive' : ''} />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="subject">Asignatura</Label>
              <Input id="subject" {...register('subject')} placeholder="Ej: Matemáticas, Física, Lengua" className={errors.subject ? 'border-destructive' : ''} />
              {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="gradeLevel">Nivel/Grado (Opcional)</Label>
              <Input id="gradeLevel" {...register('gradeLevel')} placeholder="Ej: 10º Grado, Bachillerato, Nivel Universitario" />
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea id="description" {...register('description')} rows={4} placeholder="Un breve resumen del aula, temas cubiertos, objetivos de aprendizaje, etc." className={errors.description ? 'border-destructive' : ''} />
              {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
            </div>
            <div className="pt-4">
               <Image src="https://placehold.co/500x200.png" alt="Configuración de aula" width={500} height={200} className="rounded-lg shadow-sm" data-ai-hint="tecnología aula"/>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/80 text-primary-foreground text-lg py-3">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Creando Aula...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-5 w-5" /> Crear Aula
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
