"use client";

import Link from 'next/link';
import Image from 'next/image'; 
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, UserCircle, Award, CalendarDays, Briefcase, LayoutGrid,
  LayoutDashboard, School, Home, Star, MessageSquare, FlaskConical, View, Users, Bot, TrendingUp, Settings
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppHeader() {
  const pathname = usePathname();

  const mainNavLinks = [
    { href: '/dashboard', label: 'Panel', icon: LayoutDashboard, activePaths: ['/dashboard'] },
    { href: '/comunidad', label: 'Comunidad', icon: Users, activePaths: ['/comunidad', '/comunidad/(.*)'] },
    { href: '/my-learning', label: 'Mi Aprendizaje', icon: BookOpen, activePaths: ['/my-learning', '/my-learning/(.*)'] }, 
    { href: '/chat', label: 'Mensajes', icon: MessageSquare, activePaths: ['/chat'] }, 
    { href: '/achievements', label: 'Mis Logros', icon: Award, activePaths: ['/achievements'] },
    { href: '/schedule', label: 'Calendario', icon: CalendarDays, activePaths: ['/schedule'] },
  ];

  const exploreNavLinks = [
    { href: '/courses', label: 'Cursos Online', icon: BookOpen, activePaths: ['/courses', '/courses/(.*)'] },
    { href: '/find-presential', label: 'Clases Presenciales', icon: Home, activePaths: ['/find-presential', '/find-presential/(.*)'] },
    { href: '/explore-vr', label: 'Experiencias VR', icon: View, activePaths: ['/explore-vr', '/explore-vr/(.*)'] },
  ];

  const teachingNavLinks = [
    { href: '/teaching/dashboard', label: 'Panel de Educador', icon: LayoutDashboard },
    { href: '/teaching/online-courses', label: 'Cursos Online', icon: BookOpen },
    { href: '/teaching/classrooms', label: 'Aulas Virtuales', icon: School },
    { href: '/teaching/spaces', label: 'Espacios Físicos', icon: Home },
    { href: '/teaching/students', label: 'Estudiantes', icon: Users },
    { href: '/teaching/content', label: 'Contenido Educativo', icon: BookOpen },
    { href: '/teaching/avatars', label: 'Mis Avatares IA', icon: Bot },
    { href: '/teaching/vr-lab', label: 'Laboratorio VR', icon: FlaskConical },
    { href: '/teaching/analytics', label: 'Analíticas Detalladas', icon: TrendingUp },
    { href: '/teaching/reviews', label: 'Mis Reseñas', icon: Star },
    { href: '/teaching/settings', label: 'Configuración', icon: Settings },
  ];

  const profileLink = { href: '/profile', label: 'Mi Perfil', icon: UserCircle, activePaths: ['/profile'] };

  const isLinkActive = (linkActivePaths: string[], currentPath: string) => {
    return linkActivePaths.some(p => {
      const regex = new RegExp(`^${p.replace(/\[.*?\]/g, '[^/]+?').replace(/\(\.\*\)/g, '.*')}(\/.*)?$`);
      return regex.test(currentPath);
    });
  };
  
  const isExplorePathActive = isLinkActive(exploreNavLinks.flatMap(l => l.activePaths), pathname);
  const isTeachingPathActive = isLinkActive(teachingNavLinks.map(l => l.href), pathname);


  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Image 
            src="/logo-innovaula.png"
            alt="InnovAula Logo" 
            width={32} 
            height={32}
            className="h-8 w-8"
            data-ai-hint="logo cerebro circuito"
          />
          <h1 className="text-2xl font-headline font-bold text-primary">InnovAula</h1>
        </Link>
        
        <div className="flex items-center space-x-1 flex-wrap">
          {mainNavLinks.map(link => {
            const isActive = isLinkActive(link.activePaths, pathname);
            const Icon = link.icon;
            return (
              <Button variant="ghost" size="sm" asChild key={link.href} className={isActive ? 'bg-accent text-accent-foreground' : ''}>
                <Link href={link.href}><Icon className="mr-1.5 h-4 w-4"/>{link.label}</Link>
              </Button>
            );
          })}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className={isExplorePathActive ? 'bg-accent text-accent-foreground' : ''}>
                <LayoutGrid className="mr-1.5 h-4 w-4" /> Explorar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Descubre Aprendizaje</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {exploreNavLinks.map(link => {
                const Icon = link.icon;
                const isActive = isLinkActive(link.activePaths, pathname);
                return (
                  <DropdownMenuItem key={link.href} asChild className={isActive ? 'bg-accent/50 !text-accent-foreground' : ''}>
                    <Link href={link.href}>
                      <Icon className="mr-2 h-4 w-4" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className={isTeachingPathActive ? 'bg-accent text-accent-foreground' : ''}>
                <Briefcase className="mr-1.5 h-4 w-4" /> Enseñar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Herramientas de Educador</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {teachingNavLinks.map(link => {
                const Icon = link.icon;
                const isActive = pathname.startsWith(link.href);
                return (
                  <DropdownMenuItem key={link.href} asChild className={isActive ? 'bg-accent/50 !text-accent-foreground' : ''}>
                    <Link href={link.href}>
                      <Icon className="mr-2 h-4 w-4" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="sm" asChild className={isLinkActive(profileLink.activePaths, pathname) ? 'bg-accent text-accent-foreground' : ''}>
            <Link href={profileLink.href}><profileLink.icon className="mr-1.5 h-4 w-4" />{profileLink.label}</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}

