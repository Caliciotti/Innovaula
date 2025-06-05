import { PageTitle } from '@/components/shared/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';
import Image from 'next/image';

export default function TeachingSettingsPage() {
  return (
    <div className="space-y-8 pt-8">
      <PageTitle
        title="Configuración de Educador"
        description="Gestiona tus preferencias y ajustes de la plataforma como educador."
      />
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center">
            <Settings className="mr-2 text-primary" />
            Página en Construcción
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Image
            src="https://placehold.co/600x300.png"
            alt="Página en construcción"
            width={600}
            height={300}
            className="mx-auto mb-6 rounded-lg shadow-md"
            data-ai-hint="construcción herramientas"
          />
          <p className="text-muted-foreground text-lg">
            Esta sección estará disponible próximamente con todas las opciones de configuración para tu perfil de educador.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
