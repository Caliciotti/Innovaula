'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { PlusCircle, Loader2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import NextImage from 'next/image'; // Renamed to avoid conflict with Lucide's Image

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const postSchema = z.object({
  content: z.string()
    .min(10, 'El contenido debe tener al menos 10 caracteres.')
    .max(2000, 'El contenido no puede exceder los 2000 caracteres.'),
  image: z.any()
    .optional()
    .refine((files) => !files || files?.[0]?.size <= MAX_FILE_SIZE, `El tamaño máximo de la imagen es 5MB.`)
    .refine(
      (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Solo se aceptan formatos .jpg, .jpeg, .png y .webp."
    ),
  tags: z.string().optional().describe('Tags separados por coma, ej: "educacion, ia, innovacion"'),
});

type PostFormData = z.infer<typeof postSchema>;

export default function CreateCommunityPostPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
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
  }, [imageFile]);


  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    setIsSubmitting(true);
    console.log('Datos del nuevo post:', data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, handle image upload if data.image exists
    // For now, we just log it.

    setIsSubmitting(false);
    toast({
      title: "¡Post Creado!",
      description: "Tu post ha sido enviado para revisión o publicado.", // Adjust message as needed
      variant: "default",
    });
    reset();
    setImagePreview(null);
    router.push('/my-community-content'); // Redirect to the management page
  };

  return (
    <div className="max-w-2xl mx-auto pt-8">
      <Card className="shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center"><Sparkles className="mr-2 text-primary"/>Contenido del Post</CardTitle>
            <CardDescription>Redacta tu mensaje y añade elementos multimedia si lo deseas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="content" className="font-semibold">Mensaje Principal</Label>
              <Textarea
                id="content"
                {...register('content')}
                rows={8}
                placeholder="Escribe aquí tu post..."
                className={errors.content ? 'border-destructive' : ''}
              />
              {errors.content && <p className="text-sm text-destructive mt-1">{errors.content.message}</p>}
            </div>

            <div>
              <Label htmlFor="image" className="font-semibold">Añadir Imagen (Opcional)</Label>
              <Input
                id="image"
                type="file"
                {...register('image')}
                accept="image/png, image/jpeg, image/webp"
                className={`mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 ${errors.image ? 'border-destructive' : ''}`}
              />
              {errors.image && <p className="text-sm text-destructive mt-1">{typeof errors.image.message === 'string' ? errors.image.message : 'Error con la imagen'}</p>}
              {imagePreview && (
                <div className="mt-4 relative aspect-video w-full max-w-md mx-auto border rounded-md overflow-hidden shadow-sm">
                  <NextImage src={imagePreview} alt="Previsualización de imagen" layout="fill" objectFit="contain" />
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="tags" className="font-semibold">Tags (Opcional, separados por coma)</Label>
              <Input
                id="tags"
                {...register('tags')}
                placeholder="Ej: inteligencia artificial, educación, react, futuro"
                className="mt-1"
              />
              {errors.tags && <p className="text-sm text-destructive mt-1">{errors.tags.message}</p>}
            </div>

          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t">
            <Button type="button" variant="outline" onClick={() => { reset(); setImagePreview(null); router.back();}} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Publicando...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-5 w-5" /> Publicar Post
                </>
              )}
            </Button>
            {/* 
            // Optional: Save Draft button functionality can be added later
            <Button type="button" variant="secondary" onClick={() => console.log("Guardar borrador")} disabled={isSubmitting}>
              Guardar Borrador
            </Button> 
            */}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

