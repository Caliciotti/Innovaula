import { PageTitle } from '@/components/shared/PageTitle';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { BookOpen, Search, Star, Filter, Users, Compass, TrendingUp, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

// Temporary icons, replace with actual lucide-react icons if available or use SVGs
const Briefcase = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
const Palette = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15.5 2.5A2.5 2.5 0 0 0 13 5c0 .56.18 1.07.47 1.5H9.57A3.5 3.5 0 0 0 6 9v5.5a2.5 2.5 0 0 0 5 0V9a1 1 0 0 1 1-1h1.5a2.5 2.5 0 0 0 0-5Z"></path><path d="M18 18v-2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2a6 6 0 0 0 6 0Z"></path><path d="M6 13.5V16a2 2 0 0 0 2 2h3.5"></path></svg>;

// Mock data for courses
const mockCourses = [
  { id: '1', title: 'Desarrollo Web Avanzado con React y Node.js', description: 'Domina el desarrollo full-stack y construye aplicaciones web complejas.', category: 'Programación', instructor: 'Dra. Evelyn Reed', rating: 9.8, students: 1203, imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'desarrollo web', tags: ['React', 'Node.js', 'Full-Stack'] },
  { id: '2', title: 'Introducción a la Computación Cuántica', description: 'Explora el fascinante mundo de la mecánica cuántica y su poder computacional.', category: 'Ciencia', instructor: 'Prof. Alistair Finch', rating: 9.4, students: 876, imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'física cuántica', tags: ['Ciencia', 'Tecnología', 'Física'] },
  { id: '3', title: 'Maestría en Marketing Digital: SEO y Redes Sociales', description: 'Aprende estrategias para impulsar la presencia online y generar engagement.', category: 'Marketing', instructor: 'Sara Chen', rating: 9.6, students: 2540, imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'marketing digital', tags: ['SEO', 'Redes Sociales', 'Marketing'] },
  { id: '4', title: 'Escritura Creativa: De la Idea a la Novela', description: 'Desata tu narrador interior y aprende el oficio de escribir una novela.', category: 'Artes y Humanidades', instructor: 'Marcos Thorne', rating: 9.2, students: 950, imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'escritura creativa', tags: ['Escritura', 'Literatura', 'Creatividad'] },
  { id: '5', title: 'Diseño de Interfaces de Usuario (UI) con Figma', description: 'Crea interfaces atractivas y funcionales desde cero.', category: 'Diseño', instructor: 'Laura Kent', rating: 9.7, students: 1800, imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'diseño ui figma', tags: ['Diseño UI', 'Figma', 'UX'] },
  { id: '6', title: 'Introducción a la Inteligencia Artificial', description: 'Comprende los fundamentos de la IA y sus aplicaciones.', category: 'Tecnología', instructor: 'Dr. Alex Mason', rating: 9.5, students: 2200, imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'inteligencia artificial cerebro', tags: ['IA', 'Machine Learning', 'Tecnología'] },
];

const mockFeaturedCourses = mockCourses.slice(0, 3); // Tomar los primeros 3 como destacados

const mockCategories = [
  { name: 'Programación', icon: BookOpen, dataAiHint: 'código categoría', courseCount: 25, image: 'https://placehold.co/300x200.png' },
  { name: 'Diseño', icon: LayoutGrid, dataAiHint: 'diseño paleta', courseCount: 18, image: 'https://placehold.co/300x200.png' },
  { name: 'Marketing', icon: TrendingUp, dataAiHint: 'gráfico marketing', courseCount: 15, image: 'https://placehold.co/300x200.png' },
  { name: 'Ciencia', icon: Compass, dataAiHint: 'átomo ciencia', courseCount: 22, image: 'https://placehold.co/300x200.png' },
  { name: 'Negocios', icon: Briefcase, dataAiHint: 'edificio negocios', courseCount: 30, image: 'https://placehold.co/300x200.png' },
  { name: 'Artes y Humanidades', icon: Palette, dataAiHint: 'pincel arte', courseCount: 12, image: 'https://placehold.co/300x200.png' },
];


export default function CourseDiscoveryPage() {
  return (
    <div className="space-y-12">
      <PageTitle title="Explorar Cursos" description="Descubre tu próxima aventura de aprendizaje en InnovAula." />

      <Card className="shadow-lg sticky top-[calc(var(--header-height,60px)+1rem)] z-40 bg-background/90 backdrop-blur-md border-border">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input type="search" placeholder="Buscar por palabra clave, instructor o categoría..." className="pl-10 text-base md:text-sm" />
            </div>
            <Button variant="outline" className="shrink-0">
              <Filter className="mr-2 h-4 w-4" /> Filtros Avanzados
            </Button>
            <Button className="bg-primary hover:bg-primary/80 text-primary-foreground shrink-0">
              <Search className="mr-2 h-4 w-4 md:hidden" />
              <span className="hidden md:inline">Buscar</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sección de Cursos Destacados */}
      <section className="space-y-6">
        <h2 className="text-3xl font-headline font-semibold text-primary flex items-center">
          <Star className="mr-3 h-7 w-7 text-amber-400 fill-amber-400" /> Cursos Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {mockFeaturedCourses.map(course => (
            <CourseCard key={course.id} course={course} featured />
          ))}
        </div>
      </section>

      {/* Sección de Explorar por Categoría */}
      <section className="space-y-6">
        <h2 className="text-3xl font-headline font-semibold text-primary flex items-center">
          <Compass className="mr-3 h-7 w-7" /> Explorar por Categoría
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {mockCategories.map(category => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </section>

      {/* Sección de Todos los Cursos */}
      <section className="space-y-6">
         <div className="flex justify-between items-center">
            <h2 className="text-3xl font-headline font-semibold text-primary flex items-center">
              <LayoutGrid className="mr-3 h-7 w-7" /> Todos los Cursos
            </h2>
            <Button variant="link" className="text-primary">Ver todos</Button>
         </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {mockCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="bg-secondary hover:bg-secondary/80">Cargar Más Cursos</Button>
        </div>
      </section>
    </div>
  );
}

// Course Card Component (puede moverse a su propio archivo más tarde)
interface CourseCardProps {
  course: typeof mockCourses[0];
  featured?: boolean;
}

function CourseCard({ course, featured = false }: CourseCardProps) {
  return (
    <Card className={`overflow-hidden shadow-lg hover:shadow-primary/30 transition-all duration-300 flex flex-col transform hover:scale-[1.02] ${featured ? 'border-2 border-primary/50' : ''}`}>
      <div className="relative">
        <Image src={course.imageUrl} alt={course.title} width={400} height={225} className="w-full h-48 object-cover" data-ai-hint={course.dataAiHint} />
        <Badge variant="secondary" className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs px-2 py-1">{course.category}</Badge>
        {featured && <Badge variant="default" className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-2 py-1"><Star className="h-3 w-3 mr-1" />Destacado</Badge>}
      </div>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="font-headline text-lg md:text-xl leading-tight hover:text-primary transition-colors">
          <Link href={`/student/courses/${course.id}`}>{course.title}</Link>
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground pt-1">Por {course.instructor}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow py-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
        <div className="mt-2 flex flex-wrap gap-1">
            {course.tags?.slice(0,2).map(tag => <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>)}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm pt-3 border-t mt-auto">
        <div className="flex items-center gap-1 text-amber-400">
          <Star className="h-4 w-4 fill-current" /> {course.rating} / 10
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Users className="h-4 w-4" /> {course.students}
        </div>
        <Button variant="ghost" size="sm" asChild className="text-primary hover:bg-primary/10 px-2">
          <Link href={`/student/courses/${course.id}`}>Ver Detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// Category Card Component (puede moverse a su propio archivo más tarde)
interface CategoryCardProps {
  category: typeof mockCategories[0];
}
function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = category.icon;
  return (
    <Link href={`/student/courses?category=${encodeURIComponent(category.name)}`} className="block group">
      <Card className="overflow-hidden shadow-md hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105 aspect-[4/3] md:aspect-video flex flex-col justify-between">
         <div className="relative w-full h-2/3">
          <Image src={category.image} alt={category.name} layout="fill" objectFit="cover" data-ai-hint={category.dataAiHint}/>
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
        </div>
        <CardHeader className="p-3 md:p-4 !pt-2 flex-grow">
          <div className="flex items-center gap-2">
            <IconComponent className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
            <CardTitle className="font-headline text-base md:text-lg group-hover:text-primary transition-colors">{category.name}</CardTitle>
          </div>
          <CardDescription className="text-xs">{category.courseCount} cursos</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
