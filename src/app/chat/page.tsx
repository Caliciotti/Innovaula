'use client';

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Paperclip, SendHorizonal, Smile, MessageSquare, Search } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  avatarUrl: string;
  avatarFallback: string;
  profileAiHint: string;
  role?: 'Educador' | 'Estudiante';
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessagePreview?: string;
}

const currentUserId = 'currentUserInnovAula';
const currentUser: User = {
  id: currentUserId,
  name: 'Alex Romero (Tú)',
  avatarUrl: 'https://placehold.co/100x100.png',
  avatarFallback: 'AR',
  profileAiHint: 'usuario perfil',
  role: 'Estudiante'
};

const mockUsers: User[] = [
  { id: 'user1', name: 'Prof. Dra. Evelyn Reed', avatarUrl: 'https://placehold.co/100x100.png', avatarFallback: 'ER', profileAiHint: 'profesora sonriendo', role: 'Educador' },
  { id: 'user2', name: 'Laura Gómez (Estudiante)', avatarUrl: 'https://placehold.co/100x100.png', avatarFallback: 'LG', profileAiHint: 'estudiante joven', role: 'Estudiante' },
  { id: 'user3', name: 'Carlos Mendoza (Asistente Curso)', avatarUrl: 'https://placehold.co/100x100.png', avatarFallback: 'CM', profileAiHint: 'hombre joven amable', role: 'Educador' },
  { id: 'user4', name: 'Grupo: Proyecto Final Web', avatarUrl: 'https://placehold.co/100x100.png', avatarFallback: 'GP', profileAiHint: 'grupo estudio', role: undefined },
];

const initialConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: [currentUser, mockUsers[0]],
    messages: [
      { id: 'msg1', senderId: mockUsers[0].id, text: '¡Hola Alex! Vi tu entrega para el módulo 3, buen trabajo. ¿Tienes alguna duda sobre el feedback?', timestamp: new Date('2024-07-29T14:00:00Z') },
      { id: 'msg2', senderId: currentUserId, text: '¡Hola Prof. Reed! Gracias. Sí, tengo una pregunta sobre el uso de hooks avanzados.', timestamp: new Date('2024-07-29T14:02:00Z') },
    ],
  },
  {
    id: 'conv2',
    participants: [currentUser, mockUsers[1]],
    messages: [
      { id: 'msg4', senderId: mockUsers[1].id, text: '¡Hola Alex! ¿Entendiste la última parte de la clase de cuántica?', timestamp: new Date('2024-07-28T10:00:00Z') },
      { id: 'msg5', senderId: currentUserId, text: 'Más o menos, ¿quieres que repasemos juntos antes de la próxima sesión?', timestamp: new Date('2024-07-28T10:05:00Z') },
    ],
  },
  {
    id: 'conv3',
    participants: [currentUser, mockUsers[3]],
    messages: [
      { id: 'msg6', senderId: mockUsers[1].id, text: 'Equipo, ¿alguien tiene el link al repo del proyecto?', timestamp: new Date('2024-07-29T09:00:00Z') },
      { id: 'msg7', senderId: currentUserId, text: '¡Claro! Aquí está: github.com/proyecto-final', timestamp: new Date('2024-07-29T09:01:00Z') },
    ],
  },
];

const ClientFormattedTime: React.FC<{ date: Date }> = ({ date }) => {
  const [clientTime, setClientTime] = useState<string | null>(null);

  useEffect(() => {
    setClientTime(
      date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }, [date]);

  if (!clientTime) {
    return null;
  }
  return <>{clientTime}</>;
};

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(initialConversations[0]?.id || null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [conversationSearchTerm, setConversationSearchTerm] = useState('');

  const selectedConversation = conversations.find(conv => conv.id === selectedConversationId);
  const otherParticipant = selectedConversation?.participants.find(p => p.id !== currentUserId && p.id !== 'groupPlaceholder');

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversationId) return;

    const message: Message = {
      id: `msg${Date.now()}`,
      senderId: currentUserId,
      text: newMessage,
      timestamp: new Date(),
    };

    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversationId
          ? { ...conv, messages: [...conv.messages, message] }
          : conv
      )
    );
    setNewMessage('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation?.messages]);
  
  const filteredConversations = conversations.filter(conv => {
    const otherUser = conv.participants.find(p => p.id !== currentUserId);
    if (!otherUser) return false;
    return otherUser.name.toLowerCase().includes(conversationSearchTerm.toLowerCase());
  });

  return (
    <div className="h-[calc(100vh-var(--header-height,120px)-3rem)] flex flex-col">
      
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full overflow-hidden pt-4">
        <Card className="md:col-span-1 lg:col-span-1 h-full flex flex-col shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="font-headline text-xl">Conversaciones</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar conversaciones..."
                value={conversationSearchTerm}
                onChange={(e) => setConversationSearchTerm(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-grow overflow-hidden">
            <ScrollArea className="h-full p-3">
              {filteredConversations.length > 0 ? (
                <div className="space-y-2">
                  {filteredConversations.map(conv => {
                    const otherUser = conv.participants.find(p => p.id !== currentUserId);
                    const lastMessage = conv.messages[conv.messages.length - 1];
                    return (
                      <Button
                        key={conv.id}
                        variant={selectedConversationId === conv.id ? "secondary" : "ghost"}
                        className="w-full justify-start h-auto py-3 px-3 text-left"
                        onClick={() => handleSelectConversation(conv.id)}
                      >
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={otherUser?.avatarUrl} alt={otherUser?.name} data-ai-hint={otherUser?.profileAiHint}/>
                          <AvatarFallback>{otherUser?.avatarFallback}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow overflow-hidden">
                          <p className="font-semibold truncate">{otherUser?.name}</p>
                          {lastMessage && (
                            <p className="text-xs text-muted-foreground truncate">
                              {lastMessage.senderId === currentUserId && "Tú: "}{lastMessage.text}
                            </p>
                          )}
                        </div>
                        {lastMessage && <span className="text-xs text-muted-foreground ml-auto shrink-0"><ClientFormattedTime date={lastMessage.timestamp} /></span>}
                      </Button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  {conversationSearchTerm ? `No se encontraron conversaciones que coincidan con "${conversationSearchTerm}".` : "No tienes conversaciones activas."}
                </p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3 h-full flex flex-col shadow-xl">
          {selectedConversation && otherParticipant ? (
            <>
              <CardHeader className="border-b p-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={otherParticipant.avatarUrl} alt={otherParticipant.name} data-ai-hint={otherParticipant.profileAiHint}/>
                        <AvatarFallback>{otherParticipant.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="font-headline text-xl">{otherParticipant.name}</CardTitle>
                        {otherParticipant.role && <CardDescription className="text-xs">{otherParticipant.role}</CardDescription> }
                        <CardDescription className="text-xs text-green-500">Online</CardDescription>
                    </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-0 overflow-hidden">
                <ScrollArea className="h-full p-4 space-y-4">
                  {selectedConversation.messages.map(msg => {
                    const sender = selectedConversation.participants.find(p => p.id === msg.senderId) || currentUser;
                    const isCurrentUser = msg.senderId === currentUserId;
                    return (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex items-end gap-2 max-w-[75%]",
                        isCurrentUser ? "ml-auto flex-row-reverse" : "mr-auto"
                      )}
                    >
                       {!isCurrentUser && (
                        <Avatar className="h-8 w-8 shrink-0">
                            <AvatarImage src={sender.avatarUrl} alt={sender.name} data-ai-hint={sender.profileAiHint}/>
                            <AvatarFallback>{sender.avatarFallback}</AvatarFallback>
                        </Avatar>
                       )}
                      <div
                        className={cn(
                          "rounded-lg px-3 py-2 text-sm shadow",
                          isCurrentUser
                            ? "bg-primary text-primary-foreground rounded-br-none"
                            : "bg-muted text-foreground rounded-bl-none"
                        )}
                      >
                        {!isCurrentUser && selectedConversation.participants.length > 2 && sender.id !== otherParticipant.id && (
                            <p className="text-xs font-semibold mb-0.5" style={{ color: sender.avatarFallback === 'LG' ? 'hsl(var(--accent))' : 'hsl(var(--secondary-foreground))' }}>{sender.name.split(' ')[0]}</p>
                        )}
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                        <p className={cn("text-xs mt-1", isCurrentUser ? "text-primary-foreground/70 text-right" : "text-muted-foreground/70 text-left")}>
                            <ClientFormattedTime date={msg.timestamp} />
                        </p>
                      </div>
                    </div>
                  );
                })}
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-3 border-t">
                <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                  <Button variant="ghost" size="icon" type="button">
                    <Paperclip className="h-5 w-5 text-muted-foreground"/>
                  </Button>
                  <Input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow"
                    autoComplete="off"
                  />
                  <Button variant="ghost" size="icon" type="button">
                    <Smile className="h-5 w-5 text-muted-foreground"/>
                  </Button>
                  <Button type="submit" size="icon" className="bg-primary hover:bg-primary/80">
                    <SendHorizonal className="h-5 w-5 text-primary-foreground"/>
                  </Button>
                </form>
              </CardFooter>
            </>
          ) : (
            <CardContent className="flex flex-col items-center justify-center h-full text-center">
              <MessageSquare className="h-24 w-24 text-muted-foreground mb-4" />
              <p className="text-xl font-semibold">Selecciona una conversación</p>
              <p className="text-muted-foreground">Elige un chat de la lista para ver los mensajes o iniciar uno nuevo.</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
