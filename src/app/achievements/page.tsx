'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Award, Calendar, User, Tag, Book, Users as CommunityIcon } from 'lucide-react';
import Link from 'next/link';

export interface Achievement { // Exported interface
  id: string;
  courseName: string;
  instructorName: string;
  iconUrl: string;
  dataAiHint: string;
  dateEarned: string;
  description?: string;
  category: string;
}

export const mockAchievements: Achievement[] = [ // Exported mock data
  {
    id: 'ach1',
    courseName: 'Desarrollo Web Avanzado con React y Node.js',
    instructorName: 'Dra. Evelyn Reed',
    iconUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'logro código',
    dateEarned: '2024-07-15',
    description: 'Completaste con éxito todos los módulos y el proyecto final del curso de Desarrollo Web Avanzado.',
    category: 'Cursos y Certificaciones',
  },
  {
    id: 'ach2',
    courseName: 'Introducción a la Computación Cuántica',
    instructorName: 'Prof. Alistair Finch',
    iconUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'logro átomo',
    dateEarned: '2024-06-20',
    description: 'Dominaste los fundamentos de los qubits y la superposición cuántica.',
    category: 'Cursos y Certificaciones',
  },
  {
    id: 'ach3',
    courseName: 'Maestría en Marketing Digital: SEO y Redes Sociales',
    instructorName: 'Sara Chen',
    iconUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'logro gráfico',
    dateEarned: '2024-05-10',
    description: 'Demostraste habilidades avanzadas en estrategias de SEO y gestión de redes sociales.',
    category: 'Cursos y Certificaciones',
  },
  {
    id: 'ach4',
    courseName: 'Escritura Creativa: De la Idea a la Novela',
    instructorName: 'Marcos Thorne',
    iconUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'logro pluma',
    dateEarned: '2024-04-01',
    description: 'Finalizaste tu primer borrador de novela con éxito y aplicaste técnicas narrativas avanzadas.',
    category: 'Cursos y Certificaciones',
  },
  {
    id: 'ach5',
    courseName: 'Colaborador Destacado del Mes',
    instructorName: 'Comunidad InnovAula',
    iconUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'insignia comunidad',
    dateEarned: '2024-07-01',
    description: 'Por tus valiosas contribuciones y posts en el feed comunitario durante Junio.',
    category: 'Participación Comunitaria',
  },
  {
    id: 'ach6',
    courseName: 'Pionero en VR Educativo',
    instructorName: 'InnovAula Labs',
    iconUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'logro vr',
    dateEarned: '2024-06-15',
    description: 'Por ser uno de los primeros en explorar y dar feedback sobre nuestras experiencias VR.',
    category: 'Hitos de Plataforma',
  },
  {
    id: 'ach7',
    courseName: 'Certificación en Python para Ciencia de Datos',
    instructorName: 'DataMasters Academy',
    iconUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'python datos',
    dateEarned: '2024-03-20',
    description: 'Completaste exitosamente el programa de certificación en Python para Ciencia de Datos.',
    category: 'Cursos y Certificaciones',
  },
  {
    id: 'ach8',
    courseName: 'Diseño UI/UX con Figma',
    instructorName: 'Laura Kent',
    iconUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'figma diseño',
    dateEarned: '2024-02-10',
    description: 'Dominio de herramientas y principios de diseño de interfaces y experiencia de usuario.',
    category: 'Cursos y Certificaciones',
  },
  {
    id: 'ach9',
    courseName: 'Influencer Comunitario',
    instructorName: 'Comunidad InnovAula',
    iconUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'red altavoz',
    dateEarned: '2024-05-01',
    description: 'Por alcanzar 500 seguidores y generar debates constructivos.',
    category: 'Participación Comunitaria',
  },
  {
    id: 'ach10',
    courseName: 'Beta Tester Dorado',
    instructorName: 'InnovAula Dev Team',
    iconUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'beta prueba',
    dateEarned: '2024-01-15',
    description: 'Por tu feedback invaluable durante las fases beta de nuevas funcionalidades.',
    category: 'Hitos de Plataforma',
  },
  {
    id: 'ach11',
    courseName: 'Experto en JavaScript Moderno',
    instructorName: 'Dra. Evelyn Reed',
    iconUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'javascript logo',
    dateEarned: '2023-12-01',
    description: 'Demostración de conocimiento avanzado en ES6+ y patrones de diseño en JavaScript.',
    category: 'Cursos y Certificaciones',
  },
  {
    id: 'ach12',
    courseName: 'Mentor Voluntario',
    instructorName: 'Comunidad InnovAula',
    iconUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'mentor mano amiga',
    dateEarned: '2024-06-01',
    description: 'Por dedicar tiempo a ayudar a nuevos miembros de la comunidad.',
    category: 'Participación Comunitaria',
  }
];

const groupAchievementsByCategory = (achievements: Achievement[]) => {
  return achievements.reduce((acc, achievement) => {
    const category = achievement.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);
};

export default function AchievementsPage() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupedAchievements, setGroupedAchievements] = useState<Record<string, Achievement[]>>({});

  useEffect(() => {
    setGroupedAchievements(groupAchievementsByCategory(mockAchievements));
  }, []);

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

  const getCategoryIcon = (categoryName: string) => {
    if (categoryName.includes('Curso')) return <Book className="mr-2 h-6 w-6 text-primary" />;
    if (categoryName.includes('Comunitaria')) return <CommunityIcon className="mr-2 h-6 w-6 text-accent" />;
    if (categoryName.includes('Plataforma') || categoryName.includes('Hito')) return <Award className="mr-2 h-6 w-6 text-yellow-500" />;
    return <Tag className="mr-2 h-6 w-6 text-muted-foreground" />;
  }

  return (
    <div className="space-y-12 pt-8">
      {Object.keys(groupedAchievements).length > 0 ? (
        Object.entries(groupedAchievements).map(([category, achievementsInCategory]) => (
          <section key={category} className="space-y-6">
            <h2 className="text-3xl font-headline font-semibold text-foreground flex items-center border-b pb-2">
              {getCategoryIcon(category)}
              {category} ({achievementsInCategory.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {achievementsInCategory.map((achievement) => (
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
          </section>
        ))
      ) : (
        <Card className="col-span-full text-center py-12 shadow-lg">
          <CardHeader>
            <Award className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <CardTitle className="font-headline text-2xl">Tu colección está comenzando</CardTitle>
            <CardDescription>Completa cursos y participa en la comunidad para ganar insignias y verlas aquí.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-primary hover:bg-primary/80 text-primary-foreground">
              <Link href="/courses">Explorar Cursos</Link>
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
                Felicidades por obtener este reconocimiento de la categoría "{selectedAchievement.category}".
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
                <p className="flex items-center justify-center"><User className="mr-2 h-4 w-4 text-accent" /> Otorgado por: {selectedAchievement.instructorName}</p>
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
