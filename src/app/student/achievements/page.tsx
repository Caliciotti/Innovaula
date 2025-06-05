'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PageTitle } from '@/components/shared/PageTitle';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Award, Calendar, User } from 'lucide-react';

interface Achievement {
  id: string;
  courseName: string;
  instructorName: string;
  iconUrl: string;
  dataAiHint: string;
  dateEarned: string;
  description?: string;
}

const mockAchievements: Achievement[] = [
  {
    id: 'ach1',
    courseName: 'Desarrollo Web Avanzado con React y Node.js',
    instructorName: 'Dra. Evelyn Reed',
    iconUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'logro código',
    dateEarned: '2024-07-15',
    description: 'Completaste con éxito todos los módulos y el proyecto final del curso de Desarrollo Web Avanzado.',
  },
  {
    id: 'ach2',
    courseName: 'Introducción a la Computación Cuántica',
    instructorName: 'Prof. Alistair Finch',
    iconUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'logro átomo',
    dateEarned: '2024-06-20',
    description: 'Dominaste los fundamentos de los qubits y la superposición cuántica.',
  },
  {
    id: 'ach3',
    courseName: 'Maestría en Marketing Digital: SEO y Redes Sociales',
    instructorName: 'Sara Chen',
    iconUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'logro gráfico',
    dateEarned: '2024-05-10',
    description: 'Demostraste habilidades avanzadas en estrategias de SEO y gestión de redes sociales.',
  },
  {
    id: 'ach4',
    courseName: 'Escritura Creativa: De la Idea a la Novela',
    instructorName: 'Marcos Thorne',
    iconUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'logro pluma',
    dateEarned: '2024-04-01',
    description: 'Finalizaste tu primer borrador de novela con éxito y aplicaste técnicas narrativas avanzadas.',
  },
];

export default function AchievementsPage() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAchievement(null);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      <PageTitle
        title="Mi Colección de Logros"
        description="¡Felicidades por tus éxitos! Aquí puedes ver todas las insignias y reconocimientos que has obtenido."
      />

      {mockAchievements.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {mockAchievements.map((achievement) => (
            <Card
              key={achievement.id}
              className="overflow-hidden shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 cursor-pointer flex flex-col items-center text-center group"
              onClick={() => handleAchievementClick(achievement)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleAchievementClick(achievement)}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center aspect-square">
                <Image
                  src={achievement.iconUrl}
                  alt={`Logro: ${achievement.courseName}`}
                  width={100}
                  height={100}
                  className="rounded-md group-hover:opacity-80 transition-opacity"
                  data-ai-hint={achievement.dataAiHint}
                />
              </CardContent>
              <CardFooter className="p-3 pt-0 w-full">
                 <p className="text-xs text-muted-foreground truncate w-full font-medium group-hover:text-primary transition-colors">{achievement.courseName}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="col-span-full text-center py-12 shadow-lg">
          <CardHeader>
            <Award className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <CardTitle className="font-headline text-2xl">Tu colección está comenzando</CardTitle>
            <CardDescription>Completa cursos para ganar insignias y verlas aquí.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-primary hover:bg-primary/80 text-primary-foreground">
              <a href="/student/courses">Explorar Cursos</a>
            </Button>
          </CardContent>
        </Card>
      )}

      {selectedAchievement && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl text-primary flex items-center">
                <Award className="mr-2 h-6 w-6" /> ¡Logro Desbloqueado!
              </DialogTitle>
              <DialogDescription className="pt-2">
                Felicidades por obtener esta insignia.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4 py-4">
              <Image
                src={selectedAchievement.iconUrl}
                alt={`Logro: ${selectedAchievement.courseName}`}
                width={150}
                height={150}
                className="rounded-lg shadow-md"
                data-ai-hint={selectedAchievement.dataAiHint}
              />
              <h3 className="text-xl font-semibold text-center">{selectedAchievement.courseName}</h3>
              {selectedAchievement.description && (
                <p className="text-sm text-muted-foreground text-center px-4">{selectedAchievement.description}</p>
              )}
              <div className="text-sm text-muted-foreground space-y-1 pt-2 border-t w-full">
                <p className="flex items-center justify-center"><User className="mr-2 h-4 w-4 text-accent" /> Instructor: {selectedAchievement.instructorName}</p>
                <p className="flex items-center justify-center"><Calendar className="mr-2 h-4 w-4 text-accent" /> Obtenido el: {formatDate(selectedAchievement.dateEarned)}</p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCloseModal} className="w-full bg-primary hover:bg-primary/80 text-primary-foreground">Cerrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

