'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit3, Trash2, Image as ImageIcon, Users, DollarSign, Save, Loader2, Filter as FilterIcon } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import NextImage from 'next/image'; // Renamed to avoid conflict with Lucide Image
import Link from 'next/link';
import * as React from 'react';
import { useToast } from "@/hooks/use-toast";
import { mockUserProfile, type UserTheme } from '@/app/profile/page'; // For userThemes
import { mockPostsInitial as allCommunityPosts, alexRomeroAuthor } from '@/app/comunidad/page'; // For posts
import type { PostCardProps, PostStatus } from '@/components/comunidad/PostCard'; // For post structure
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for subscription settings (remains unchanged)
const mockCreatorSubscriptionSettings = {
  isEnabled: false,
  monthlyPriceUSD: 9.99,
  annualPriceUSD: 99.99,
};

const sortPostsForManagement = (posts: PostCardProps[]): PostCardProps[] => {
  const statusOrder: Record<PostStatus, number> = {
    'Borrador': 1,
    'Programado': 2,
    'Publicado': 3,
  };
  return [...posts].sort((a, b) => {
    // Ensure status is defined, default to 'Publicado' if not (though it should be for managed posts)
    const aStatus = a.status || 'Publicado';
    const bStatus = b.status || 'Publicado';

    if (statusOrder[aStatus] !== statusOrder[bStatus]) {
      return statusOrder[aStatus] - statusOrder[bStatus];
    }
    // Sort by timestamp (most recent first)
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
};


export default function MyCommunityContentPage() {
  const [subscriptionEnabled, setSubscriptionEnabled] = React.useState(mockCreatorSubscriptionSettings.isEnabled);
  const [monthlyPrice, setMonthlyPrice] = React.useState(mockCreatorSubscriptionSettings.monthlyPriceUSD.toString());
  const [annualPrice, setAnnualPrice] = React.useState(mockCreatorSubscriptionSettings.annualPriceUSD.toString());
  const [isSavingSettings, setIsSavingSettings] = React.useState(false);
  const { toast } = useToast();
  
  const [userThemes, setUserThemes] = React.useState<UserTheme[]>([]);
  const [selectedThemeId, setSelectedThemeId] = React.useState<string>('todos');
  const [displayedPosts, setDisplayedPosts] = React.useState<PostCardProps[]>([]);

  React.useEffect(() => {
    // Set user themes (collections) from the profile data
    setUserThemes([{ id: 'todos', name: 'Todas las Colecciones' }, ...mockUserProfile.userThemes.filter(theme => theme.id !== 'todos')]);

    // Filter posts by author (Alex Romero)
    const myPosts = allCommunityPosts.filter(post => post.author.name === alexRomeroAuthor.name);
    
    // Filter by selected theme if not 'todos'
    const themeFilteredPosts = selectedThemeId === 'todos'
      ? myPosts
      : myPosts.filter(post => post.themeId === selectedThemeId);
      
    setDisplayedPosts(sortPostsForManagement(themeFilteredPosts));
  }, [selectedThemeId]);

  const handleSaveSubscriptionSettings = async () => {
    setIsSavingSettings(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Guardando configuración de suscripción:", {
      isEnabled: subscriptionEnabled,
      monthlyPrice: parseFloat(monthlyPrice) || 0,
      annualPrice: parseFloat(annualPrice) || 0,
    });
    setIsSavingSettings(false);
    toast({
      title: "Configuración Guardada",
      description: "Tus ajustes de suscripción han sido actualizados.",
    });
  };

  return (
    <div className="space-y-8 pt-8">
      <Card className="shadow-xl border-accent/30">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center text-accent"><DollarSign className="mr-2"/>Monetiza tu Contenido</CardTitle>
          <CardDescription>Permite que tus seguidores se suscriban para acceder a contenido exclusivo y apoyar tu trabajo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-3 p-4 bg-muted/20 rounded-md">
            <Switch
              id="subscription-toggle"
              checked={subscriptionEnabled}
              onCheckedChange={setSubscriptionEnabled}
            />
            <Label htmlFor="subscription-toggle" className="text-lg">
              Habilitar Suscripciones para mi Perfil
            </Label>
          </div>

          {subscriptionEnabled && (
            <div className="space-y-4 animate-in fade-in-50 duration-300">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monthlyPrice" className="font-medium">Precio Mensual (USD)</Label>
                  <Input
                    id="monthlyPrice"
                    type="number"
                    value={monthlyPrice}
                    onChange={(e) => setMonthlyPrice(e.target.value)}
                    placeholder="Ej: 4.99"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="annualPrice" className="font-medium">Precio Anual (USD)</Label>
                  <Input
                    id="annualPrice"
                    type="number"
                    value={annualPrice}
                    onChange={(e) => setAnnualPrice(e.target.value)}
                    placeholder="Ej: 49.99"
                    className="mt-1"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Los usuarios podrán elegir entre suscripción mensual o anual. Define los precios que consideres adecuados.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button 
            onClick={handleSaveSubscriptionSettings} 
            disabled={isSavingSettings}
            className="bg-accent hover:bg-accent/80 text-accent-foreground ml-auto"
          >
            {isSavingSettings ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Guardar Configuración de Suscripción
          </Button>
        </CardFooter>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="w-full sm:w-auto sm:max-w-xs">
          <Select value={selectedThemeId} onValueChange={setSelectedThemeId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por colección..." />
            </SelectTrigger>
            <SelectContent>
              {userThemes.map(theme => (
                <SelectItem key={theme.id} value={theme.id}>{theme.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground" asChild>
          <Link href="/my-community-content/new">
            <PlusCircle className="mr-2 h-5 w-5" /> Crear Nuevo Post
          </Link>
        </Button>
      </div>

      {displayedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedPosts.map((post) => (
            <Card key={post.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow">
              {post.imageUrl ? (
                <div className="relative aspect-video">
                  <NextImage
                    src={post.imageUrl}
                    alt={post.title || 'Post image'}
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                    className="object-cover" 
                    data-ai-hint={post.imageAiHint || 'imagen post'}
                  />
                </div>
              ) : (
                <div className="aspect-video bg-muted flex items-center justify-center p-2">
                  <p className="text-xs text-muted-foreground line-clamp-3 text-center">{post.content.substring(0,100)}{post.content.length > 100 ? '...' : ''}</p>
                </div>
              )}
              <CardHeader className="pb-2 pt-3">
                <CardTitle className="text-md font-semibold leading-tight truncate hover:text-primary transition-colors">
                  {post.title || post.content.substring(0,50) + (post.content.length > 50 ? '...' : '')}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow py-2 text-xs text-muted-foreground">
                <p>Última edición: {new Date(post.timestamp).toLocaleDateString('es-ES')}</p>
                 {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                        {post.tags.slice(0, 2).map(tag => <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0.5">{tag}</Badge>)}
                        {post.tags.length > 2 && <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">+{post.tags.length - 2}</Badge>}
                    </div>
                )}
              </CardContent>
              <CardFooter className="border-t p-3 flex justify-between items-center">
                <Badge
                  variant={
                    post.status === 'Publicado' ? 'default' :
                    post.status === 'Borrador' ? 'secondary' :
                    'outline'
                  }
                  className={
                    post.status === 'Publicado' ? 'bg-green-600/80 text-white' :
                    post.status === 'Borrador' ? '' :
                    post.status === 'Programado' ? 'border-blue-500 text-blue-500' : ''
                  }
                >
                  {post.status || 'Publicado'}
                </Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Edit3 className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Eliminar</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="col-span-full text-center py-12 shadow-md">
          <CardHeader>
            <Users className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <CardTitle className="font-headline text-2xl">
                {selectedThemeId === 'todos' ? 'Tu espacio de contenido está listo' : `No hay posts en la colección "${userThemes.find(t => t.id === selectedThemeId)?.name || ''}"`}
            </CardTitle>
            <CardDescription>
                {selectedThemeId === 'todos' ? 'Crea tu primera publicación para compartir con la comunidad.' : 'Intenta con otra colección o crea un nuevo post.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground" asChild>
              <Link href="/my-community-content/new">
                Crear Nuevo Post
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
