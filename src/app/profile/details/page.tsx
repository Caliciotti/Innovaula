'use client';

import * as React from 'react';
import NextImage from 'next/image';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockAchievements, type Achievement } from '@/app/achievements/page'; 
import Link from 'next/link';
import { ArrowLeft, Award, Link as LinkIconExternal, BookText, BarChart3, Mail, MapPin, CalendarDays as CalendarIcon, Send } from 'lucide-react';
import { mockUserProfile as userProfileData } from '@/app/profile/page'; 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";

const AchievementItem: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center group bg-card">
      <CardContent className="p-3 flex flex-col items-center justify-center aspect-[3/2] sm:aspect-square">
        <NextImage
          src={achievement.iconUrl}
          alt={`Logro: ${achievement.courseName}`}
          width={80}
          height={80}
          className="rounded-md group-hover:opacity-80 transition-opacity"
          data-ai-hint={achievement.dataAiHint}
        />
      </CardContent>
      <CardFooter className="p-2 pt-0 w-full">
          <p className="text-xs text-muted-foreground truncate w-full font-medium group-hover:text-primary transition-colors">{achievement.courseName}</p>
      </CardFooter>
    </Card>
  );
};


export default function ProfileDetailsPage() {
  const profile = userProfileData; 
  const allUserAchievements = mockAchievements; 
  const displayedAchievements = allUserAchievements.slice(0, 9);

  const [isEmailModalOpen, setIsEmailModalOpen] = React.useState(false);
  const [emailSubject, setEmailSubject] = React.useState('');
  const [emailMessage, setEmailMessage] = React.useState('');
  const { toast } = useToast();

  const handleSendEmail = () => {
    // Simulate sending email
    console.log(`Enviando email a ${profile.email} con asunto: ${emailSubject} y mensaje: ${emailMessage}`);
    toast({
      title: "Email Enviado (Simulación)",
      description: `Tu mensaje para ${profile.name} ha sido "enviado".`,
    });
    setIsEmailModalOpen(false);
    setEmailSubject('');
    setEmailMessage('');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <PageTitle 
          title={`Detalles de ${profile.name}`}
          description="Información adicional, logros y más sobre este usuario." 
          className="mb-0"
        />
        <Button variant="outline" asChild>
          <Link href="/profile">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Perfil Principal
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl text-primary flex items-center">
                <Avatar className="h-10 w-10 mr-3 border-2 border-primary">
                  <AvatarImage src={profile.profilePictureUrl} alt={profile.name} data-ai-hint={profile.profilePictureAiHint} />
                  <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                Sobre {profile.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {profile.shortBio} 
              </p>
            </CardContent>
          </Card>

          <Card id="achievements">
            <CardHeader>
              <CardTitle className="font-headline text-xl text-primary flex items-center">
                <Award className="mr-2"/>Logros de {profile.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {displayedAchievements.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {displayedAchievements.map(ach => (
                    <AchievementItem key={ach.id} achievement={ach} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Este usuario aún no tiene logros destacados.</p>
              )}
              {allUserAchievements.length > 9 && (
                <div className="mt-6"> 
                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/80">
                        <Link href="/achievements">Ver todos los logros de {profile.name}</Link>
                    </Button>
                </div>
              )}
               {allUserAchievements.length === 0 && displayedAchievements.length === 0 && (
                 <p className="text-muted-foreground text-center py-4">Este usuario aún no tiene logros.</p>
               )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg text-primary flex items-center"><BookText className="mr-2"/>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div>
                    <p className="text-xs text-muted-foreground flex items-center"><Mail className="mr-2 h-4 w-4"/>Email:</p>
                    <a href={`mailto:${profile.email}`} className="text-sm text-accent hover:underline">{profile.email}</a>
                </div>
                {profile.location && (
                    <div>
                        <p className="text-xs text-muted-foreground flex items-center"><MapPin className="mr-2 h-4 w-4"/>Ubicación:</p>
                        <p className="text-sm">{profile.location}</p>
                    </div>
                )}
                {profile.birthDate && (
                     <div>
                        <p className="text-xs text-muted-foreground flex items-center"><CalendarIcon className="mr-2 h-4 w-4"/>Cumpleaños:</p>
                        <p className="text-sm">{profile.birthDate}</p>
                    </div>
                )}
                <p className="text-xs text-muted-foreground pt-1">Fecha de Ingreso: {profile.joinedDate}</p>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setIsEmailModalOpen(true)}>
                    <Send className="mr-2 h-4 w-4"/> Enviar Email
                </Button>
            </CardFooter>
          </Card>

          {profile.links && profile.links.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-lg text-primary flex items-center"><LinkIconExternal className="mr-2"/>Enlaces Externos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {profile.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-accent hover:underline hover:text-accent/80 transition-colors group text-sm"
                      >
                        <LinkIconExternal className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-accent/80 transition-colors" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-lg text-primary flex items-center"><BarChart3 className="mr-2"/>Rendimiento Académico</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Próximamente: Gráficas y estadísticas sobre el rendimiento del usuario en la plataforma.</p>
               <NextImage src="https://placehold.co/300x150.png" alt="Gráfica placeholder" width={300} height={150} className="rounded-md mt-3" data-ai-hint="grafico progreso"/>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-headline text-xl">Enviar Email a {profile.name}</DialogTitle>
            <DialogDescription>
              Redacta tu mensaje a continuación. El destinatario será {profile.email}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label htmlFor="emailSubject" className="sr-only">Asunto</Label>
              <Input 
                id="emailSubject"
                placeholder="Asunto"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="emailMessage" className="sr-only">Mensaje</Label>
              <Textarea 
                id="emailMessage"
                placeholder="Escribe tu mensaje aquí..."
                rows={6}
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmailModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleSendEmail} className="bg-primary hover:bg-primary/80 text-primary-foreground">
              <Send className="mr-2 h-4 w-4"/> Enviar Mensaje
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}

