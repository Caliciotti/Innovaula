'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit3, Trash2, Bot, ClipboardCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AvatarData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageAiHint: string;
  status: 'Activo' | 'Borrador' | 'Entrenando';
}

const mockEducationalAvatars: AvatarData[] = [
  {
    id: 'avatar1',
    name: 'Celulito Explica',
    description: 'Un experto en biología celular que explica conceptos complejos de forma sencilla y divertida.',
    imageUrl: 'https://placehold.co/300x200.png',
    imageAiHint: 'célula caricatura',
    status: 'Activo',
  },
  {
    id: 'avatar3',
    name: 'Quantum Quip',
    description: 'Un bot ingenioso que desmitifica la física cuántica con analogías y humor.',
    imageUrl: 'https://placehold.co/300x200.png',
    imageAiHint: 'átomo abstracto',
    status: 'Entrenando',
  },
];

const mockEvaluatorAvatars: AvatarData[] = [
  {
    id: 'evaluator1',
    name: 'Lógica Matemática IA',
    description: 'Evalúa la comprensión de conceptos lógicos y matemáticos a través de preguntas adaptativas.',
    imageUrl: 'https://placehold.co/300x200.png',
    imageAiHint: 'circuito cerebro',
    status: 'Activo',
  },
  {
    id: 'evaluator2',
    name: 'Analista de Argumentos Históricos IA',
    description: 'Analiza la coherencia y validez de argumentos en ensayos de historia.',
    imageUrl: 'https://placehold.co/300x200.png',
    imageAiHint: 'libro antiguo lupa',
    status: 'Borrador',
  },
];

export default function ManageAvatarsPage() {
  return (
    <div className="space-y-8 pt-8">
      <div className="flex justify-end mb-6">
        <Button asChild className="bg-primary hover:bg-primary/80 text-primary-foreground whitespace-nowrap">
          <Link href="/teaching/avatars/new">
            <PlusCircle className="mr-2 h-5 w-5" /> Crear Nuevo Avatar
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="educational" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="educational" className="text-sm sm:text-base">
            <Bot className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Educativos
          </TabsTrigger>
          <TabsTrigger value="evaluators" className="text-sm sm:text-base">
            <ClipboardCheck className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Evaluadores
          </TabsTrigger>
        </TabsList>

        <TabsContent value="educational">
          {mockEducationalAvatars.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEducationalAvatars.map(avatar => (
                <Card key={avatar.id} className="shadow-lg hover:shadow-primary/20 transition-shadow flex flex-col">
                  <Image
                    src={avatar.imageUrl}
                    alt={avatar.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                    data-ai-hint={avatar.imageAiHint}
                  />
                  <CardHeader className="pb-2">
                    <CardTitle className="font-headline text-xl hover:text-primary">
                      <Link href={`/teaching/avatars/${avatar.id}/edit`}>{avatar.name}</Link>
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-2">{avatar.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <Badge
                      variant={
                        avatar.status === 'Activo' ? 'default' :
                        avatar.status === 'Borrador' ? 'secondary' :
                        'outline'
                      }
                      className={
                        avatar.status === 'Activo' ? 'bg-green-600/80 text-white' :
                        avatar.status === 'Entrenando' ? 'bg-blue-500/80 text-white' : ''
                      }
                    >
                      {avatar.status}
                    </Badge>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex gap-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href={`/teaching/avatars/${avatar.id}/edit`}>
                        <Edit3 className="mr-1 h-4 w-4" /> Editar
                      </Link>
                    </Button>
                    <Button variant="destructive" size="icon" className="h-9 w-9">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar Avatar</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12 shadow-lg">
              <CardHeader>
                 <Bot className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <CardTitle className="font-headline text-2xl">No hay Avatares Educativos</CardTitle>
                <CardDescription>Crea tu primer asistente virtual educativo.</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src="https://placehold.co/300x200.png" data-ai-hint="robot amigable" alt="Ilustración de avatar IA" width={300} height={200} className="mx-auto mb-6 rounded-md" />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="evaluators">
          {mockEvaluatorAvatars.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEvaluatorAvatars.map(avatar => (
                <Card key={avatar.id} className="shadow-lg hover:shadow-primary/20 transition-shadow flex flex-col">
                  <Image
                    src={avatar.imageUrl}
                    alt={avatar.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                    data-ai-hint={avatar.imageAiHint}
                  />
                  <CardHeader className="pb-2">
                    <CardTitle className="font-headline text-xl hover:text-primary">
                      <Link href={`/teaching/avatars/${avatar.id}/edit-evaluator`}>{avatar.name}</Link>
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-2">{avatar.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <Badge
                      variant={
                        avatar.status === 'Activo' ? 'default' :
                        avatar.status === 'Borrador' ? 'secondary' :
                        'outline'
                      }
                      className={
                        avatar.status === 'Activo' ? 'bg-green-600/80 text-white' :
                        avatar.status === 'Entrenando' ? 'bg-blue-500/80 text-white' : ''
                      }
                    >
                      {avatar.status}
                    </Badge>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex gap-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href={`/teaching/avatars/${avatar.id}/edit-evaluator`}>
                        <Edit3 className="mr-1 h-4 w-4" /> Editar
                      </Link>
                    </Button>
                    <Button variant="destructive" size="icon" className="h-9 w-9">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar Avatar</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12 shadow-lg">
              <CardHeader>
                 <ClipboardCheck className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <CardTitle className="font-headline text-2xl">No hay Avatares Evaluadores</CardTitle>
                <CardDescription>Configura tu primer asistente de IA para evaluaciones.</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src="https://placehold.co/300x200.png" data-ai-hint="robot evaluador" alt="Ilustración de avatar evaluador IA" width={300} height={200} className="mx-auto mb-6 rounded-md" />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

