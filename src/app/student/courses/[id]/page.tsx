import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Clock, BookOpen, PlayCircle, Download, MessageSquare, CalendarPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for a single course
const mockCourse = {
  id: '1',
  title: 'Desarrollo Web Avanzado con React y Node.js',
  description: 'Domina el desarrollo full-stack y construye aplicaciones web complejas. Este curso cubre conceptos avanzados de React, gestión de estado con Redux/Zustand, desarrollo backend con Node.js y Express, integración de bases de datos con MongoDB/PostgreSQL, autenticación, pruebas y estrategias de despliegue. Al finalizar, habrás construido varios proyectos dignos de un portafolio.',
  longDescription: "Sumérgete en el mundo del desarrollo web moderno. Comenzaremos con un repaso de las características de JavaScript ES6+, luego pasaremos rápidamente a patrones avanzados de React, incluyendo hooks, API de contexto y optimización del rendimiento. Aprenderás a construir backends robustos usando Node.js y Express, gestionar datos eficazmente con bases de datos SQL y NoSQL, y asegurar tus aplicaciones con técnicas modernas de autenticación como JWT. El curso también cubre prácticas esenciales de desarrollo como control de versiones con Git, pruebas unitarias y de integración, y despliegue de aplicaciones en plataformas en la nube como Vercel o AWS. Espera proyectos prácticos, desafíos de codificación y una comunidad de apoyo.",
  category: 'Programación',
  instructor: 'Dra. Evelyn Reed',
  rating: 9.8, // out of 10
  students: 1203,
  duration: '40 horas',
  lectures: 85,
  level: 'Avanzado',
  imageUrl: 'https://placehold.co/800x450.png',
  dataAiHint: 'código desarrollo web',
  tags: ['React', 'Node.js', 'Full-Stack', 'JavaScript', 'MongoDB'],
  syllabus: [
    { title: 'Módulo 1: Conceptos Avanzados de React', duration: '8 horas' },
    { title: 'Módulo 2: Gestión de Estado Profunda', duration: '6 horas' },
    { title: 'Módulo 3: Backend con Node.js y Express', duration: '10 horas' },
    { title: 'Módulo 4: Integración de Bases de Datos', duration: '8 horas' },
    { title: 'Módulo 5: Autenticación y Seguridad', duration: '4 horas' },
    { title: 'Módulo 6: Pruebas y Despliegue', duration: '4 horas' },
  ],
  reviews: [
    { user: 'Alicia', rating: 10, comment: '¡Curso increíble, aprendí muchísimo!' },
    { user: 'Roberto', rating: 8, comment: 'Gran contenido, pero un poco rápido el ritmo.' },
  ]
};

type CourseDetailPageProps = {
  params: { id: string };
};

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  // In a real app, you'd fetch course data based on params.id
  const course = mockCourse;

  return (
    <div className="space-y-8">
      <div className="relative -mx-4 -mt-8"> {/* Extend to page edges and overlap header slightly */}
        <Image src={course.imageUrl} alt={course.title} width={1200} height={400} className="w-full h-72 md:h-96 object-cover" data-ai-hint={course.dataAiHint}/>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 md:p-8 container mx-auto">
            <PageTitle title={course.title} titleClassName="text-3xl md:text-5xl text-foreground" />
             <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                <Badge variant="default" className="text-sm bg-primary text-primary-foreground">{course.category}</Badge>
                <div className="flex items-center gap-1 text-muted-foreground">
                    <Star className="h-5 w-5 text-amber-400 fill-current" /> <span className="font-semibold text-amber-400">{course.rating} / 10</span> <span className="text-xs">({course.reviews.length} reseñas)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-5 w-5" /> {course.students} estudiantes
                </div>
            </div>
        </div>
      </div>
      

      <div className="grid lg:grid-cols-3 gap-8 pt-4">
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Acerca de este curso</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none text-lg text-muted-foreground">
              <p>{course.longDescription}</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Lo que aprenderás</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Construir aplicaciones web responsivas y dinámicas con React.</li>
                <li>Desarrollar aplicaciones robustas del lado del servidor usando Node.js y Express.</li>
                <li>Implementar soluciones efectivas de gestión de estado.</li>
                <li>Integrar bases de datos como MongoDB y PostgreSQL.</li>
                <li>Asegurar aplicaciones con técnicas modernas de autenticación.</li>
                <li>Escribir pruebas unitarias y de integración para tu código.</li>
                <li>Desplegar aplicaciones full-stack en plataformas en la nube.</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Contenido del Curso</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {course.syllabus.map((item, index) => (
                  <li key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center">
                      <PlayCircle className="h-5 w-5 mr-3 text-primary" />
                      <span>{item.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.duration}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Reseñas de Estudiantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.reviews.map((review, index) => (
                <div key={index} className="p-4 border rounded-md bg-muted/30">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold">{review.user}</p>
                    <div className="flex items-center text-amber-400">
                      <Star className="h-4 w-4 fill-current mr-1" />
                      <span className="font-semibold">{review.rating} / 10</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">Escribir una Reseña</Button>
            </CardContent>
          </Card>

        </div>

        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 self-start"> {/* Sticky sidebar */}
          <Card className="shadow-xl">
            <CardHeader>
                <CardTitle className="font-headline text-3xl text-primary">Gratis</CardTitle> {/* Or price */}
                 <CardDescription>Acceso completo de por vida</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/80 text-primary-foreground text-lg py-3 transition-transform hover:scale-105">Inscribirse Ahora</Button>
                <Button variant="outline" size="lg" className="w-full text-lg py-3">Reservar Sesión 1 a 1 <CalendarPlus className="ml-2 h-5 w-5"/></Button>
             
              <div className="space-y-2 pt-4 text-sm">
                <p className="font-semibold">Este curso incluye:</p>
                <div className="flex items-center text-muted-foreground"><Clock className="h-4 w-4 mr-2 text-primary" /> {course.duration} de video bajo demanda</div>
                <div className="flex items-center text-muted-foreground"><BookOpen className="h-4 w-4 mr-2 text-primary" /> {course.lectures} clases</div>
                <div className="flex items-center text-muted-foreground"><Download className="h-4 w-4 mr-2 text-primary" /> Recursos descargables</div>
                <div className="flex items-center text-muted-foreground"><Users className="h-4 w-4 mr-2 text-primary" /> Certificado de finalización</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
             <CardHeader>
                <CardTitle className="font-headline text-xl">Instructor</CardTitle>
             </CardHeader>
             <CardContent className="flex items-center gap-4">
                <Image src="https://placehold.co/100x100.png" alt={course.instructor} width={60} height={60} className="rounded-full" data-ai-hint="perfil profesor" />
                <div>
                    <p className="font-semibold text-lg">{course.instructor}</p>
                    <p className="text-sm text-muted-foreground">Desarrollador Full-Stack Experto</p>
                </div>
             </CardContent>
          </Card>
           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Etiquetas</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {course.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

