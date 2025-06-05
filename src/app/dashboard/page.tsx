'use client';

import * as React from 'react';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { BookOpen, CalendarDays, Award, Search, Users, LayoutGrid, PlusCircle, ArrowRight, Rss, MessageSquare, Briefcase, Star, TrendingUp, Compass, FileText, Home as ThemeHomeIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CourseCard, type CourseCardProps as DashboardCourseCardProps } from '@/app/courses/page';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Data for Profile Summary Card
import { mockPostsInitial as allCommunityPosts, alexRomeroAuthor } from '@/app/comunidad/page';
import { mockUserProfile as dashboardUserProfile } from '@/app/profile/page';

const mockDashboardCourses: DashboardCourseCardProps['course'][] = [
  { id: '1', title: 'Desarrollo Web Avanzado con React y Node.js', description: 'Domina el desarrollo full-stack.', category: 'Programación', instructor: 'Dra. Evelyn Reed', rating: 9.8, students: 1203, imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'desarrollo web', tags: ['React', 'Node.js'] },
  { id: '2', title: 'Introducción a la Computación Cuántica', description: 'Explora el fascinante mundo cuántico.', category: 'Ciencia', instructor: 'Prof. Alistair Finch', rating: 9.4, students: 876, imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'física cuántica', tags: ['Ciencia', 'Tecnología'] },
  { id: '6', title: 'Introducción a la Inteligencia Artificial', description: 'Comprende los fundamentos de la IA.', category: 'Tecnología', instructor: 'Dr. Alex Mason', rating: 9.5, students: 2200, imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'inteligencia artificial cerebro', tags: ['IA', 'Machine Learning'] },
];

const SCROLL_AMOUNT = 200; // Pixels to scroll with each arrow click

export default function DashboardPage() {
  const upcomingLessons = [
    { id: 1, title: 'Cálculo Avanzado - Repaso General', time: 'Mañana, 10:00 AM', subject: 'Matemáticas' },
    { id: 2, title: 'Introducción a la Física Cuántica - Sesión de Preguntas', time: 'Próximo Lunes, 2:00 PM', subject: 'Física' },
  ];

  const learningStats = {
    coursesInProgress: 3,
    achievementsUnlocked: 5,
  };

  const userProfileSummary = {
    name: dashboardUserProfile.name,
    avatarUrl: dashboardUserProfile.profilePictureUrl,
    avatarFallback: dashboardUserProfile.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase(),
    profileAiHint: dashboardUserProfile.profilePictureAiHint,
    themes: dashboardUserProfile.userThemes,
    recentPosts: allCommunityPosts.filter(post => post.author.name === alexRomeroAuthor.name)
                                   .sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                                   .slice(0, 9),
  };

  const collectionsScrollRef = React.useRef<HTMLDivElement>(null);
  const [showPrevArrow, setShowPrevArrow] = React.useState(false);
  const [showNextArrow, setShowNextArrow] = React.useState(false);

  const checkScrollability = React.useCallback(() => {
    const container = collectionsScrollRef.current;
    if (container) {
      const canScrollLeft = container.scrollLeft > 0;
      const canScrollRight = container.scrollLeft < (container.scrollWidth - container.clientWidth);
      setShowPrevArrow(canScrollLeft);
      setShowNextArrow(canScrollRight);
    }
  }, []);

  React.useEffect(() => {
    const container = collectionsScrollRef.current;
    if (container) {
      checkScrollability(); // Initial check
      container.addEventListener('scroll', checkScrollability); // Listen for scroll events on the container itself
      window.addEventListener('resize', checkScrollability); // Listen for window resize

      // Re-check if themes change, might need a slight delay if image loading affects scrollWidth initially
      const timeoutId = setTimeout(checkScrollability, 100);

      return () => {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
        clearTimeout(timeoutId);
      };
    }
  }, [userProfileSummary.themes, checkScrollability]);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = collectionsScrollRef.current;
    if (container) {
      const currentScrollLeft = container.scrollLeft;
      const newScrollLeft = direction === 'left' 
        ? currentScrollLeft - SCROLL_AMOUNT 
        : currentScrollLeft + SCROLL_AMOUNT;
      container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
      // checkScrollability will be called by the scroll event listener
    }
  };

  return (
    <div className="space-y-8 pt-8">
      <PageTitle
        title={`Bienvenido a tu Panel, ${userProfileSummary.name.split(' ')[0]}`}
        description="Tu centro de mando para el aprendizaje, la colaboración y la gestión en InnovAula."
        className="mb-8"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center"><Rss className="mr-2 text-primary" />Comunidad InnovAula</CardTitle>
              <CardDescription>Conecta, comparte y aprende con otros miembros.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Image src="https://placehold.co/600x200.png" data-ai-hint="comunidad colaborando" alt="Comunidad colaborando" width={600} height={200} className="rounded-lg shadow-sm w-full object-cover h-40"/>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/80 text-primary-foreground" asChild>
                        <Link href="/comunidad">
                            <LayoutGrid className="mr-2 h-5 w-5" /> Explorar Feed
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full" asChild>
                        <Link href="/my-community-content/new">
                            <PlusCircle className="mr-2 h-5 w-5" /> Crear Nuevo Post
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full" asChild>
                        <Link href="/my-community-content">
                            <BookOpen className="mr-2 h-5 w-5" /> Gestionar Mis Posts
                        </Link>
                    </Button>
                </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center"><TrendingUp className="mr-2 text-primary" />Mi Progreso Académico</CardTitle>
              <CardDescription>Revisa tu avance y logros.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <Link href="/my-learning" className="block">
                <Card className="h-full hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center"><BookOpen className="mr-2 text-primary"/>Mis Cursos</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-3xl font-bold">{learningStats.coursesInProgress}</p>
                    <p className="text-sm text-muted-foreground">Cursos en Progreso</p>
                  </CardContent>
                  <CardFooter className="text-xs text-primary hover:underline !pt-1 justify-end">
                    Ir a Mi Aprendizaje <ArrowRight className="ml-1 h-3 w-3"/>
                  </CardFooter>
                </Card>
              </Link>
              <Link href="/achievements" className="block">
                <Card className="h-full hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center"><Award className="mr-2 text-primary"/>Mis Logros</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-3xl font-bold">{learningStats.achievementsUnlocked}</p>
                    <p className="text-sm text-muted-foreground">Logros Desbloqueados</p>
                  </CardContent>
                  <CardFooter className="text-xs text-primary hover:underline !pt-1 justify-end">
                    Ver Mis Logros <ArrowRight className="ml-1 h-3 w-3"/>
                  </CardFooter>
                </Card>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center"><Compass className="mr-2 text-primary" />Descubre Nuevos Cursos</CardTitle>
              <CardDescription>Encuentra tu próxima aventura de aprendizaje.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input type="search" placeholder="Buscar por palabra clave, instructor..." className="pl-10 w-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockDashboardCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
              <Button variant="default" className="w-full bg-primary hover:bg-primary/80 text-primary-foreground text-lg py-3" asChild>
                <Link href="/courses">
                    Explorar Catálogo Completo <ArrowRight className="ml-2 h-5 w-5"/>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
            <CardHeader className="flex flex-row items-center gap-3 pb-3">
              <Avatar className="h-10 w-10">
                <Image src={userProfileSummary.avatarUrl} alt={userProfileSummary.name} width={40} height={40} data-ai-hint={userProfileSummary.profileAiHint} />
                <AvatarFallback>{userProfileSummary.avatarFallback}</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-xl">Mi Perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Colecciones</p>
                <div className="relative">
                  {showPrevArrow && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/70 hover:bg-background"
                      onClick={() => handleScroll('left')}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                  )}
                  <div ref={collectionsScrollRef} className="flex overflow-x-hidden space-x-3 py-1 items-start scroll-smooth">
                    {userProfileSummary.themes.map(theme => {
                      const LucideIcon = theme.lucideIcon || ThemeHomeIcon;
                      return (
                        <div key={theme.id} className="flex flex-col items-center w-16 text-center cursor-pointer group shrink-0">
                          <div className="w-14 h-14 rounded-full border-2 border-muted group-hover:border-primary transition-all duration-200 flex items-center justify-center overflow-hidden bg-card mb-1">
                            {theme.iconUrl ? (
                              <Image src={theme.iconUrl} alt={theme.name} width={56} height={56} className="object-cover group-hover:scale-110 transition-transform" data-ai-hint={theme.iconAiHint || theme.name.toLowerCase().split(' ').slice(0,2).join(' ')} />
                            ) : (
                              <LucideIcon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors"/>
                            )}
                          </div>
                          <span className="text-[10px] font-medium text-muted-foreground group-hover:text-primary transition-colors truncate w-full leading-tight">{theme.name}</span>
                        </div>
                      );
                    })}
                  </div>
                  {showNextArrow && (
                     <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/70 hover:bg-background"
                        onClick={() => handleScroll('right')}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5">Posts Recientes</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {userProfileSummary.recentPosts.map(post => (
                    <div key={post.id} className="aspect-square bg-muted rounded-sm overflow-hidden relative group">
                      {post.imageUrl ? (
                        <Image src={post.imageUrl} alt={post.title || 'Post'} layout="fill" objectFit="cover" data-ai-hint={post.imageAiHint || 'post image'}/>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <FileText className="h-5 w-5 text-muted-foreground/70" />
                        </div>
                      )}
                       <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ArrowRight className="h-5 w-5 text-white"/>
                      </div>
                    </div>
                  ))}
                  {Array(Math.max(0, 9 - userProfileSummary.recentPosts.length)).fill(null).map((_, idx) => (
                     <div key={`placeholder-${idx}`} className="aspect-square bg-muted/50 rounded-sm"></div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-3">
              <Button variant="outline" className="w-full text-sm" asChild>
                <Link href="/profile">Visitar Mi Perfil Completo</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><CalendarDays className="mr-2 text-primary" />Próximas Sesiones</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingLessons.length > 0 ? (
                <ul className="space-y-3">
                  {upcomingLessons.map(lesson => (
                    <li key={lesson.id} className="p-3 bg-muted/50 rounded-md hover:bg-muted transition-colors">
                      <h3 className="font-semibold text-md">{lesson.title}</h3>
                      <p className="text-xs text-muted-foreground">{lesson.subject} - {lesson.time}</p>
                      <Button variant="link" size="sm" className="p-0 h-auto mt-0.5 text-primary text-xs">Unirse</Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-sm">No hay próximas sesiones.</p>
              )}
            </CardContent>
            <CardFooter className="border-t pt-3">
                <Button variant="outline" className="w-full text-sm" asChild>
                    <Link href="/schedule">Ver Horario Completo</Link>
                </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><MessageSquare className="mr-2 text-primary" />Mensajería</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground" asChild>
                <Link href="/chat">Abrir Centro de Mensajes</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-accent/20 transition-shadow border-accent/30">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><Briefcase className="mr-2 text-accent" />Modo Educador</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                  Accede a herramientas para crear cursos, gestionar aulas y más.
              </p>
              <Button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground" asChild>
                <Link href="/teaching/dashboard">Ir al Panel de Educador</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
