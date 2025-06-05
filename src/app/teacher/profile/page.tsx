import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Link as LinkIcon, Briefcase, CalendarClock } from 'lucide-react';

// Mock data for teacher profile
const mockTeacherProfile = {
  name: 'Prof. Dra. Evelyn Reed',
  email: 'evelyn.reed@innovaula.edu',
  bio: `Educadora e investigadora apasionada con más de 10 años de experiencia en el desarrollo web full-stack y la aplicación de IA en la educación. 
Mi misión es inspirar a la próxima generación de innovadores tecnológicos y fomentar un aprendizaje crítico y creativo.
Creo firmemente en el poder de la tecnología para transformar la educación.`,
  specialization: 'Desarrollo Web Avanzado, IA en Educación, Diseño de Experiencias de Aprendizaje',
  profilePictureUrl: 'https://placehold.co/150x150.png',
  profilePictureAiHint: 'profesora sonriendo',
  coverPhotoUrl: 'https://placehold.co/1000x300.png',
  coverPhotoAiHint: 'tecnología educación',
  links: [
    { label: 'Perfil Académico Institucional', url: '#' },
    { label: 'Publicaciones en ResearchGate', url: '#' },
    { label: 'Blog sobre Innovación Educativa', url: '#' },
  ],
  officeHours: 'Lunes y Miércoles, 2:00 PM - 4:00 PM (Online, previa cita)',
};

export default function TeacherProfilePage() {
  const profile = mockTeacherProfile;

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden shadow-xl rounded-lg">
        <div className="relative h-48 md:h-64 w-full">
          <Image
            src={profile.coverPhotoUrl}
            alt="Foto de portada del profesor"
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
              <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-grow mt-4 md:mt-0 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">{profile.name}</h1>
              <p className="text-muted-foreground">{profile.email}</p>
              <div className="flex items-center text-sm text-muted-foreground mt-1 justify-center md:justify-start">
                <Briefcase className="h-4 w-4 mr-1.5 shrink-0"/> <span className="truncate">{profile.specialization}</span>
              </div>
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

        <div className="space-y-6">
          <Card className="shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl text-primary">Enlaces Profesionales</CardTitle>
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
                <p className="text-sm text-muted-foreground">No hay enlaces disponibles.</p>
              )}
            </CardContent>
          </Card>
          <Card className="shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl text-primary flex items-center">
                <CalendarClock className="mr-2 h-5 w-5" /> Horario de Consulta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{profile.officeHours}</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Aquí se podrían agregar más secciones como "Mis Aulas", "Biblioteca de Contenido", "Reseñas Recibidas", etc. */}
       <Card className="shadow-lg rounded-lg">
        <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Mis Cursos y Aulas</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Próximamente: un resumen de tus cursos activos y aulas gestionadas.</p>
        </CardContent>
      </Card>
    </div>
  );
}

