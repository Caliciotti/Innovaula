'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, SendHorizonal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNowStrict } from 'date-fns';
import { es } from 'date-fns/locale';
import * as React from 'react';

export interface PostAuthor {
  name: string;
  avatarUrl: string;
  avatarFallback: string;
  profileLink: string;
  profileAiHint: string;
}

export interface PostStats {
  likes: number;
  comments: number;
  shares: number;
}

export type PostStatus = 'Publicado' | 'Borrador' | 'Programado';

export interface ReactionOption {
  id: string;
  emoji: string;
  label: string;
}

const availableFreeReactions: ReactionOption[] = [
  { id: 'noLoSabia', emoji: '🤯', label: '¡No lo sabía!' },
  { id: 'interesante', emoji: '🔍', label: 'Interesante' },
  { id: 'loVoyAUsar', emoji: '✏️', label: 'Lo voy a usar' },
  { id: 'meAyudoAEntender', emoji: '💡', label: 'Me ayudó a entender' },
  { id: 'graciasPorCompartir', emoji: '🙌', label: 'Gracias por compartir' },
];

export interface TokenReactionOption extends ReactionOption {
  cost: number;
}

const availableTokenReactions: TokenReactionOption[] = [
  { id: 'superUtil', emoji: '⭐', label: 'Súper útil', cost: 1 },
  { id: 'impresionante', emoji: '🔥', label: 'Impresionante', cost: 3 },
  { id: 'graciasProfe', emoji: '🎁', label: '¡Gracias, profe!', cost: 5 },
  { id: 'meInspiraste', emoji: '🌱', label: 'Me inspiraste', cost: 8 },
  { id: 'maestriaTotal', emoji: '👑', label: 'Maestría total', cost: 10 },
];

interface Comment {
  id: string;
  author: PostAuthor;
  text: string;
  timestamp: Date;
}

export interface PostCardProps {
  id: string;
  author: PostAuthor;
  timestamp: Date;
  imageUrl?: string;
  imageAiHint?: string;
  content: string;
  tags?: string[];
  stats: PostStats;
  status?: PostStatus;
  themeId?: string;
  onFreeReact?: (reactionId: string) => void;
  onTokenReact?: (reactionId: string, cost: number) => void;
  onShare?: () => void;
}

const ClientRelativeTime: React.FC<{ date: Date; className?: string }> = ({ date, className }) => {
  const [relativeTime, setRelativeTime] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      setRelativeTime(
        formatDistanceToNowStrict(new Date(date), { addSuffix: true, locale: es })
      );
    } else {
      setRelativeTime('Fecha inválida');
    }
  }, [date]);

  if (!relativeTime) {
    return <span className={`text-xs text-muted-foreground ${className || ''}`}>calculando...</span>;
  }
  return <span className={`text-xs text-muted-foreground hover:underline ${className || ''}`}>{relativeTime}</span>;
};

const mockCurrentUser: PostAuthor = {
  name: 'Alex Romero (Tú)',
  avatarUrl: 'https://placehold.co/100x100.png',
  avatarFallback: 'AR',
  profileLink: '/profile',
  profileAiHint: 'usuario perfil',
};

export function PostCard({
  id,
  author,
  timestamp,
  imageUrl,
  imageAiHint,
  content,
  tags,
  stats: initialStats,
  status,
  themeId,
  onFreeReact,
  onTokenReact,
  onShare,
}: PostCardProps) {

  const [stats, setStats] = React.useState(initialStats);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = React.useState(false);
  const [comments, setComments] = React.useState<Comment[]>(() => {
    const postSpecificComments: Comment[] = [];
    if (id && timestamp instanceof Date && !isNaN(timestamp.getTime())) {
      postSpecificComments.push({
        id: 'comment1-' + id,
        author: { name: 'Laura Gómez', avatarUrl: 'https://placehold.co/100x100.png', avatarFallback: 'LG', profileLink: '#', profileAiHint: 'estudiante joven' },
        text: '¡Qué buen aporte! Justo estaba buscando información sobre esto.',
        timestamp: new Date(timestamp.getTime() + 10 * 60 * 1000),
      });
      postSpecificComments.push({
        id: 'comment2-' + id,
        author: { name: 'Carlos Mendoza', avatarUrl: 'https://placehold.co/100x100.png', avatarFallback: 'CM', profileLink: '#', profileAiHint: 'hombre joven amable' },
        text: 'Gracias por compartir. Me ha sido de mucha utilidad para mi proyecto.',
        timestamp: new Date(timestamp.getTime() + 30 * 60 * 1000),
      });
    }
    return postSpecificComments;
  });
  const [newCommentText, setNewCommentText] = React.useState('');
  const commentsEndRef = React.useRef<HTMLDivElement | null>(null);
  
  const [mockTotalTokenReactions, setMockTotalTokenReactions] = React.useState(0);

  React.useEffect(() => {
    // This will only run on the client, after initial hydration
    setMockTotalTokenReactions(Math.floor(Math.random() * 10));
  }, []);


  const simulatedIndividualFreeCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
     if (availableFreeReactions.length === 0) {
        availableFreeReactions.forEach(r => counts[r.id] = 0);
        return counts;
    }
    if (stats.likes === 0) {
      availableFreeReactions.forEach(r => counts[r.id] = 0);
      return counts;
    }

    let remainingLikes = stats.likes;
    const baseCount = Math.max(0, Math.floor(stats.likes / (availableFreeReactions.length * 1.5 || 1))); 

    availableFreeReactions.forEach(r => {
        counts[r.id] = baseCount;
        remainingLikes -= baseCount;
    });
    
    let distributorIndex = 0;
    while (remainingLikes > 0 && availableFreeReactions.length > 0) { 
        counts[availableFreeReactions[distributorIndex % availableFreeReactions.length].id]++;
        remainingLikes--;
        distributorIndex++;
    }
    
    if (stats.likes > 0 && Object.values(counts).every(c => c === 0) && availableFreeReactions.length > 0) {
        counts[availableFreeReactions[0].id] = stats.likes;
    }
    return counts;
  }, [stats.likes]);

  const getMostVotedFreeReaction = React.useCallback((): ReactionOption => {
    if (availableFreeReactions.length === 0) return {id: 'default', emoji: '?', label: 'Reaccionar'};
    if (stats.likes === 0 || Object.values(simulatedIndividualFreeCounts).every(c => c === 0)) {
        return availableFreeReactions.find(r => r.id === 'interesante') || availableFreeReactions[0];
    }
    let mostVoted = availableFreeReactions[0];
    let maxVotes = simulatedIndividualFreeCounts[mostVoted.id] || 0;
    availableFreeReactions.forEach(reaction => {
      const currentVotes = simulatedIndividualFreeCounts[reaction.id] || 0;
      if (currentVotes > maxVotes) {
        maxVotes = currentVotes;
        mostVoted = reaction;
      }
    });
    return mostVoted;
  }, [stats.likes, simulatedIndividualFreeCounts]);

  const [selectedFreeReaction, setSelectedFreeReaction] = React.useState<ReactionOption>(getMostVotedFreeReaction());

  const simulatedIndividualTokenCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
     if (availableTokenReactions.length === 0) {
        availableTokenReactions.forEach(r => counts[r.id] = 0);
        return counts;
    }
    if (mockTotalTokenReactions === 0) {
        availableTokenReactions.forEach(r => counts[r.id] = 0);
        return counts;
    }

    let remainingTokens = mockTotalTokenReactions;
    const baseCountToken = Math.max(0, Math.floor(remainingTokens / (availableTokenReactions.length * 1.5 || 1))); 
    
    availableTokenReactions.forEach(r => {
        counts[r.id] = baseCountToken;
        remainingTokens -= baseCountToken;
    });
    
    let distributorIndex = 0;
    while (remainingTokens > 0 && availableTokenReactions.length > 0) { 
        counts[availableTokenReactions[distributorIndex % availableTokenReactions.length].id]++;
        remainingTokens--;
        distributorIndex++;
    }

    if (mockTotalTokenReactions > 0 && Object.values(counts).every(c => c === 0) && availableTokenReactions.length > 0) {
        counts[availableTokenReactions[0].id] = mockTotalTokenReactions;
    }
    return counts;
  }, [mockTotalTokenReactions]);

  const getMostVotedTokenReaction = React.useCallback((): TokenReactionOption => {
    if (availableTokenReactions.length === 0) return {id: 'defaultToken', emoji: '🪙', label: 'Aulas', cost: 0};
    if (mockTotalTokenReactions === 0 || Object.values(simulatedIndividualTokenCounts).every(c => c === 0)) {
        return availableTokenReactions.find(r => r.id === 'superUtil') || availableTokenReactions[0];
    }
    let mostVoted = availableTokenReactions[0];
    let maxVotes = simulatedIndividualTokenCounts[mostVoted.id] || 0;
    availableTokenReactions.forEach(reaction => {
      const currentVotes = simulatedIndividualTokenCounts[reaction.id] || 0;
      if (currentVotes > maxVotes) {
        maxVotes = currentVotes;
        mostVoted = reaction;
      }
    });
    return mostVoted;
  }, [mockTotalTokenReactions, simulatedIndividualTokenCounts]);

  const [selectedTokenReaction, setSelectedTokenReaction] = React.useState<TokenReactionOption>(getMostVotedTokenReaction());

  React.useEffect(() => {
    setSelectedFreeReaction(getMostVotedFreeReaction());
  }, [getMostVotedFreeReaction]);

  React.useEffect(() => {
    setSelectedTokenReaction(getMostVotedTokenReaction());
  }, [getMostVotedTokenReaction]);

  const handleFreeReactionSelect = (reaction: ReactionOption) => {
    setSelectedFreeReaction(reaction);
    if (onFreeReact) {
      onFreeReact(reaction.id);
    }
    setStats(prevStats => ({ ...prevStats, likes: prevStats.likes + 1 }));
  };

  const handleTokenReactionSelect = (reaction: TokenReactionOption) => {
    setSelectedTokenReaction(reaction);
    setMockTotalTokenReactions(prev => prev + 1);
    if (onTokenReact) {
      onTokenReact(reaction.id, reaction.cost);
    }
  };

  const handleInteraction = (action?: () => void) => {
    if (action) {
      action();
    } else {
      console.log(`Interaction on post ${id}`);
    }
  };

  const getStatusBadgeVariant = (postStatus?: PostStatus) => {
    switch (postStatus) {
      case 'Borrador': return 'secondary';
      case 'Programado': return 'outline';
      default: return 'default';
    }
  };

  const handlePostNewComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const newComment: Comment = {
      id: `comment-${Date.now()}-${id}`,
      author: mockCurrentUser,
      text: newCommentText,
      timestamp: new Date(),
    };
    setComments(prevComments => [...prevComments, newComment]);
    setStats(prevStats => ({ ...prevStats, comments: prevStats.comments + 1 }));
    setNewCommentText('');
  };

  React.useEffect(() => {
    if (isCommentsModalOpen && commentsEndRef.current) {
      const timer = setTimeout(() => { 
        commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50); // Small delay to ensure content is rendered
      return () => clearTimeout(timer);
    }
  }, [comments, isCommentsModalOpen]);

  return (
    <>
      <Card className="shadow-lg overflow-hidden rounded-xl hover:shadow-primary/10 transition-shadow duration-300">
        <CardHeader className="p-4">
          <div className="flex items-center space-x-3">
            <Link href={author.profileLink}>
              <Avatar className="h-11 w-11 cursor-pointer">
                <AvatarImage src={author.avatarUrl} alt={author.name} data-ai-hint={author.profileAiHint} />
                <AvatarFallback>{author.avatarFallback}</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex-grow">
              <Link href={author.profileLink}>
                  <p className="text-sm font-semibold hover:underline">{author.name}</p>
              </Link>
              <ClientRelativeTime date={timestamp} />
            </div>
            {status && status !== 'Publicado' && (
              <Badge
                variant={getStatusBadgeVariant(status)}
                className={`text-xs ${status === 'Programado' ? 'border-blue-500 text-blue-500' : ''}`}
              >
                {status}
              </Badge>
            )}
            <Button variant="ghost" size="icon" className="ml-auto shrink-0">
              <MoreHorizontal className="h-5 w-5" />
              <span className="sr-only">Más opciones</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-3 space-y-3">
          <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
            {content}
          </p>
          {imageUrl && (
            <div className="rounded-lg overflow-hidden border aspect-video relative">
              <Image
                src={imageUrl}
                alt="Contenido del post"
                layout="fill"
                objectFit="cover"
                data-ai-hint={imageAiHint}
              />
            </div>
          )}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="p-2 border-t bg-muted/30">
           <div className="flex justify-between w-full items-center">
            <div className="flex"> {/* Grupo de reacciones a la izquierda */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <span className="text-lg mr-1.5">{selectedFreeReaction.emoji}</span>
                    {selectedFreeReaction.label}
                    {stats.likes > 0 && <span className="ml-1.5 text-sm font-semibold text-primary">{stats.likes}</span>}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {availableFreeReactions.map(reaction => (
                    <DropdownMenuItem key={reaction.id} onClick={() => handleFreeReactionSelect(reaction)}>
                      <span className="text-lg mr-2">{reaction.emoji}</span>
                      {reaction.label}
                      {simulatedIndividualFreeCounts[reaction.id] > 0 && (
                        <span className="ml-auto text-xs text-primary">
                          {simulatedIndividualFreeCounts[reaction.id]}
                        </span>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                    <span className="text-lg mr-1.5">{selectedTokenReaction.emoji}</span>
                    <span className="hidden sm:inline">{selectedTokenReaction.label}</span>
                    {mockTotalTokenReactions > 0 && <span className="ml-1.5 text-sm font-semibold text-accent">{mockTotalTokenReactions}</span>}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {availableTokenReactions.map(reaction => (
                    <DropdownMenuItem key={reaction.id} onClick={() => handleTokenReactionSelect(reaction)}>
                      <span className="text-lg mr-2">{reaction.emoji}</span>
                      {reaction.label}
                      {simulatedIndividualTokenCounts[reaction.id] > 0 && (
                        <span className="ml-auto text-xs text-accent">
                          {simulatedIndividualTokenCounts[reaction.id]}
                        </span>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center"> {/* Grupo de comentarios y compartir a la derecha */}
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" onClick={() => setIsCommentsModalOpen(true)}>
                <span className="text-lg mr-0.5">💬</span>
                {stats.comments > 0 && <span className="text-sm font-semibold text-primary">{stats.comments}</span>}
              </Button>

              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" onClick={() => handleInteraction(onShare)}>
                <span className="text-lg mr-0.5">↪️</span>
                {stats.shares > 0 && <span className="text-sm font-semibold text-accent">{stats.shares}</span>}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isCommentsModalOpen} onOpenChange={setIsCommentsModalOpen}>
        <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl">
           <DialogHeader className="sr-only">
            <DialogTitle>Comentarios del Post</DialogTitle>
            {/* <DialogDescription>Visualiza y añade comentarios a este post.</DialogDescription> */}
          </DialogHeader>
          <div className="py-4 space-y-4">
            <ScrollArea className="h-[300px] pr-4">
              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map(comment => (
                    <div key={comment.id} className="flex items-start space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} data-ai-hint={comment.author.profileAiHint}/>
                        <AvatarFallback>{comment.author.avatarFallback}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 bg-muted/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold">{comment.author.name}</p>
                          <ClientRelativeTime date={comment.timestamp} className="text-[10px]" />
                        </div>
                        <p className="text-sm text-foreground mt-1">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={commentsEndRef} />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No hay comentarios aún. ¡Sé el primero!</p>
              )}
            </ScrollArea>
            <form onSubmit={handlePostNewComment} className="flex items-start space-x-2 pt-4 border-t">
              <Avatar className="h-9 w-9">
                 <AvatarImage src={mockCurrentUser.avatarUrl} alt={mockCurrentUser.name} data-ai-hint={mockCurrentUser.profileAiHint} />
                 <AvatarFallback>{mockCurrentUser.avatarFallback}</AvatarFallback>
              </Avatar>
              <Textarea
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Escribe tu comentario..."
                rows={2}
                className="flex-grow resize-none"
              />
              <Button type="submit" size="icon" className="shrink-0 bg-primary hover:bg-primary/80 text-primary-foreground">
                <SendHorizonal className="h-4 w-4" />
                <span className="sr-only">Enviar comentario</span>
              </Button>
            </form>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cerrar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

