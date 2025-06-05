import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { View } from 'lucide-react'; // Using View as a proxy for VR headset
import Link from 'next/link';
import Image from 'next/image';

export default function ExploreVRPage() {
  return (
    <div className="space-y-12 pt-8">
      <Card className="text-center py-12 shadow-xl">
        <CardHeader>
          <View className="mx-auto h-24 w-24 text-primary mb-6" />
          <CardTitle className="font-headline text-3xl">¡El Futuro del Aprendizaje está Aquí!</CardTitle>
        </CardHeader>
        <CardContent className="max-w-xl mx-auto">
          <p className="text-lg text-muted-foreground mb-8">
            Esta sección está en desarrollo. Próximamente podrás explorar y unirte a increíbles experiencias educativas en Realidad Virtual creadas por nuestros educadores y potenciadas por IA.
          </p>
          <Image 
            src="https://placehold.co/600x350.png" 
            alt="Concepto de aprendizaje en VR" 
            width={600} 
            height={350} 
            className="rounded-lg shadow-md mx-auto mb-8"
            data-ai-hint="aprendizaje vr futurista"
          />
          <Button size="lg" asChild className="bg-primary hover:bg-primary/80 text-primary-foreground">
            <Link href="/courses">Explorar Cursos Online Mientras Tanto</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
