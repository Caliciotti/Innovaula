import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Link as LinkIcon } from 'lucide-react';

// Mock data for student profile
const mockStudentProfile = {
  name: 'Ana Martínez',
  email: 'ana.martinez@example.com',
  bio: `Estudiante apasionada de desarrollo web y diseño UX. 
Siempre buscando aprender nuevas tecnologías y mejorar mis habilidades.
En mi tiempo libre, disfruto de la fotografía y el senderismo.`,
  profilePictureUrl: 'https://placehold.co/150x150.png',
  profilePictureAiHint: 'estudiante sonriendo',
  coverPhotoUrl: 'https://placehold.co/1000x300.png',
  coverPhotoAiHint: 'paisaje abstracto',
  links: [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/anamartinez' },
    { label: 'GitHub', url: 'https://github.com/anamartinez' },
    { label: 'Portafolio Personal', url: '#' },
  ],
  joinedDate: 'Miembro desde Julio 2023',
};

export default function StudentProfilePage() {
  const profile = mockStudentProfile;

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden shadow-xl rounded-lg">
        <div className="relative h-48 md:h-64 w-full">
          <Image
            src={profile.coverPhotoUrl}
            alt="Foto de portada del estudiante"
            layout="fill"
            objectFit="cover"
            className="bg-muted"
            data-ai-hint={profile.coverPhotoAiHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <CardContent className="relative p-6 pt-0">
          <div className="flex flex-col md:flex-row items-center md:items-end md:space-x-6 -mt-16 md:-mt-20">
            <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background bg-background shadow-lg">
              <AvatarImage src={profile.profilePictureUrl} alt={profile.name} data-ai-hint={profile.profilePictureAiHint} />
              <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-grow mt-4 md:mt-0 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">{profile.name}</h1>
              <p className="text-muted-foreground">{profile.email}</p>
              <p className="text-sm text-muted-foreground">{profile.joinedDate}</p>
            </div>
            <Button variant="outline" size="lg" className="mt-6 md:mt-0 md:self-end shrink-0">
              <Edit className="mr-2 h-5 w-5" /> Editar Perfil
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Sobre Mí</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{profile.bio}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Mis Enlaces</CardTitle>
          </CardHeader>
          <CardContent>
            {profile.links.length > 0 ? (
              <ul className="space-y-3">
                {profile.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-accent hover:underline hover:text-accent/80 transition-colors group"
                    >
                      <LinkIcon className="mr-2 h-5 w-5 text-muted-foreground group-hover:text-accent/80 transition-colors" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No hay enlaces para mostrar.</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Aquí se podrían agregar más secciones como "Mis Cursos Inscritos", "Mi Progreso", "Actividad Reciente", etc. */}
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Próximamente: un resumen de tu actividad en la plataforma.</p>
        </CardContent>
      </Card>
    </div>
  );
}
