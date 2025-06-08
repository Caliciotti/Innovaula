export interface SessionData {
  id: string;
  dateTime: Date;
  duration: string;
  capacity: number;
  enrolled: number;
  status?: string;
}

export interface CoursePresencial {
  id: string;
  title: string;
  description: string;
  level?: string;
  price?: string;
  classDuration?: string;
  sessions?: SessionData[];
}

export interface SpaceData {
  id: string;
  name: string;
  address: string;
  type: string;
  description: string;
  coverImageUrl: string;
  coverImageAiHint?: string;
  mapIconUrl: string;
  mapIconAiHint?: string;
  courses?: CoursePresencial[];
}

const spaces: SpaceData[] = [
  {
    id: 'space1',
    name: 'Aula Central',
    address: 'Calle Principal 123',
    type: 'innovaula_rented',
    description: 'Espacio equipado con pizarras interactivas y proyector.',
    coverImageUrl: 'https://placehold.co/800x300.png',
    coverImageAiHint: 'aula moderna',
    mapIconUrl: 'https://placehold.co/40x40.png',
    mapIconAiHint: 'icono aula',
      courses: [
        {
          id: 'course1',
          title: 'Matemáticas Avanzadas',
          description: 'Curso presencial de matemáticas para nivel avanzado.',
          level: 'Avanzado',
          price: '$100',
          classDuration: '2h',
          sessions: [
            {
              id: 'session1',
              dateTime: new Date('2024-07-01T10:00:00'),
              duration: '2h',
              capacity: 20,
              enrolled: 5,
              status: 'Programada'
            }
          ]
        }
      ]
    }
  ];

export function getSpaceById(id: string): SpaceData | undefined {
  return spaces.find(s => s.id === id);
}

export function getCourseById(spaceId: string, courseId: string): CoursePresencial | undefined {
  const space = getSpaceById(spaceId);
  return space?.courses?.find(c => c.id === courseId);
}
