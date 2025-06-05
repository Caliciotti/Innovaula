'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form'; // Added Controller
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { PlusCircle, Loader2, Bot, Sparkles, Brain, Image as ImageIcon, Film, HelpCircle, CheckCircle, MessageSquare } from 'lucide-react'; // Added MessageSquare
import NextImage from 'next/image';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const avatarSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.').max(50, 'El nombre no puede exceder los 50 caracteres.'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres.').max(300, 'La descripción no puede exceder los 300 caracteres.'),
  
  avatarImage: z.any()
    .optional()
    .refine((files) => !files || files?.[0]?.size <= MAX_FILE_SIZE, `El tamaño máximo de la imagen es 5MB.`)
    .refine(
      (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Solo se aceptan formatos .jpg, .jpeg, .png y .webp."
    ),
  
  promptBase: z.string().min(20, 'Las instrucciones base deben tener al menos 20 caracteres.'),
  toneOfVoice: z.enum(["amigable", "formal", "entusiasta", "humoristico", "cientifico", "neutral"]),
  positiveKeywords: z.string().optional(),
  negativeKeywords: z.string().optional(),

  knowledgeBaseInfo: z.string().optional(),
  canChat: z.boolean().default(true).optional(),
  canGenerateScripts: z.boolean().default(false).optional(),
  canCreateQuizzes: z.boolean().default(false).optional(),
});

type AvatarFormData = z.infer<typeof avatarSchema>;

export default function CreateAvatarPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const { register, handleSubmit, watch, control, formState: { errors }, reset } = useForm<AvatarFormData>({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      toneOfVoice: "neutral",
      canChat: true,
      canGenerateScripts: false,
      canCreateQuizzes: false,
    }
  });

  const avatarImageFile = watch("avatarImage");

  useEffect(() => {
    if (avatarImageFile && avatarImageFile.length > 0) {
      const file = avatarImageFile[0];
      if (file && ACCEPTED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setImagePreview(null);
    }
  }, [avatarImageFile]);

  const onSubmit: SubmitHandler<AvatarFormData> = async (data) => {
    setIsSubmitting(true);
    console.log('Datos del nuevo avatar:', data);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    toast({
      title: "¡Avatar IA Configurado!",
      description: `El avatar "${data.name}" ha sido guardado exitosamente.`,
      variant: "default",
    });
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 max-w-2xl mx-auto">
         <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
        <PageTitle title="¡Avatar Guardado Exitosamente!" description="Tu asistente virtual está listo para ser entrenado y desplegado." />
        <NextImage src="https://placehold.co/400x250.png" alt="Avatar IA creado" width={400} height={250} className="rounded-lg shadow-md my-6" data-ai-hint="robot cerebro digital"/>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button onClick={() => { setIsSuccess(false); reset(); setImagePreview(null); }} variant="outline" size="lg">Crear Otro Avatar</Button>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground">
            <Link href="/teaching/avatars">Ver Mis Avatares</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <PageTitle
        title="Configura tu Nuevo Avatar IA"
        description="Define la identidad, apariencia y personalidad de tu asistente virtual educativo."
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8">
          
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><Bot className="mr-2 text-primary"/>Identidad del Avatar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="font-semibold">Nombre del Avatar</Label>
                <Input id="name" {...register('name')} placeholder="Ej: Celulito Explica, Historiador Virtual" className={errors.name ? 'border-destructive' : ''} />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="description" className="font-semibold">Descripción Corta / Rol Principal</Label>
                <Textarea id="description" {...register('description')} rows={3} placeholder="Ej: Un experto en biología celular que explica conceptos de forma divertida." className={errors.description ? 'border-destructive' : ''} />
                {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><ImageIcon className="mr-2 text-primary"/>Apariencia Visual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="avatarImage" className="font-semibold">Subir Imagen del Avatar (Opcional)</Label>
                <Input 
                  id="avatarImage" 
                  type="file" 
                  {...register('avatarImage')} 
                  accept="image/png, image/jpeg, image/webp"
                  className={`mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 ${errors.avatarImage ? 'border-destructive' : ''}`}
                />
                {errors.avatarImage && <p className="text-sm text-destructive mt-1">{typeof errors.avatarImage.message === 'string' ? errors.avatarImage.message : 'Error con la imagen'}</p>}
                {imagePreview && (
                  <div className="mt-4 relative w-40 h-40 border rounded-lg overflow-hidden shadow-sm">
                    <NextImage src={imagePreview} alt="Previsualización de avatar" layout="fill" objectFit="cover" />
                  </div>
                )}
              </div>
              <Card className="bg-muted/50 p-4">
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="text-base flex items-center"><Sparkles className="mr-2 text-yellow-500 h-5 w-5"/>Generar Imagen con IA (Próximamente)</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm text-muted-foreground">En el futuro, podrás describir tu avatar y nuestra IA generará una imagen única para ti. Elige estilos como realista, caricatura, científico, ¡y más!</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><Sparkles className="mr-2 text-primary"/>Personalidad y Estilo de Comunicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="promptBase" className="font-semibold">Instrucciones Principales / Personalidad Base</Label>
                <Textarea 
                  id="promptBase" 
                  {...register('promptBase')} 
                  rows={6} 
                  placeholder="Describe aquí cómo debe ser tu avatar, su conocimiento central, su forma de hablar, qué debe evitar, etc. (Ej: Eres un átomo de hidrógeno amigable y curioso...)" 
                  className={errors.promptBase ? 'border-destructive' : ''} 
                />
                {errors.promptBase && <p className="text-sm text-destructive mt-1">{errors.promptBase.message}</p>}
              </div>
              <div>
                <Label htmlFor="toneOfVoice" className="font-semibold">Tono de Voz</Label>
                <Controller
                  name="toneOfVoice"
                  control={control}
                  render={({ field }) => (
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="toneOfVoice" className={errors.toneOfVoice ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Selecciona un tono" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="amigable">Amigable</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="entusiasta">Entusiasta</SelectItem>
                        <SelectItem value="humoristico">Humorístico</SelectItem>
                        <SelectItem value="cientifico">Científico</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.toneOfVoice && <p className="text-sm text-destructive mt-1">{errors.toneOfVoice.message}</p>}
              </div>
              <div>
                <Label htmlFor="positiveKeywords" className="font-semibold">Palabras o Frases Clave que Debe Usar (Opcional)</Label>
                <Input id="positiveKeywords" {...register('positiveKeywords')} placeholder="Ej: ¡Claro que sí!, Absolutamente, Exploremos juntos" />
              </div>
              <div>
                <Label htmlFor="negativeKeywords" className="font-semibold">Temas o Palabras que Debe Evitar (Opcional)</Label>
                <Input id="negativeKeywords" {...register('negativeKeywords')} placeholder="Ej: política, religión, no puedo ayudarte con eso" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><Brain className="mr-2 text-primary"/>Base de Conocimiento (Próximamente)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Aquí podrás subir documentos (PDF, TXT) o ingresar texto para que tu avatar los use como fuente principal de conocimiento.</p>
              <Textarea id="knowledgeBaseInfo" {...register('knowledgeBaseInfo')} rows={4} placeholder="Pega texto aquí o sube archivos en el futuro..." disabled />
              <Button variant="outline" className="mt-2" disabled> <ImageIcon className="mr-2"/> Subir Documentos (Próximamente)</Button>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><Sparkles className="mr-2 text-primary"/>Capacidades del Avatar (Próximamente)</CardTitle>
              <CardDescription>Define qué podrá hacer tu avatar. Estas opciones se activarán en futuras actualizaciones.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-md">
                <Switch id="canChat" {...register('canChat')} defaultChecked disabled/>
                <Label htmlFor="canChat" className="flex items-center cursor-not-allowed">
                  <MessageSquare className="mr-2 h-5 w-5 text-muted-foreground"/>
                  Puede generar respuestas para Chat Interactivo
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-md">
                <Switch id="canGenerateScripts" {...register('canGenerateScripts')} disabled/>
                <Label htmlFor="canGenerateScripts" className="flex items-center cursor-not-allowed">
                  <Film className="mr-2 h-5 w-5 text-muted-foreground"/>
                  Puede generar Guiones para Videos Explicativos
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-md">
                <Switch id="canCreateQuizzes" {...register('canCreateQuizzes')} disabled/>
                <Label htmlFor="canCreateQuizzes" className="flex items-center cursor-not-allowed">
                  <HelpCircle className="mr-2 h-5 w-5 text-muted-foreground"/>
                  Puede crear Quizzes y Preguntas Interactivas
                </Label>
              </div>
            </CardContent>
          </Card>

          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t">
            <Button type="button" variant="outline" onClick={() => router.push('/teaching/avatars')} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground text-lg py-3">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Guardando Avatar...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-5 w-5" /> Guardar Configuración del Avatar
                </>
              )}
            </Button>
          </CardFooter>
        </div>
      </form>
    </div>
  );
}
