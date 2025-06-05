'use client'; 
'use client'; 

import * as React from 'react'; 
import NextImage from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Edit, Link as LinkIconExternal, Star as StarIcon, MoreHorizontal, Users, 
  FileText, EyeOff, Bell, MessageSquare as MessageSquareIcon, BookOpen as ThemeIcon, ThumbsUp, MessageCircle, Share2, ChevronLeft, ChevronRight, Mail, MapPin, CalendarDays as CalendarIcon, Heart, Camera, Sparkles as SparklesIcon, UploadCloud, Loader2, UserPlus, Search as SearchIconGlobal, FilterX as FilterXIcon
} from 'lucide-react'; 
import { Switch } from "@/components/ui/switch";
import { Label } from '@/components/ui/label';
import Link from 'next/link'; 
import { mockPostsInitial as allCommunityPosts, alexRomeroAuthor } from '@/app/comunidad/page.tsx'; 
import { mockAchievements, type Achievement } from '@/app/achievements/page.tsx'; 
import type { PostCardProps } from '@/components/comunidad/PostCard';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog'; 
import { formatDistanceToNowStrict } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input'; 
import { Textarea } from '@/components/ui/textarea'; 
import { useToast } from "@/hooks/use-toast"; 
import { ScrollArea } from '@/components/ui/scroll-area';
import { allMockNotifications as allNotificationsDataForModal } from '@/app/profile/notifications/page'; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


// Definición de un tipo para los Temas del Usuario
interface UserTheme {
  id: string;
  name: string;
  iconUrl?: string; // Para imagen personalizada del tema
  iconAiHint?: string;
  lucideIcon?: React.ElementType; // Para usar un icono de Lucide
}

export const mockUserProfile = {
  name: 'Alex Romero', 
  email: 'alex.romero@example.com',
  shortBio: `Entusiasta del aprendizaje continuo y la tecnología. Interesado en el desarrollo web, la inteligencia artificial y el diseño de experiencias de usuario.`,
  profilePictureUrl: 'https://placehold.co/150x150.png',
  profilePictureAiHint: 'persona sonriendo',
  coverPhotoUrl: 'https://placehold.co/1000x300.png',
  coverPhotoAiHint: 'espacio trabajo moderno',
  links: [
    { label: 'LinkedIn', url: '#' },
    { label: 'GitHub', url: '#' },
    { label: 'Portafolio Personal', url: '#' },
  ],
  joinedDate: 'Miembro desde Agosto 2023', 
  followers: 1275,
  subscribers: 250,
  location: 'Ciudad Innovadora, Metaverso', 
  birthDate: '15 de Mayo', 
  isEducator: true, 
  canOfferSubscriptions: true, 
  subscriptionPrice: 4.99, 
  educatorDetails: { 
    specialization: 'Desarrollo Full-Stack, Cloud Computing',
    officeHours: 'Martes y Jueves, 3:00 PM - 5:00 PM (Online)',
  },
  userThemes: [
    { id: 'todos', name: 'Todos', lucideIcon: ThemeIcon },
    { id: 'biologia', name: 'Biología Celular', iconUrl: 'https://placehold.co/80x80.png', iconAiHint: 'celula microscopio' },
    { id: 'programacion', name: 'Programación Web', iconUrl: 'https://placehold.co/80x80.png', iconAiHint: 'codigo pantalla' },
    { id: 'ia', name: 'Inteligencia IA', lucideIcon: FileText, iconAiHint: 'cerebro digital' }, 
    { id: 'ciencia', name: 'Ciencia General', iconUrl: 'https://placehold.co/80x80.png', iconAiHint: 'atomos ciencia' },
    { id: 'marketing', name: 'Marketing Digital', iconUrl: 'https://placehold.co/80x80.png', iconAiHint: 'grafico marketing' },
    { id: 'diseno', name: 'Diseño UI/UX', iconUrl: 'https://placehold.co/80x80.png', iconAiHint: 'interfaz usuario' },
    { id: 'fotografia', name: 'Fotografía Pro', iconUrl: 'https://placehold.co/80x80.png', iconAiHint: 'camara fotos' },
    { id: 'musica', name: 'Teoría Musical', lucideIcon: ThemeIcon, iconAiHint: 'notas musicales' },
  ] as UserTheme[],
};

const loggedInUser = { 
  name: 'Alex Romero',
  isEducator: true,
};

const mockNotificationsSnippet = [ 
    { id: 'notif1', type: 'follow', text: 'Ana Pérez comenzó a seguirte.', icon: UserPlus, time: 'hace 5 min', read: false }, 
    { id: 'notif2', type: 'like', text: 'A Juan García le gustó tu post "Explorando Genkit".', icon: Heart, time: 'hace 1 hora', read: false },
    { id: 'notif3', type: 'comment', text: 'Laura Gómez comentó en tu debate: "Necesitamos más IA en educación".', icon: MessageSquareIcon, time: 'hace 3 horas', read: true },
];

// Type for notifications used within the modal
interface NotificationModalItem {
  id: string;
  type: string;
  text: string;
  icon: React.ElementType;
  time: string;
  read: boolean;
}

const ClientRelativeTime: React.FC<{ date: Date; className?: string }> = ({ date, className }) => {
  const [relativeTime, setRelativeTime] = React.useState<string | null>(null);

  React.useEffect(() => {
    setRelativeTime(
      formatDistanceToNowStrict(date, { addSuffix: true, locale: es })
    );
  }, [date]);

  if (!relativeTime) {
    return <span className={cn("text-xs text-muted-foreground", className)}>calculando...</span>;
  }
  return <span className={cn("text-xs text-muted-foreground hover:underline", className)}>{relativeTime}</span>;
};

const monthDisplayOptions: { value: string, label: string }[] = [
  { value: "all", label: "Todos los Meses" },
  { value: "0", label: "Enero" }, { value: "1", label: "Febrero" }, { value: "2", label: "Marzo" },
  { value: "3", label: "Abril" }, { value: "4", label: "Mayo" }, { value: "5", label: "Junio" },
  { value: "6", label: "Julio" }, { value: "7", label: "Agosto" }, { value: "8", label: "Septiembre" },
  { value: "9", label: "Octubre" }, { value: "10", label: "Noviembre" }, { value: "11", label: "Diciembre" },
];

export default function UnifiedProfilePage() {
  const profile = mockUserProfile; 
  const [showAllPosts, setShowAllPosts] = React.useState(false);
  const [userPosts, setUserPosts] = React.useState<PostCardProps[]>([]);
  const [userAchievements, setUserAchievements] = React.useState<Achievement[]>([]);
  const [isMyProfile, setIsMyProfile] = React.useState(false);
  const [selectedThemeId, setSelectedThemeId] = React.useState<string>('todos');

  const [isPostModalOpen, setIsPostModalOpen] = React.useState(false);
  const [selectedPostForModal, setSelectedPostForModal] = React.useState<PostCardProps | null>(null);

  const collectionsProfileScrollRef = React.useRef<HTMLDivElement>(null);
  const [showPrevArrowProfile, setShowPrevArrowProfile] = React.useState(false);
  const [showNextArrowProfile, setShowNextArrowProfile] = React.useState(false);
  const SCROLL_AMOUNT_PROFILE = 220; 

  const [isImageEditModalOpen, setIsImageEditModalOpen] = React.useState(false);
  const [editingImageType, setEditingImageType] = React.useState<'cover' | 'profile' | null>(null);
  const [currentImagePreview, setCurrentImagePreview] = React.useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = React.useState('');
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null); 
  const [generatedImagePreview, setGeneratedImagePreview] = React.useState<string | null>(null);
  const [isGeneratingAiImage, setIsGeneratingAiImage] = React.useState(false);
  const { toast } = useToast();

  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = React.useState(false);
  const [modalNotifications, setModalNotifications] = React.useState<NotificationModalItem[]>([]);
  const [selectedNotificationFilter, setSelectedNotificationFilter] = React.useState<string>("all");

  // States for Discussions Modal
  const [isDiscussionsModalOpen, setIsDiscussionsModalOpen] = React.useState(false);
  const [allUserTextDiscussions, setAllUserTextDiscussions] = React.useState<PostCardProps[]>([]);
  const [discussionsModalSearchTerm, setDiscussionsModalSearchTerm] = React.useState('');
  const [discussionsModalSelectedMonth, setDiscussionsModalSelectedMonth] = React.useState<string>("all");
  const [discussionsModalSelectedYear, setDiscussionsModalSelectedYear] = React.useState<string>("all");
  const [discussionsModalSelectedTag, setDiscussionsModalSelectedTag] = React.useState<string>("all");
  const [discussionsModalAvailableTags, setDiscussionsModalAvailableTags] = React.useState<string[]>([]);
  const [discussionsModalAvailableYears, setDiscussionsModalAvailableYears] = React.useState<string[]>([]);

  const notificationFilterOptions = [
    { value: "all", label: "Todas" },
    { value: "like", label: "Me Gusta" },
    { value: "comment", label: "Comentarios" },
    { value: "follow", label: "Seguidores" },
    { value: "system", label: "Logros" }, 
  ];

  // Effect for initializing discussions data for modal
  React.useEffect(() => {
    const discussions = allCommunityPosts.filter(
      post => post.author.name === alexRomeroAuthor.name && !post.imageUrl && post.status === 'Publicado'
    ).sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setAllUserTextDiscussions(discussions);

    const tags = new Set<string>();
    const years = new Set<string>();
    discussions.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
      years.add(new Date(post.timestamp).getFullYear().toString());
    });
    setDiscussionsModalAvailableTags(["all", ...Array.from(tags).sort()]);
    setDiscussionsModalAvailableYears(["all", ...Array.from(years).sort((a, b) => parseInt(b) - parseInt(a))]);
  }, []);

  const handleClearDiscussionsModalFilters = () => {
    setDiscussionsModalSearchTerm('');
    setDiscussionsModalSelectedMonth('all');
    setDiscussionsModalSelectedYear('all');
    setDiscussionsModalSelectedTag('all');
  };

  const filteredDiscussionsForModal = allUserTextDiscussions.filter(post => {
    const term = discussionsModalSearchTerm.toLowerCase();
    const contentMatch = post.content.toLowerCase().includes(term);
    const tagTextMatch = post.tags && post.tags.some(tag => tag.toLowerCase().includes(term));

    if (discussionsModalSearchTerm && !(contentMatch || tagTextMatch)) {
      return false;
    }

    const postDate = new Date(post.timestamp);
    if (discussionsModalSelectedYear !== "all" && postDate.getFullYear().toString() !== discussionsModalSelectedYear) {
      return false;
    }
    if (discussionsModalSelectedMonth !== "all" && postDate.getMonth().toString() !== discussionsModalSelectedMonth) {
      return false;
    }

    if (discussionsModalSelectedTag !== "all" && (!post.tags || !post.tags.includes(discussionsModalSelectedTag))) {
      return false;
    }
    return true;
  });

  const areDiscussionsModalFiltersActive = discussionsModalSearchTerm || discussionsModalSelectedMonth !== 'all' || discussionsModalSelectedYear !== 'all' || discussionsModalSelectedTag !== 'all';


  const handleOpenNotificationsModal = () => {
    const freshNotifications: NotificationModalItem[] = allNotificationsDataForModal.map(n => ({...n}));
    setModalNotifications(freshNotifications);
    setSelectedNotificationFilter("all");
    setIsNotificationsModalOpen(true);
  };

  const markNotificationAsReadInModal = (id: string) => {
    setModalNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  const markAllNotificationsAsReadInModal = () => {
    setModalNotifications(prev => {
      return prev.map(n => {
        if (selectedNotificationFilter !== "all" && n.type !== selectedNotificationFilter) {
          return n; 
        }
        return { ...n, read: true };
      });
    });
  };

  const filteredModalNotifications = modalNotifications.filter(notif => {
    if (selectedNotificationFilter === "all") return true;
    return notif.type === selectedNotificationFilter;
  });


  const checkScrollabilityProfile = React.useCallback(() => {
    const container = collectionsProfileScrollRef.current;
    if (container) {
      const canScrollLeft = container.scrollLeft > 0;
      const canScrollRight = container.scrollLeft < (container.scrollWidth - container.clientWidth - 1) && container.scrollWidth > container.clientWidth;
      setShowPrevArrowProfile(canScrollLeft);
      setShowNextArrowProfile(canScrollRight);
    }
  }, []);

  React.useEffect(() => {
    const container = collectionsProfileScrollRef.current;
    if (container) {
      checkScrollabilityProfile();
      container.addEventListener('scroll', checkScrollabilityProfile);
      window.addEventListener('resize', checkScrollabilityProfile);
      const timeoutId = setTimeout(checkScrollabilityProfile, 100); 
      return () => {
        if (container) { 
          container.removeEventListener('scroll', checkScrollabilityProfile);
        }
        window.removeEventListener('resize', checkScrollabilityProfile);
        clearTimeout(timeoutId);
      };
    }
  }, [profile.userThemes, checkScrollabilityProfile, selectedThemeId]); 

  const handleScrollProfile = (direction: 'left' | 'right') => {
    const container = collectionsProfileScrollRef.current;
    if (container) {
      const currentScrollLeft = container.scrollLeft;
      const newScrollLeft = direction === 'left' 
        ? currentScrollLeft - SCROLL_AMOUNT_PROFILE
        : currentScrollLeft + SCROLL_AMOUNT_PROFILE;
      container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    setIsMyProfile(profile.name === loggedInUser.name);
  }, [profile.name]);

  React.useEffect(() => {
    const postsWithThemes = allCommunityPosts.map(post => {
      if (!post.themeId) { 
          if (post.tags?.includes('Ciencia') || post.tags?.includes('Hidrología')) return { ...post, themeId: 'ciencia' };
          if (post.tags?.includes('Desarrollo') || post.tags?.includes('Genkit') || post.tags?.includes('React') || post.tags?.includes('TailwindCSS') || post.tags?.includes('ShadCN') || post.tags?.includes('Programación') || post.tags?.includes('Ejemplo')) return { ...post, themeId: 'programacion' };
          if (post.tags?.includes('IA')) return { ...post, themeId: 'ia' };
          if (post.tags?.includes('Biología')) return { ...post, themeId: 'biologia' };
      }
      return post;
    });

    const filteredByAuthor = postsWithThemes.filter(post => {
      const isAuthor = post.author.name === profile.name;
      if (!isAuthor) return false;
      if (isMyProfile && showAllPosts) return true; 
      return post.status === 'Publicado'; 
    });
    
    const filteredByTheme = selectedThemeId === 'todos' 
      ? filteredByAuthor 
      : filteredByAuthor.filter(post => post.themeId === selectedThemeId);
      
    setUserPosts(filteredByTheme.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));

    if (profile.name === loggedInUser.name) { 
      setUserAchievements(mockAchievements); 
    } else {
      setUserAchievements([]); 
    }
  }, [profile.name, showAllPosts, isMyProfile, selectedThemeId]);

  const displayedStickerAchievements = isMyProfile ? userAchievements.slice(0, 3) : [];
  const textOnlyPostsForSidebar = userPosts.filter(post => !post.imageUrl && post.status === 'Publicado').slice(0, 3);

  const handlePostClick = (post: PostCardProps) => {
    setSelectedPostForModal(post);
    setIsPostModalOpen(true);
  };

  const openImageEditModal = (type: 'cover' | 'profile') => {
    setEditingImageType(type);
    setCurrentImagePreview(type === 'cover' ? profile.coverPhotoUrl : profile.profilePictureUrl);
    setAiPrompt('');
    setUploadedFile(null);
    setGeneratedImagePreview(null);
    setIsImageEditModalOpen(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        setUploadedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setCurrentImagePreview(reader.result as string); 
            setGeneratedImagePreview(null); 
        };
        reader.readAsDataURL(file);
    }
  };

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleGenerateAiImage = async () => {
    if (!aiPrompt.trim()) {
      toast({ title: "Prompt Vacío", description: "Por favor, describe la imagen que quieres generar.", variant: "destructive" });
      return;
    }
    setIsGeneratingAiImage(true);
    setGeneratedImagePreview(null); 
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    const placeholderGeneratedImage = `https://placehold.co/600x400.png?text=AI:${aiPrompt.substring(0,10)}`;
    setGeneratedImagePreview(placeholderGeneratedImage);
    setCurrentImagePreview(placeholderGeneratedImage); 
    setUploadedFile(null); 
    setIsGeneratingAiImage(false);
    toast({ title: "Imagen Generada (Simulación)", description: "La IA ha generado una imagen basada en tu prompt." });
  };
  
  const handleSaveImageChanges = () => {
    console.log("Guardando imagen para:", editingImageType);
    console.log("Imagen a usar (previsualización actual):", currentImagePreview);
    if (uploadedFile) console.log("Archivo subido:", uploadedFile.name);
    if (generatedImagePreview) console.log("Prompt para IA usado:", aiPrompt);

    if (isMyProfile && editingImageType && currentImagePreview) {
        if (editingImageType === 'cover') {
            mockUserProfile.coverPhotoUrl = currentImagePreview;
        } else if (editingImageType === 'profile') {
            mockUserProfile.profilePictureUrl = currentImagePreview;
        }
    }

    toast({
      title: "Imagen Guardada (Simulación)",
      description: `Tu nueva imagen de ${editingImageType === 'cover' ? 'portada' : 'perfil'} ha sido guardada.`,
    });
    setIsImageEditModalOpen(false);
  };


  return (
    <div className="space-y-8">
      <Card className="overflow-visible shadow-xl rounded-lg">
        <div className="relative h-48 md:h-64 w-full group">
          <NextImage
            src={profile.coverPhotoUrl}
            alt="Foto de portada del perfil"
            layout="fill"
            objectFit="cover"
            className="bg-muted rounded-t-lg"
            data-ai-hint={profile.coverPhotoAiHint}
            key={profile.coverPhotoUrl} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg" />
          {isMyProfile && (
            <Button 
              variant="secondary" 
              size="sm" 
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              onClick={() => openImageEditModal('cover')}
            >
              <Camera className="mr-2 h-4 w-4" /> Editar Portada
            </Button>
          )}
        </div>
        
        <CardContent className="relative p-6 pt-6"> 
          <div className="flex flex-col md:flex-row items-center md:items-end md:space-x-6">
            <div className="relative group">
                <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background bg-background shadow-lg -mt-20 md:-mt-24 relative z-10">
                <AvatarImage src={profile.profilePictureUrl} alt={profile.name} data-ai-hint={profile.profilePictureAiHint} key={profile.profilePictureUrl} />
                <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                {isMyProfile && (
                    <Button 
                        variant="secondary" 
                        size="icon" 
                        className="absolute bottom-0 right-0 md:bottom-2 md:right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                        onClick={() => openImageEditModal('profile')}
                    >
                        <Camera className="h-4 w-4" />
                        <span className="sr-only">Editar Imagen de Perfil</span>
                    </Button>
                )}
            </div>

            <div className="flex-grow mt-4 md:mt-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">{profile.name}</h1>
                {isMyProfile && displayedStickerAchievements.map(ach => (
                  <Link href={`/achievements#${ach.id}`} key={ach.id} title={ach.courseName}>
                    <NextImage 
                      src={ach.iconUrl} 
                      alt={ach.courseName} 
                      width={28} 
                      height={28} 
                      className="rounded-md border border-muted hover:scale-110 transition-transform"
                      data-ai-hint={ach.dataAiHint}
                    />
                  </Link>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
                <div className="flex items-center gap-2 p-2 px-3 rounded-lg border bg-card hover:border-primary transition-all duration-200 shadow-sm cursor-default">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-lg font-bold text-primary">{profile.followers.toLocaleString('es')}</p>
                    <p className="text-xs text-muted-foreground -mt-1">Seguidores</p>
                  </div>
                </div>
                {profile.subscribers !== undefined && (
                  <div className="flex items-center gap-2 p-2 px-3 rounded-lg border bg-card hover:border-accent transition-all duration-200 shadow-sm cursor-default">
                    <StarIcon className="h-5 w-5 text-accent fill-currentColor" /> 
                    <div>
                      <p className="text-lg font-bold text-accent">{profile.subscribers.toLocaleString('es')}</p>
                      <p className="text-xs text-muted-foreground -mt-1">Suscriptores</p>
                    </div>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-foreground mt-3 line-clamp-2 md:line-clamp-3">{profile.shortBio}</p>
              <Button variant="link" size="sm" className="p-0 h-auto text-primary hover:underline mt-1" asChild>
                <Link href="/profile/details">Ver más detalles</Link>
              </Button>
            </div>
            <div className="flex flex-col md:flex-row md:items-end gap-2 mt-6 md:mt-0 shrink-0">
              {isMyProfile ? (
                <Button variant="outline" size="sm"> 
                  <Edit className="mr-2 h-4 w-4" /> Editar Perfil
                </Button>
              ) : profile.canOfferSubscriptions ? (
                <Button size="sm" className="bg-accent hover:bg-accent/80 text-accent-foreground">
                  <StarIcon className="mr-2 h-4 w-4" /> Suscribirse (${profile.subscriptionPrice}/mes)
                </Button>
              ) : (
                 <Button size="sm" variant="outline">Seguir</Button> 
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {isMyProfile && editingImageType && (
        <Dialog open={isImageEditModalOpen} onOpenChange={setIsImageEditModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-headline text-xl text-primary">
                Editar Imagen de {editingImageType === 'cover' ? 'Portada' : 'Perfil'}
              </DialogTitle>
              <DialogDescription>
                Actualiza tu imagen subiendo un archivo o generando uno nuevo con IA.
              </DialogDescription>
            </DialogHeader>
            
            <div className="my-4">
                <NextImage
                    src={currentImagePreview || (editingImageType === 'cover' ? 'https://placehold.co/600x200.png?text=Portada' : 'https://placehold.co/150x150.png?text=Perfil')}
                    alt={`Previsualización ${editingImageType === 'cover' ? 'portada' : 'perfil'}`}
                    width={editingImageType === 'cover' ? 400 : 150}
                    height={editingImageType === 'cover' ? (400 * (200/600)) : 150} 
                    className={cn(
                        "rounded-md shadow-md mx-auto border", 
                        editingImageType === 'cover' ? "w-full object-cover h-auto max-h-48" : "h-36 w-36 object-cover"
                    )}
                    data-ai-hint={editingImageType === 'cover' ? profile.coverPhotoAiHint : profile.profilePictureAiHint}
                    key={currentImagePreview} 
                />
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="aiPrompt" className="font-medium">Generar con IA</Label>
                <Textarea 
                  id="aiPrompt" 
                  value={aiPrompt} 
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Describe la imagen que deseas (ej: un logo abstracto azul y naranja)" 
                  rows={2}
                  className="mt-1"
                />
                <Button onClick={handleGenerateAiImage} disabled={isGeneratingAiImage} className="w-full mt-2 text-sm">
                  {isGeneratingAiImage ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Generando...</>
                  ) : (
                    <><SparklesIcon className="mr-2 h-4 w-4"/> Generar Imagen</>
                  )}
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    O
                  </span>
                </div>
              </div>
              
              <div>
                 <Input 
                    id="imageUpload" 
                    type="file" 
                    ref={fileInputRef}
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                <Button onClick={handleTriggerFileInput} variant="outline" className="w-full text-sm">
                  <UploadCloud className="mr-2 h-4 w-4"/> Subir Archivo
                </Button>
                 <p className="text-xs text-muted-foreground mt-1 text-center">Max 5MB. JPG, PNG, WebP.</p>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setIsImageEditModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleSaveImageChanges} className="bg-primary hover:bg-primary/80 text-primary-foreground">
                Guardar Cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}


      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          
          {isMyProfile && profile.userThemes && profile.userThemes.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">Colecciones</h2>
               <div className="relative">
                {showPrevArrowProfile && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/70 hover:bg-background -ml-3"
                    onClick={() => handleScrollProfile('left')}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                )}
                <div ref={collectionsProfileScrollRef} className="flex overflow-x-hidden space-x-4 py-1 items-start scroll-smooth -mx-1 px-1">
                  {profile.userThemes.map(theme => {
                    const LucideIcon = theme.lucideIcon;
                    const isSelected = theme.id === selectedThemeId;
                    return (
                      <div 
                        key={theme.id} 
                        onClick={() => setSelectedThemeId(theme.id)}
                        className="flex flex-col items-center w-20 text-center cursor-pointer group shrink-0"
                        title={theme.name}
                      >
                        <div className={cn(
                          "w-16 h-16 rounded-full border-2 flex items-center justify-center overflow-hidden bg-card mb-1 transition-all duration-200 group-hover:border-primary",
                          isSelected ? 'border-primary ring-2 ring-primary shadow-lg' : 'border-muted'
                        )}>
                          {theme.iconUrl ? (
                            <NextImage src={theme.iconUrl} alt={theme.name} width={60} height={60} className="object-cover group-hover:scale-110 transition-transform" data-ai-hint={theme.iconAiHint || theme.name.toLowerCase().split(' ').slice(0,2).join(' ')} />
                          ) : LucideIcon ? (
                            <LucideIcon className={cn("w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors", isSelected && "text-primary")}/>
                          ) : (
                            <ThemeIcon className={cn("w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors", isSelected && "text-primary")}/>
                          )}
                        </div>
                        <span className={cn(
                          "text-xs font-medium truncate w-full leading-tight group-hover:text-primary",
                          isSelected ? 'text-primary' : 'text-muted-foreground'
                        )}>{theme.name}</span>
                      </div>
                    );
                  })}
                </div>
                {showNextArrowProfile && (
                   <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/70 hover:bg-background -mr-3"
                      onClick={() => handleScrollProfile('right')}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                )}
              </div>
            </div>
          )}

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                 <div className="flex-grow">
                    <CardTitle className="font-headline text-2xl text-primary">
                    {selectedThemeId !== 'todos' ? `Publicaciones sobre: ${profile.userThemes.find(t => t.id === selectedThemeId)?.name}` : (isMyProfile ? 'Mis Publicaciones' : `Publicaciones de ${profile.name}`)}
                    </CardTitle>
                    <CardDescription>
                        {isMyProfile ? (showAllPosts ? "Todas tus publicaciones, incluyendo borradores y programadas." : "Tus publicaciones visibles para otros usuarios.") : `Publicaciones de ${profile.name}`}
                        {selectedThemeId !== 'todos' && ` (Filtrado por tema)`}
                    </CardDescription>
                 </div>
                 <div className="flex items-center gap-3 ml-4 shrink-0">
                    {isMyProfile && (
                         <Button asChild variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/80">
                            <Link href="/my-community-content">Gestionar</Link>
                        </Button>
                    )}
                    {isMyProfile && (
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="show-all-posts" className="text-xs text-muted-foreground">
                            {showAllPosts ? "Todos" : "Publicados"}
                            </Label>
                            <Switch
                            id="show-all-posts"
                            checked={!showAllPosts} 
                            onCheckedChange={(checked) => setShowAllPosts(!checked)} 
                            aria-label="Mostrar todos los posts incluyendo borradores y programados"
                            />
                            <EyeOff className={`h-3 w-3 ${showAllPosts ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                    )}
                 </div>
              </div>
            </CardHeader>
            <CardContent>
              {userPosts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                  {userPosts.map(post => (
                    <button 
                      key={post.id} 
                      onClick={() => handlePostClick(post)}
                      className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                      aria-label={`Ver detalle del post: ${post.title || 'Post sin título'}`}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-md group bg-muted hover:opacity-90 transition-opacity duration-200 cursor-pointer shadow-sm">
                        {post.imageUrl ? (
                          <NextImage 
                            src={post.imageUrl} 
                            alt={post.title || 'Post image'} 
                            layout="fill" 
                            objectFit="cover" 
                            className="group-hover:scale-105 transition-transform duration-300"
                            data-ai-hint={post.imageAiHint || 'post image'}
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full bg-muted/50 p-2 text-center">
                            <FileText className="h-8 w-8 text-muted-foreground mb-1" />
                            <p className="text-xs text-muted-foreground line-clamp-2">{post.content.substring(0,50)}...</p>
                          </div>
                        )}
                         {(isMyProfile && showAllPosts && (post.status === 'Borrador' || post.status === 'Programado')) && (
                            <Badge 
                                variant={post.status === 'Borrador' ? "secondary" : "outline"} 
                                className={`absolute top-1.5 right-1.5 text-[10px] px-1.5 py-0.5 ${post.status === 'Programado' ? 'border-blue-500 text-blue-500 bg-background/70' : 'bg-background/70'}`}
                            >
                                {post.status}
                            </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-6">
                  {selectedThemeId !== 'todos' ? `No hay posts para la colección "${profile.userThemes.find(t=>t.id === selectedThemeId)?.name}".` :
                   (isMyProfile ? (showAllPosts ? "No tienes ningún post (ni siquiera borradores)." : "Aún no has publicado nada.") : `${profile.name} aún no ha publicado nada.`)}
                  {isMyProfile && <Button asChild variant="link"><Link href="/my-community-content/new">Crear un post</Link></Button>}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          {isMyProfile && (
            <>
              <Card className="shadow-md rounded-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-lg text-primary">Notificaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  {mockNotificationsSnippet.length > 0 ? (
                    <ul className="space-y-3">
                      {mockNotificationsSnippet.map(notif => {
                        const Icon = notif.icon;
                        return (
                          <li key={notif.id} className="flex items-start gap-2 text-xs">
                            <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${ notif.read ? 'text-muted-foreground' :
                              notif.type === 'follow' ? 'text-blue-500' :
                              notif.type === 'like' ? 'text-pink-500' :
                              notif.type === 'comment' ? 'text-green-500' : 'text-primary'
                            }`} />
                            <div className="flex-grow">
                                <p className={`${notif.read ? 'text-muted-foreground' : 'text-foreground font-medium'} leading-tight`}>{notif.text}</p>
                                <p className="text-muted-foreground text-[10px]">{notif.time}</p>
                            </div>
                             {!notif.read && (
                              <div className="h-2 w-2 bg-primary rounded-full shrink-0 mt-1 self-start" title="No leído"></div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-xs text-muted-foreground">No hay notificaciones nuevas.</p>
                  )}
                </CardContent>
                <CardFooter>
                    <Button variant="link" size="sm" className="p-0 h-auto text-xs w-full justify-end" onClick={handleOpenNotificationsModal}>
                        Ver todas
                    </Button>
                </CardFooter>
              </Card>

              <Card className="shadow-md rounded-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-lg text-primary">Debates Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  {textOnlyPostsForSidebar.length > 0 ? (
                    <ul className="space-y-3">
                      {textOnlyPostsForSidebar.map(post => (
                        <li key={post.id} className="text-xs">
                           <button onClick={() => handlePostClick(post)} className="text-left hover:underline text-foreground font-medium line-clamp-2 focus:outline-none focus:ring-1 focus:ring-primary rounded">
                             "{post.content.substring(0, 80)}{post.content.length > 80 ? '...' : ''}"
                           </button>
                           <p className="text-muted-foreground text-[10px]">Publicado {new Date(post.timestamp).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-muted-foreground">No hay debates recientes de solo texto.</p>
                  )}
                </CardContent>
                <CardFooter>
                    <Button variant="link" size="sm" className="p-0 h-auto text-xs w-full justify-end" onClick={() => setIsDiscussionsModalOpen(true)}>
                        Ver todos los debates
                    </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      </div>

      {isMyProfile && (
        <Dialog open={isNotificationsModalOpen} onOpenChange={setIsNotificationsModalOpen}>
          <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="sr-only font-headline text-2xl text-primary">Todas Mis Notificaciones</DialogTitle>
            </DialogHeader>
            <div className="py-2 max-h-[60vh] space-y-4">
              <div className="px-1 pt-2">
                <Select value={selectedNotificationFilter} onValueChange={setSelectedNotificationFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {notificationFilterOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <ScrollArea className="h-[calc(60vh-100px)] pr-3">
                {filteredModalNotifications.length > 0 ? (
                  <ul className="space-y-4">
                    {filteredModalNotifications.map(notif => {
                      const Icon = notif.icon;
                      return (
                        <li 
                          key={notif.id} 
                          className={`p-3 rounded-md flex items-start gap-3 transition-colors ${notif.read ? 'bg-card hover:bg-muted/20' : 'bg-primary/10 hover:bg-primary/20 cursor-pointer'}`}
                          onClick={() => !notif.read && markNotificationAsReadInModal(notif.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && !notif.read && markNotificationAsReadInModal(notif.id)}
                        >
                          <Icon className={`h-5 w-5 mt-1 shrink-0 ${
                            notif.read ? 'text-muted-foreground' :
                            notif.type === 'follow' ? 'text-blue-500' :
                            notif.type === 'like' ? 'text-pink-500' :
                            notif.type === 'comment' ? 'text-green-500' : 
                            notif.type === 'system' ? 'text-yellow-500' : 'text-primary'
                          }`} />
                          <div className="flex-grow">
                            <p className={`text-sm leading-snug ${notif.read ? 'text-muted-foreground' : 'text-foreground font-medium'}`}>{notif.text}</p>
                            <p className={`text-xs ${notif.read ? 'text-muted-foreground/70' : 'text-foreground/80'}`}>{notif.time}</p>
                          </div>
                          {!notif.read && (
                            <div className="h-2.5 w-2.5 bg-primary rounded-full shrink-0 mt-1.5" title="No leído"></div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-center py-6">
                    {selectedNotificationFilter === "all" ? "No hay notificaciones." : `No hay notificaciones del tipo "${notificationFilterOptions.find(opt => opt.value === selectedNotificationFilter)?.label}".`}
                  </p>
                )}
              </ScrollArea>
            </div>
            <DialogFooter className="gap-2 sm:gap-0 pt-4 border-t">
                <Button variant="outline" size="sm" onClick={markAllNotificationsAsReadInModal} disabled={filteredModalNotifications.every(n => n.read) || filteredModalNotifications.length === 0}>
                    Marcar como leídas ({selectedNotificationFilter === 'all' ? 'Todas' : notificationFilterOptions.find(opt => opt.value === selectedNotificationFilter)?.label})
                </Button>
                <Button variant="default" size="sm" onClick={() => setIsNotificationsModalOpen(false)}>Cerrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {selectedPostForModal && (
        <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
          <DialogContent className="sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl !p-0 border-0">
            <DialogTitle className="sr-only">
                Detalles del Post: {selectedPostForModal.title || 'Publicación de la comunidad'}
            </DialogTitle>
            <Card className="shadow-none border-0 rounded-lg overflow-hidden">
              {selectedPostForModal.imageUrl && (
                <div className="relative aspect-[16/10] w-full">
                  <NextImage 
                    src={selectedPostForModal.imageUrl} 
                    alt={selectedPostForModal.title || 'Imagen del post'} 
                    layout="fill" 
                    objectFit="cover"
                    data-ai-hint={selectedPostForModal.imageAiHint || 'post image'}
                  />
                </div>
              )}
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedPostForModal.author.avatarUrl} alt={selectedPostForModal.author.name} data-ai-hint={selectedPostForModal.author.profileAiHint}/>
                    <AvatarFallback>{selectedPostForModal.author.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="text-sm font-semibold">{selectedPostForModal.author.name}</p>
                    <ClientRelativeTime date={selectedPostForModal.timestamp} className="text-xs text-muted-foreground" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 space-y-3 max-h-[50vh] overflow-y-auto">
                <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                  {selectedPostForModal.content}
                </p>
                {selectedPostForModal.tags && selectedPostForModal.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {selectedPostForModal.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-4 sm:p-6 pt-3 border-t bg-muted/30 flex justify-between items-center">
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center"><ThumbsUp className="h-4 w-4 mr-1"/> {selectedPostForModal.stats.likes}</span>
                  <span className="flex items-center"><MessageCircle className="h-4 w-4 mr-1"/> {selectedPostForModal.stats.comments}</span>
                  <span className="flex items-center"><Share2 className="h-4 w-4 mr-1"/> {selectedPostForModal.stats.shares}</span>
                </div>
                <Button variant="outline" onClick={() => setIsPostModalOpen(false)}>Cerrar</Button>
              </CardFooter>
            </Card>
          </DialogContent>
        </Dialog>
      )}
      
      {isMyProfile && (
        <Dialog open={isDiscussionsModalOpen} onOpenChange={setIsDiscussionsModalOpen}>
          <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
            <DialogHeader className="mb-2">
              <DialogTitle className="font-headline text-2xl text-primary sr-only">Mis Debates de Texto</DialogTitle>
              {areDiscussionsModalFiltersActive && <DialogDescription className="text-sm text-muted-foreground">Mostrando resultados filtrados.</DialogDescription>}
            </DialogHeader>
            
            <div className="space-y-4 max-h-[70vh]">
              <div className="relative">
                <SearchIconGlobal className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar en mis debates..."
                  value={discussionsModalSearchTerm}
                  onChange={(e) => setDiscussionsModalSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            
              <div className="flex flex-col sm:flex-row gap-3">
                <Select value={discussionsModalSelectedYear} onValueChange={setDiscussionsModalSelectedYear}>
                  <SelectTrigger className="w-full sm:flex-1">
                    <SelectValue placeholder="Año" />
                  </SelectTrigger>
                  <SelectContent>
                    {discussionsModalAvailableYears.map(year => (
                      <SelectItem key={year} value={year}>{year === "all" ? "Todos los Años" : year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={discussionsModalSelectedMonth} onValueChange={setDiscussionsModalSelectedMonth}>
                  <SelectTrigger className="w-full sm:flex-1">
                    <SelectValue placeholder="Mes" />
                  </SelectTrigger>
                  <SelectContent>
                    {monthDisplayOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={discussionsModalSelectedTag} onValueChange={setDiscussionsModalSelectedTag} disabled={discussionsModalAvailableTags.length <= 1}>
                  <SelectTrigger className="w-full sm:flex-1">
                    <SelectValue placeholder="Temática" />
                  </SelectTrigger>
                  <SelectContent>
                    {discussionsModalAvailableTags.map(tag => (
                      <SelectItem key={tag} value={tag}>{tag === "all" ? "Todas las Temáticas" : tag}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {areDiscussionsModalFiltersActive && (
                  <Button variant="ghost" onClick={handleClearDiscussionsModalFilters} className="w-full sm:w-auto text-destructive hover:text-destructive shrink-0">
                    <FilterXIcon className="mr-2 h-4 w-4" /> Limpiar
                  </Button>
                )}
              </div>

              <ScrollArea className="h-[calc(70vh-200px)] pr-3"> {/* Adjust height as needed */}
                {filteredDiscussionsForModal.length > 0 ? (
                  <div className="space-y-4">
                  {filteredDiscussionsForModal.map(post => (
                    <Card key={post.id} className="bg-card hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint={post.author.profileAiHint} />
                            <AvatarFallback>{post.author.avatarFallback}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold">{post.author.name}</p>
                            <ClientRelativeTime date={post.timestamp} className="text-xs text-muted-foreground"/>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{post.content}</p>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {post.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="text-xs text-muted-foreground justify-between pt-3 border-t">
                        <div className="flex gap-3">
                          <span className="flex items-center"><ThumbsUp className="h-3.5 w-3.5 mr-1"/> {post.stats.likes}</span>
                          <span className="flex items-center"><MessageCircle className="h-3.5 w-3.5 mr-1"/> {post.stats.comments}</span>
                        </div>
                        <Button variant="link" size="sm" className="p-0 h-auto text-primary hover:underline" onClick={() => { handlePostClick(post); setIsDiscussionsModalOpen(false); }}>
                          Ver Detalles
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-md font-semibold text-muted-foreground">
                      {areDiscussionsModalFiltersActive ? 'No se encontraron debates con tus filtros.' : 'Aún no tienes debates de texto.'}
                    </p>
                  </div>
                )}
              </ScrollArea>
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsDiscussionsModalOpen(false)}>Cerrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
}
