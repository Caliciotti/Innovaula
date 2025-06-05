'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  PlusCircle, BookOpen, Users, Star, Settings, Eye, Video, Film, Bot, 
  Presentation as Slideshow, Gamepad2, FileText as FileTextIconLucide, 
  MessageSquare as ChatIcon, Mic, Orbit, ClipboardList, 
  TrendingUp, Percent, CheckCircle, Filter as FilterIcon, SortAsc, ListChecks, Award as BadgeIcon
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label"; // Added Label import

interface CourseModulePreview {
  id: string;
  title: string;
  type: string; 
}

export interface OnlineCourseSummary {
  id: string;
  title: string;
  category: string; 
  level: string;      
  estimatedDuration?: string;
  description: string; 
  longDescription: string; 
  imageUrl: string;
  imageAiHint: string;
  studentsEnrolled: number;
  averageRating: number;
  status: 'Borrador' | 'Publicado' | 'Archivado';
  modules: CourseModulePreview[]; 
  price?: string;
  currency?: "USD";
  aiAssistantId?: string;
  evaluationMethod?: string;
  studentsApproved?: number;
  creationDate?: Date;
  badgeImageUrl?: string; 
  badgeImageAiHint?: string;
  certificateImageUrl?: string; 
}

const previewContentTypesOptions = [
  { value: "videoEnPersona", label: "Video en Persona", icon: Video, colorClass: "bg-sky-100 dark:bg-sky-900 border-sky-500", textColorClass: "text-sky-700 dark:text-sky-200" },
  { value: "avatarIA", label: "Avatar IA", icon: Bot, colorClass: "bg-teal-100 dark:bg-teal-900 border-teal-500", textColorClass: "text-teal-700 dark:text-teal-200" },
  { value: "claseAnimada", label: "Clase Animada", icon: Film, colorClass: "bg-purple-100 dark:bg-purple-900 border-purple-500", textColorClass: "text-purple-700 dark:text-purple-200" },
  { value: "presentacionNarrada", label: "Presentación Narrada", icon: Slideshow, colorClass: "bg-amber-100 dark:bg-amber-900 border-amber-500", textColorClass: "text-amber-700 dark:text-amber-200" },
  { value: "interactivoEducativo", label: "Interactivo Educativo", icon: Gamepad2, colorClass: "bg-rose-100 dark:bg-rose-900 border-rose-500", textColorClass: "text-rose-700 dark:text-rose-200" },
  { value: "lecturaGuiada", label: "Lectura Guiada", icon: FileTextIconLucide, colorClass: "bg-slate-100 dark:bg-slate-700 border-slate-500", textColorClass: "text-slate-700 dark:text-slate-200" },
  { value: "chatDidacticoIA", label: "Chat Didáctico con IA", icon: ChatIcon, colorClass: "bg-indigo-100 dark:bg-indigo-900 border-indigo-500", textColorClass: "text-indigo-700 dark:text-indigo-200" },
  { value: "audioLeccion", label: "Audio Lección", icon: Mic, colorClass: "bg-lime-100 dark:bg-lime-900 border-lime-500", textColorClass: "text-lime-700 dark:text-lime-200" },
  { value: "simulacionVirtual", label: "Simulación Virtual", icon: Orbit, colorClass: "bg-cyan-100 dark:bg-cyan-900 border-cyan-500", textColorClass: "text-cyan-700 dark:text-cyan-200" },
  { value: "proyectoGuiado", label: "Proyecto Guiado", icon: ClipboardList, colorClass: "bg-emerald-100 dark:bg-emerald-900 border-emerald-500", textColorClass: "text-emerald-700 dark:text-emerald-200" },
];

export const mockOnlineCourses: OnlineCourseSummary[] = [
  {
    id: 'oc1',
    title: 'JavaScript Avanzado: Patrones y Buenas Prácticas',
    category: 'Programación',
    level: 'Avanzado',
    estimatedDuration: '40 horas',
    description: 'Domina los conceptos avanzados de JavaScript, patrones de diseño y optimización para aplicaciones robustas.',
    longDescription: 'Este curso profundiza en JavaScript ES6+, closures, promesas, async/await, patrones de diseño como Singleton y Factory, y técnicas de optimización de rendimiento. Ideal para desarrolladores que buscan llevar sus habilidades de JavaScript al siguiente nivel y entender cómo escribir código más limpio, eficiente y mantenible. Se explorarán casos de uso reales y se realizarán ejercicios prácticos para consolidar el aprendizaje.',
    imageUrl: 'https://placehold.co/400x225.png',
    imageAiHint: 'javascript código moderno',
    studentsEnrolled: 152,
    averageRating: 4.8,
    status: 'Publicado',
    modules: [
      { id: 'm1-oc1', title: 'Introducción a ES6+ y Novedades', type: 'videoEnPersona' },
      { id: 'm2-oc1', title: 'Closures y Ámbito en Profundidad', type: 'lecturaGuiada' },
      { id: 'm3-oc1', title: 'Programación Asíncrona: Promesas y Async/Await', type: 'videoEnPersona' },
    ],
    price: "49.99",
    currency: "USD",
    aiAssistantId: "asist1",
    evaluationMethod: "Proyecto Práctico",
    studentsApproved: 130,
    creationDate: new Date('2023-10-15T10:00:00Z'),
    badgeImageUrl: 'https://placehold.co/150x150.png',
    badgeImageAiHint: 'insignia javascript experto',
    certificateImageUrl: 'https://placehold.co/800x600.png?text=Certificado+JS+Avanzado',
  },
  {
    id: 'oc2',
    title: 'Introducción al Diseño UX con Figma',
    category: 'Diseño',
    level: 'Principiante',
    estimatedDuration: '25 horas',
    description: 'Aprende los fundamentos del diseño de experiencia de usuario y crea prototipos interactivos con Figma.',
    longDescription: 'Cubre principios de UX, investigación de usuarios, creación de personas, user journeys, wireframing, prototipado en Figma (componentes, auto layout, variantes), y pruebas de usabilidad básicas. Perfecto para quienes empiezan en el mundo del diseño UX/UI y quieren una base sólida.',
    imageUrl: 'https://placehold.co/400x225.png',
    imageAiHint: 'figma ui diseño',
    studentsEnrolled: 98,
    averageRating: 4.6,
    status: 'Publicado',
    modules: [
      { id: 'm1-oc2', title: '¿Qué es UX y por qué es Importante?', type: 'claseAnimada' },
      { id: 'm2-oc2', title: 'Primeros Pasos en Figma', type: 'videoEnPersona' },
    ],
    price: "29.99",
    currency: "USD",
    evaluationMethod: "Proyecto Práctico",
    studentsApproved: 85,
    creationDate: new Date('2024-01-20T14:30:00Z'),
    badgeImageUrl: 'https://placehold.co/150x150.png',
    badgeImageAiHint: 'insignia figma diseñador',
    certificateImageUrl: 'https://placehold.co/800x600.png?text=Certificado+Diseño+UX',
  },
];
  {
    id: 'oc3',
    title: 'Marketing de Contenidos para Principiantes (Borrador)',
    category: 'Marketing',
    level: 'Principiante',
    estimatedDuration: '15 horas',
    description: 'Descubre cómo crear y distribuir contenido valioso para atraer y retener a tu audiencia.',
    longDescription: 'Aprende a definir tu audiencia objetivo, planificar tu calendario editorial, crear diferentes tipos de contenido (artículos de blog, infografías, videos cortos para redes sociales) y medir los resultados de tus estrategias. Este curso es un borrador y se actualizará pronto con más módulos y ejemplos prácticos.',
    imageUrl: 'https://placehold.co/400x225.png',
    imageAiHint: 'marketing contenido estrategia',
    studentsEnrolled: 35,
    averageRating: 0,
    status: 'Borrador',
    modules: [
      { id: 'm1-oc3', title: 'Definiendo tu Estrategia de Contenidos', type: 'presentacionNarrada'},
      { id: 'm2-oc3', title: 'Ejercicio Interactivo: Creando tu Buyer Persona', type: 'interactivoEducativo'},
    ],
    price: "",
    currency: "USD",
    studentsApproved: 0,
    creationDate: new Date('2024-03-05T09:00:00Z'),
  },
  {
    id: 'oc4',
    title: 'Fotografía Nocturna: Captura la Magia de la Noche',
    category: 'Otro',
    level: 'Intermedio',
    estimatedDuration: '10 horas',
    description: 'Aprende técnicas y trucos para tomar fotos impresionantes en condiciones de poca luz.',
    longDescription: 'Desde la configuración de la cámara hasta la composición y edición, este curso te guiará para capturar estrellas, paisajes urbanos nocturnos y efectos de light painting. Se requieren conocimientos básicos de fotografía.',
    imageUrl: 'https://placehold.co/400x225.png',
    imageAiHint: 'cámara noche estrellas',
    studentsEnrolled: 75,
    averageRating: 4.9,
    status: 'Publicado',
    modules: [
      { id: 'm1-oc4', title: 'Equipo y Configuración Esencial', type: 'videoEnPersona' },
      { id: 'm2-oc4', title: 'Técnicas de Larga Exposición', type: 'lecturaGuiada' },
    ],
    price: "39.00",
    currency: "USD",
    aiAssistantId: "asist2",
    evaluationMethod: "Participación y Tareas",
    studentsApproved: 70,
    creationDate: new Date('2023-11-25T18:00:00Z'),
    badgeImageUrl: 'https://placehold.co/150x150.png',
    badgeImageAiHint: 'insignia fotografía noche',
    certificateImageUrl: 'https://placehold.co/800x600.png?text=Certificado+Fotografía+Nocturna',
  },
];

const courseCategoriesOptions = ["Todos", "Programación", "Diseño", "Marketing", "Negocios", "Idiomas", "Música", "Ciencia", "Humanidades", "Otro"];
const courseLevelsOptions = ["Todos", "Principiante", "Intermedio", "Avanzado", "Todos los niveles"];
const sortOptions = [
  { value: 'newest', label: 'Más Recientes' },
  { value: 'oldest', label: 'Más Antiguos' },
  { value: 'mostEnrolled', label: 'Más Inscripciones' },
  { value: 'highestRated', label: 'Mejor Valorados' },
];

export default function ManageOnlineCoursesPage() {
  const [courses, setCourses] = React.useState<OnlineCourseSummary[]>(mockOnlineCourses);
  const [displayCourses, setDisplayCourses] = React.useState<OnlineCourseSummary[]>(mockOnlineCourses);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = React.useState(false);
  const [selectedCourseForPreview, setSelectedCourseForPreview] = React.useState<OnlineCourseSummary | null>(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = React.useState(false);
  const [selectedCertificateUrl, setSelectedCertificateUrl] = React.useState<string | null>(null);

  const [categoryFilter, setCategoryFilter] = React.useState<string>('Todos');
  const [levelFilter, setLevelFilter] = React.useState<string>('Todos');
  const [sortCriteria, setSortCriteria] = React.useState<string>('newest');

  const [stats, setStats] = React.useState({
    totalCourses: 0,
    totalStudentsEnrolled: 0,
    totalStudentsApproved: 0,
    approvalRate: 0,
  });

  React.useEffect(() => {
    const totalCourses = courses.length;
    const totalStudentsEnrolled = courses.reduce((sum, course) => sum + course.studentsEnrolled, 0);
    const totalStudentsApproved = courses.reduce((sum, course) => sum + (course.studentsApproved || 0), 0);
    const approvalRate = totalStudentsEnrolled > 0 ? (totalStudentsApproved / totalStudentsEnrolled) * 100 : 0;
    setStats({ totalCourses, totalStudentsEnrolled, totalStudentsApproved, approvalRate });

    let filtered = [...courses];

    if (categoryFilter !== 'Todos') {
      filtered = filtered.filter(course => course.category === categoryFilter);
    }
    if (levelFilter !== 'Todos') {
      filtered = filtered.filter(course => course.level === levelFilter);
    }

    switch (sortCriteria) {
      case 'newest':
        filtered.sort((a, b) => (b.creationDate?.getTime() || 0) - (a.creationDate?.getTime() || 0));
        break;
      case 'oldest':
        filtered.sort((a, b) => (a.creationDate?.getTime() || 0) - (b.creationDate?.getTime() || 0));
        break;
      case 'mostEnrolled':
        filtered.sort((a, b) => b.studentsEnrolled - a.studentsEnrolled);
        break;
      case 'highestRated':
        filtered.sort((a, b) => b.averageRating - a.averageRating);
        break;
      default:
        break;
    }
    setDisplayCourses(filtered);
  }, [courses, categoryFilter, levelFilter, sortCriteria]);


  const handleOpenPreviewModal = (course: OnlineCourseSummary) => {
    setSelectedCourseForPreview(course);
    setIsPreviewModalOpen(true);
  };

  const handleOpenCertificateModal = (certificateUrl: string) => {
    setSelectedCertificateUrl(certificateUrl);
    setIsCertificateModalOpen(true);
  };

  return (
    <div className="space-y-8 pt-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cursos Creados</CardTitle>
            <ListChecks className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Estudiantes Inscritos</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudentsEnrolled.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Estudiantes Aprobados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudentsApproved.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tasa de Aprobación</CardTitle>
            <Percent className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approvalRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center"><FilterIcon className="mr-2 h-5 w-5"/>Filtrar y Ordenar Cursos</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="grid sm:grid-cols-3 gap-3 flex-grow">
            <div>
              <Label htmlFor="categoryFilter" className="text-xs">Categoría</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="categoryFilter"><SelectValue /></SelectTrigger>
                <SelectContent>{courseCategoriesOptions.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="levelFilter" className="text-xs">Nivel</Label>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger id="levelFilter"><SelectValue /></SelectTrigger>
                <SelectContent>{courseLevelsOptions.map(lvl => <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sortCriteria" className="text-xs">Ordenar Por</Label>
              <Select value={sortCriteria} onValueChange={setSortCriteria}>
                <SelectTrigger id="sortCriteria"><SelectValue /></SelectTrigger>
                <SelectContent>{sortOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/80 text-primary-foreground whitespace-nowrap shrink-0 mt-4 md:mt-0">
            <Link href="/teaching/online-courses/new">
              <PlusCircle className="mr-2 h-5 w-5" /> Crear Nuevo Curso
            </Link>
          </Button>
        </CardContent>
      </Card>

      {displayCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCourses.map(course => (
            <Card key={course.id} className="shadow-lg hover:shadow-primary/20 transition-shadow flex flex-col">
              <div className="relative">
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  width={400}
                  height={225}
                  className="w-full h-48 object-cover rounded-t-lg"
                  data-ai-hint={course.imageAiHint}
                />
                <Badge
                    variant={course.status === 'Publicado' ? 'default' : 'secondary'}
                    className={`absolute top-3 right-3 ${course.status === 'Publicado' ? 'bg-green-600 text-white' : 'bg-yellow-500 text-black'}`}
                >
                    {course.status}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="font-headline text-xl hover:text-primary">
                  <Link href={`/teaching/online-courses/${course.id}/manage`}>{course.title}</Link>
                </CardTitle>
                <CardDescription>{course.category} - {course.level}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-2 text-sm text-muted-foreground">
                <p className="line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{course.studentsEnrolled} estudiantes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <span>{course.averageRating > 0 ? `${course.averageRating}/5 estrellas` : 'Sin valoraciones'}</span>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex gap-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href={`/teaching/online-courses/${course.id}/manage`}>
                    <Settings className="mr-1 h-4 w-4" /> Gestionar
                  </Link>
                </Button>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleOpenPreviewModal(course)}
                >
                  <Eye className="mr-1 h-4 w-4" /> Vista Previa
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12 shadow-lg">
          <CardHeader>
            <BookOpen className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <CardTitle className="font-headline text-2xl">No se encontraron cursos</CardTitle>
            <CardDescription>
              {categoryFilter !== 'Todos' || levelFilter !== 'Todos' 
                ? "Prueba ajustando los filtros o " 
                : ""}
              Crea tu primer curso online.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Image src="https://placehold.co/300x200.png" data-ai-hint="profesor pensando ideas" alt="Ilustración de creación de curso" width={300} height={200} className="mx-auto mb-6 rounded-md" />
            <Button size="lg" asChild className="bg-primary hover:bg-primary/80 text-primary-foreground">
              <Link href="/teaching/online-courses/new">
                <PlusCircle className="mr-2 h-5 w-5" /> Crea tu Primer Curso Online
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {selectedCourseForPreview && (
        <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
          <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
            <DialogHeader className="mb-4">
              <DialogTitle className="font-headline text-3xl text-primary">{selectedCourseForPreview.title}</DialogTitle>
              <DialogDescription className="text-md text-muted-foreground">{selectedCourseForPreview.category} - {selectedCourseForPreview.level} - {selectedCourseForPreview.status}</DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[calc(80vh-200px)] pr-4">
                <div className="space-y-6">
                    <Image 
                        src={selectedCourseForPreview.imageUrl} 
                        alt={selectedCourseForPreview.title} 
                        width={700} 
                        height={350} 
                        className="rounded-lg shadow-md object-cover w-full aspect-[2/1]"
                        data-ai-hint={selectedCourseForPreview.imageAiHint} 
                    />
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-foreground">Descripción Completa</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                            {selectedCourseForPreview.longDescription}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-3 text-foreground">Módulos del Curso ({selectedCourseForPreview.modules.length})</h3>
                        {selectedCourseForPreview.modules.length > 0 ? (
                            <div className="space-y-3">
                                {selectedCourseForPreview.modules.map(module => {
                                    const contentTypeInfo = previewContentTypesOptions.find(opt => opt.value === module.type);
                                    const IconComponent = contentTypeInfo?.icon || FileTextIconLucide; 
                                    return (
                                        <div key={module.id} className={cn("p-3 border-l-4 rounded-r-md flex items-center gap-3", contentTypeInfo?.colorClass || "bg-slate-100 dark:bg-slate-700 border-slate-500")}>\
                                            <IconComponent className={cn("h-6 w-6 shrink-0", contentTypeInfo?.textColorClass || "text-slate-700 dark:text-slate-200")} />
                                            <span className={cn("font-medium text-sm", contentTypeInfo?.textColorClass || "text-slate-700 dark:text-slate-200")}>{module.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">Este curso aún no tiene módulos definidos.</p>
                        )}
                    </div>

                    {(selectedCourseForPreview.badgeImageUrl || selectedCourseForPreview.certificateImageUrl) && (
                      <div className="pt-4 border-t">
                        <h3 className="text-xl font-semibold mb-3 text-foreground">Certificación y Logro</h3>
                        <div className="flex flex-col gap-6">
                          {selectedCourseForPreview.badgeImageUrl && (
                            <div className="flex flex-col items-start">
                              <p className="text-sm font-medium text-muted-foreground mb-2">Insignia del Curso:</p>
                              <Image 
                                src={selectedCourseForPreview.badgeImageUrl} 
                                alt="Insignia del curso" 
                                width={100} 
                                height={100} 
                                className="rounded-md shadow-md border"
                                data-ai-hint={selectedCourseForPreview.badgeImageAiHint || 'insignia curso'}
                              />
                            </div>
                          )}
                          {selectedCourseForPreview.certificateImageUrl && (
                            <div className="flex flex-col items-start">
                               <Button 
                                variant="outline" 
                                onClick={() => selectedCourseForPreview.certificateImageUrl && handleOpenCertificateModal(selectedCourseForPreview.certificateImageUrl)}
                                className="mt-2 self-start"
                              >
                                Ver Certificado
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                </div>
            </ScrollArea>
            <DialogFooter className="mt-6 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsPreviewModalOpen(false)}>Cerrar</Button>
              <Button asChild className="bg-primary hover:bg-primary/80 text-primary-foreground">
                  <Link href={`/teaching/online-courses/${selectedCourseForPreview.id}/manage`}>
                    Gestionar Curso Completo
                  </Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {selectedCertificateUrl && (
        <Dialog open={isCertificateModalOpen} onOpenChange={setIsCertificateModalOpen}>
          <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl text-primary">Certificado del Curso</DialogTitle>
            </DialogHeader>
            <div className="py-4 max-h-[80vh] overflow-y-auto flex justify-center">
              <Image 
                src={selectedCertificateUrl} 
                alt="Certificado del curso" 
                width={800} 
                height={600} 
                className="rounded-md shadow-lg object-contain"
                data-ai-hint="certificado diploma"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCertificateModalOpen(false)}>Cerrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
}
