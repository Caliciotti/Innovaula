'use client';

import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Info } from 'lucide-react';

export default function OldCommunityContentManagementPage() {
  return (
    <div className="space-y-8 text-center py-10">
      <Info className="mx-auto h-16 w-16 text-primary mb-4" />
      <PageTitle
        title="Esta sección se ha movido"
        description="La gestión de contenido comunitario ahora es accesible para todos los usuarios desde el Dashboard principal."
        className="text-center"
      />
      <Button asChild size="lg">
        <Link href="/my-community-content">Ir a Mis Posts Comunitarios</Link>
      </Button>
       <p className="text-muted-foreground mt-4">
        Si eres educador, puedes seguir creando y gestionando tu contenido desde allí.
      </p>
    </div>
  );
}
