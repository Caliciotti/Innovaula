'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { intelligentAssignmentFeedback, type IntelligentAssignmentFeedbackOutput } from '@/ai/flows/ai-learning-assistant';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  submissionText: z.string().min(50, 'El texto de la entrega debe tener al menos 50 caracteres.'),
  assignmentDescription: z.string().min(20, 'La descripción de la tarea debe tener al menos 20 caracteres.'),
  relevantContext: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function AiFeedbackClientPage() {
  const [feedbackResult, setFeedbackResult] = useState<IntelligentAssignmentFeedbackOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    setFeedbackResult(null);
    try {
      const result = await intelligentAssignmentFeedback(data);
      setFeedbackResult(result);
      toast({
        title: "¡Feedback Generado!",
        description: "La IA ha proporcionado feedback sobre tu entrega.",
        variant: "default",
      });
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error inesperado.';
      setError(errorMessage);
      toast({
        title: "Error al Generar Feedback",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center"><Sparkles className="mr-2 text-primary" />Envía tu Tarea</CardTitle>
          <CardDescription>Completa los detalles a continuación para obtener feedback impulsado por IA.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="submissionText" className="text-lg font-medium">Texto de la Entrega</Label>
              <Textarea
                id="submissionText"
                {...register('submissionText')}
                rows={10}
                placeholder="Pega aquí el texto de tu tarea..."
                className={`mt-1 ${errors.submissionText ? 'border-destructive ring-destructive' : ''}`}
                aria-invalid={errors.submissionText ? "true" : "false"}
              />
              {errors.submissionText && <p className="text-sm text-destructive mt-1">{errors.submissionText.message}</p>}
            </div>

            <div>
              <Label htmlFor="assignmentDescription" className="text-lg font-medium">Descripción de la Tarea</Label>
              <Input
                id="assignmentDescription"
                {...register('assignmentDescription')}
                placeholder="Describe brevemente los requisitos de la tarea."
                className={`mt-1 ${errors.assignmentDescription ? 'border-destructive ring-destructive' : ''}`}
                aria-invalid={errors.assignmentDescription ? "true" : "false"}
              />
              {errors.assignmentDescription && <p className="text-sm text-destructive mt-1">{errors.assignmentDescription.message}</p>}
            </div>

            <div>
              <Label htmlFor="relevantContext" className="text-lg font-medium">Contexto Relevante (Opcional)</Label>
              <Textarea
                id="relevantContext"
                {...register('relevantContext')}
                rows={3}
                placeholder="Cualquier contexto adicional, áreas específicas en las que enfocarse o rúbricas de calificación."
                className="mt-1"
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/80 text-primary-foreground text-lg py-3 transition-all duration-300 ease-in-out transform hover:scale-105">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generando Feedback...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Obtener Feedback de IA
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive bg-destructive/10 shadow-md">
          <CardHeader>
            <CardTitle className="font-headline text-destructive flex items-center"><AlertTriangle className="mr-2" />Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive-foreground">{error}</p>
          </CardContent>
        </Card>
      )}

      {feedbackResult && (
        <Card className="mt-8 shadow-xl bg-card animate-in fade-in-50 duration-500">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-primary flex items-center"><Sparkles className="mr-3 text-accent h-8 w-8" />Feedback y Sugerencias de IA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-2xl font-headline font-semibold mb-2 text-accent">Feedback:</h3>
              <div className="prose prose-invert max-w-none p-4 bg-muted/50 rounded-md whitespace-pre-wrap text-foreground">
                {feedbackResult.feedback}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-headline font-semibold mb-2 text-accent">Sugerencias de Mejora:</h3>
              <div className="prose prose-invert max-w-none p-4 bg-muted/50 rounded-md whitespace-pre-wrap text-foreground">
                {feedbackResult.suggestions}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
