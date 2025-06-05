import { PageTitle } from '@/components/shared/PageTitle';
import { AiFeedbackClientPage } from './AiFeedbackClientPage';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function AssignmentFeedbackPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <PageTitle 
        title="Asistente de Aprendizaje IA" 
        description="Envía el texto de tu tarea y detalles relevantes para recibir feedback inteligente y sugerencias de mejora." 
      />
      <div className="flex justify-center mb-8">
        <Image 
          src="https://placehold.co/600x300.png" 
          alt="IA analizando texto" 
          width={600} 
          height={300} 
          className="rounded-lg shadow-lg"
          data-ai-hint="análisis ia"
        />
      </div>
      <AiFeedbackClientPage />
    </div>
  );
}
