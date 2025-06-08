import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/shared/PageTitle';
import { ArrowRight, Sparkles } from 'lucide-react';
// Removed Image import as it's no longer used

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <PageTitle 
        title="Bienvenido a InnovAula" 
        description="Tu plataforma integral para aprender y enseñar con el poder de la IA." 
        className="text-center mb-12" 
      />

      <div className="bg-card p-8 sm:p-12 rounded-lg shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 max-w-md w-full text-center">
        <Sparkles className="w-20 h-20 text-primary mb-6 mx-auto" />
        <h2 className="text-3xl font-headline font-semibold text-primary mb-4">Comienza tu Viaje</h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Explora cursos, comparte tu conocimiento, y alcanza tus metas educativas y profesionales.
        </p>
        <Button variant="default" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors text-xl py-3" asChild>
          <Link href="/dashboard">
            Ingresar a InnovAula <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>

      {/* The "Why InnovAula?" section has been removed. */}
      {/*
      <div className="mt-16 text-center max-w-3xl">
        <h3 className="text-2xl font-headline font-semibold mb-4">¿Por qué InnovAula?</h3>
        <p className="text-muted-foreground text-lg mb-2">
          InnovAula es pionera en una nueva era de la educación al integrar perfectamente la IA de vanguardia con herramientas de aprendizaje interactivas.
          Nuestra plataforma empodera tanto a estudiantes como a profesores, fomentando un viaje educativo dinámico y personalizado en un solo lugar.
        </p>
        <Image
          src="https://placehold.co/800x400.png"
          alt="Entorno de aprendizaje futurista"
          width={800}
          height={400}
          className="rounded-lg shadow-lg mt-6"
          data-ai-hint="aprendizaje colaborativo"
        />
      </div>
      */}
    </div>
  );
}
