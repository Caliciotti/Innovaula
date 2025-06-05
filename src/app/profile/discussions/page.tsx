'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { MessageSquare, ArrowLeft, FileText, ThumbsUp, MessageCircle as CommentsIcon, Search as SearchIcon, FilterX } from 'lucide-react';
import { mockPosts as allCommunityPosts, alexRomeroAuthor } from '@/app/comunidad/page.tsx'; 
import type { PostCardProps } from '@/components/comunidad/PostCard';
import { formatDistanceToNowStrict } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ClientRelativeTime: React.FC<{ date: Date }> = ({ date }) => {
  const [relativeTime, setRelativeTime] = React.useState<string | null>(null);

  React.useEffect(() => {
    setRelativeTime(
      formatDistanceToNowStrict(date, { addSuffix: true, locale: es })
    );
  }, [date]);

  if (!relativeTime) {
    return <span className="text-xs text-muted-foreground">calculando...</span>;
  }
  return <>{relativeTime}</>;
};

const monthDisplayOptions: { value: string, label: string }[] = [
  { value: "all", label: "Todos los Meses" },
  { value: "0", label: "Enero" },
  { value: "1", label: "Febrero" },
  { value: "2", label: "Marzo" },
  { value: "3", label: "Abril" },
  { value: "4", label: "Mayo" },
  { value: "5", label: "Junio" },
  { value: "6", label: "Julio" },
  { value: "7", label: "Agosto" },
  { value: "8", label: "Septiembre" },
  { value: "9", label: "Octubre" },
  { value: "10", label: "Noviembre" },
  { value: "11", label: "Diciembre" },
];

export default function AllDiscussionsPage() {
  const [userDiscussions, setUserDiscussions] = React.useState<PostCardProps[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedMonth, setSelectedMonth] = React.useState<string>("all");
  const [selectedYear, setSelectedYear] = React.useState<string>("all");
  const [selectedTag, setSelectedTag] = React.useState<string>("all");
  
  const [availableTags, setAvailableTags] = React.useState<string[]>([]);
  const [availableYears, setAvailableYears] = React.useState<string[]>([]);

  React.useEffect(() => {
    const discussions = allCommunityPosts.filter(
      post => post.author.name === alexRomeroAuthor.name && !post.imageUrl && post.status === 'Publicado'
    ).sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setUserDiscussions(discussions);

    const tags = new Set<string>();
    const years = new Set<string>();
    discussions.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
      years.add(new Date(post.timestamp).getFullYear().toString());
    });
    setAvailableTags(["all", ...Array.from(tags).sort()]);
    setAvailableYears(["all", ...Array.from(years).sort((a, b) => parseInt(b) - parseInt(a))]);

  }, []);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedMonth('all');
    setSelectedYear('all');
    setSelectedTag('all');
  };

  const filteredDiscussions = userDiscussions.filter(post => {
    const term = searchTerm.toLowerCase();
    const contentMatch = post.content.toLowerCase().includes(term);
    const tagTextMatch = post.tags && post.tags.some(tag => tag.toLowerCase().includes(term));

    if (searchTerm && !(contentMatch || tagTextMatch)) {
      return false;
    }

    const postDate = new Date(post.timestamp);
    if (selectedYear !== "all" && postDate.getFullYear().toString() !== selectedYear) {
      return false;
    }
    if (selectedMonth !== "all" && postDate.getMonth().toString() !== selectedMonth) {
      return false;
    }

    if (selectedTag !== "all" && (!post.tags || !post.tags.includes(selectedTag))) {
      return false;
    }

    return true;
  });

  const areFiltersActive = searchTerm || selectedMonth !== 'all' || selectedYear !== 'all' || selectedTag !== 'all';

  return (
    <div className="max-w-3xl mx-auto pt-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <div className="relative flex-grow w-full sm:w-auto">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar en mis debates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <Button variant="outline" asChild className="w-full sm:w-auto">
          <Link href="/profile">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Perfil
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Año" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map(year => (
              <SelectItem key={year} value={year}>{year === "all" ? "Todos los Años" : year}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Mes" />
          </SelectTrigger>
          <SelectContent>
            {monthDisplayOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedTag} onValueChange={setSelectedTag} disabled={availableTags.length <= 1}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Temática" />
          </SelectTrigger>
          <SelectContent>
            {availableTags.map(tag => (
              <SelectItem key={tag} value={tag}>{tag === "all" ? "Todas las Temáticas" : tag}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {areFiltersActive && (
          <Button variant="ghost" onClick={handleClearFilters} className="w-full sm:w-auto text-destructive hover:text-destructive">
            <FilterX className="mr-2 h-4 w-4" /> Limpiar Filtros
          </Button>
        )}
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <MessageSquare className="mr-2 text-primary" /> Mis Debates de Texto
          </CardTitle>
          {areFiltersActive && <p className="text-sm text-muted-foreground">Mostrando resultados filtrados.</p>}
        </CardHeader>
        <CardContent className="space-y-6">
          {filteredDiscussions.length > 0 ? (
            filteredDiscussions.map(post => (
              <Card key={post.id} className="bg-card hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint={post.author.profileAiHint} />
                      <AvatarFallback>{post.author.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{post.author.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Publicado <ClientRelativeTime date={post.timestamp} />
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground whitespace-pre-line leading-relaxed">{post.content}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground justify-between pt-3 border-t">
                  <div className="flex gap-3">
                    <span className="flex items-center"><ThumbsUp className="h-3.5 w-3.5 mr-1"/> {post.stats.likes} Likes</span>
                    <span className="flex items-center"><CommentsIcon className="h-3.5 w-3.5 mr-1"/> {post.stats.comments} Comentarios</span>
                  </div>
                  <Button variant="link" size="sm" className="p-0 h-auto text-primary hover:underline">
                    Ver Debate Completo
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl font-semibold text-muted-foreground">
                {areFiltersActive ? 'No se encontraron debates que coincidan con tus filtros.' : 'No has iniciado ningún debate aún.'}
              </p>
              {!areFiltersActive && (
                <>
                  <p className="text-sm text-muted-foreground mb-6">Comparte tus ideas y preguntas con la comunidad.</p>
                  <Button asChild className="bg-primary hover:bg-primary/80 text-primary-foreground">
                    <Link href="/my-community-content/new">Iniciar un Nuevo Debate</Link>
                  </Button>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
