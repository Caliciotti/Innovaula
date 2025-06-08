import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Cpu, Sparkles, School, CalendarPlus, Users, PlusCircle, Settings } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Mock data
const mockVrCreations = [
  { id: 'vr1', name: 'Viaje al Antiguo Egipto (Personalizado)', type: 'Experiencia Dirigida', status: 'Borrador', lastEdited: 'Hace 2 días' },
  { id: 'vr2', name: 'Laboratorio de Química Molecular', type: 'Aula VR', status: 'Publicada', students: 15, nextSession: 'Mañana 10:00 AM' },
];

export default function VRLabDashboardPage() {
  return (
    <div className="space-y-12 pt-8">
      {/* PageTitle removed */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg hover:shadow-accent/20 transition-shadow">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center"><Cpu className="mr-2 text-accent"/>Crear Experiencia VR Dirigida</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Diseña escenarios y misiones educativas específicas con objetivos de aprendizaje claros.</p>
            <Button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground" disabled>
              <PlusCircle className="mr-2"/> Diseñar Experiencia
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center"><School className="mr-2 text-primary"/>Crear Aula VR Persistente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Configura entornos virtuales estables como laboratorios, museos o espacios de colaboración.</p>
            <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground" disabled>
              <PlusCircle className="mr-2"/> Configurar Aula VR
            </Button>
          </CardContent>
        </Card>
         <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center"><Sparkles className="mr-2 text-yellow-500"/>Próximamente: Personalización IA</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">En el futuro, podrás conversar con nuestra IA para dar vida a tus mundos virtuales educativos.</p>
             <Image src="https://placehold.co/300x150.png" alt="IA y VR" width={300} height={150} className="rounded-md mt-3" data-ai-hint="cerebro vr conexion"/>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Mis Creaciones VR</CardTitle>
          <CardDescription>Gestiona tus experiencias y aulas VR existentes. (Funcionalidad en desarrollo)</CardDescription>
        </CardHeader>
        <CardContent>
          {mockVrCreations.length > 0 ? (
            <div className="space-y-4">
              {mockVrCreations.map(creation => (
                <Card key={creation.id} className="bg-muted/30">
                  <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <h3 className="font-semibold text-lg">{creation.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Tipo: {creation.type} | Estado: {creation.status}
                        {creation.type === 'Aula VR' && creation.students && (<span className="flex items-center"><Users className="inline h-3 w-3 mr-1"/> {creation.students} estudiantes</span>)}
                      </p>
                       <p className="text-xs text-muted-foreground">Última edición: {creation.lastEdited}</p>
                       {creation.type === 'Aula VR' && creation.nextSession && (
                          <p className="text-xs text-muted-foreground">Próxima sesión: {creation.nextSession}</p>
                       )}
                    </div>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <Button variant="outline" size="sm" disabled><Settings className="mr-2"/>Gestionar</Button>
                      <Button variant="secondary" size="sm" disabled><CalendarPlus className="mr-2"/>Programar</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Cpu className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-muted-foreground">Aún no has creado ninguna experiencia o aula VR.</p>
              <p className="text-sm text-muted-foreground">Comienza diseñando tu primera aventura educativa inmersiva.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
