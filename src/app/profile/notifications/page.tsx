'use client';
'use client';

import * as React from 'react';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { UserPlus, Heart, MessageSquare, Bell, ArrowLeft } from 'lucide-react';

export const allMockNotifications = [
  { id: 'notif1', type: 'follow', text: 'Ana Pérez comenzó a seguirte.', icon: UserPlus, time: 'hace 5 min', read: false },
  { id: 'notif2', type: 'like', text: 'A Juan García le gustó tu post "Explorando Genkit".', icon: Heart, time: 'hace 1 hora', read: false },
  { id: 'notif3', type: 'comment', text: 'Laura Gómez comentó en tu debate: "Necesitamos más IA en educación".', icon: MessageSquare, time: 'hace 3 horas', read: true },
  { id: 'notif4', type: 'like', text: 'Roberto M. le gustó tu comentario en "Tendencias de Desarrollo Web".', icon: Heart, time: 'hace 5 horas', read: false },
  { id: 'notif5', type: 'follow', text: 'Prof. Dra. Evelyn Reed comenzó a seguirte.', icon: UserPlus, time: 'hace 1 día', read: true },
  { id: 'notif6', type: 'comment', text: 'Carlos S. respondió a tu comentario en el post sobre "Física Cuántica".', icon: MessageSquare, time: 'hace 2 días', read: true },
  { id: 'notif7', type: 'system', text: 'Tu logro "Colaborador Destacado" ha sido otorgado.', icon: Bell, time: 'hace 3 días', read: true },
];

export default function AllNotificationsPage() {
  const [notifications, setNotifications] = React.useState(allMockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <PageTitle
          title="Todas Mis Notificaciones"
          description="Mantente al día con toda tu actividad en InnovAula."
          className="mb-0"
        />
        <Button variant="outline" asChild>
          <Link href="/profile">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Perfil
          </Link>
        </Button>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <Bell className="mr-2 text-primary" /> Centro de Notificaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length > 0 ? (
            <ul className="space-y-4">
              {notifications.map(notif => {
                const Icon = notif.icon;
                return (
                  <li
                    key={notif.id}
                    className={`p-4 rounded-md flex items-start gap-3 transition-colors ${notif.read ? 'bg-card hover:bg-muted/30' : 'bg-primary/10 hover:bg-primary/20'}`}
                    onClick={() => !notif.read && markAsRead(notif.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && !notif.read && markAsRead(notif.id)}
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
            <p className="text-muted-foreground text-center py-6">No hay notificaciones nuevas.</p>
          )}
        </CardContent>
        {notifications.length > 0 && (
            <CardFooter className="pt-4 border-t">
                <Button variant="outline" size="sm" onClick={() => setNotifications(prev => prev.map(n => ({...n, read: true})))}>
                    Marcar todas como leídas
                </Button>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}

