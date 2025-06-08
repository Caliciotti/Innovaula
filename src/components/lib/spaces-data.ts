'use client'; // Add use client if using new Date() directly in data for components

export interface SessionData {
  id: string;
  dateTime: Date;
  duration: string;
  capacity: number;
  enrolled: number;
  status?: 'Programada' | 'Confirmada' | 'Cancelada';
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
  description: string;
  type: string;
  coverImageUrl: string;
  coverImageAiHint: string;
  mapIconUrl: string;
  mapIconAiHint: string;
  courses: CoursePresencial[];
}

// Note: Using new Date(Date.now() + ...) can cause hydration issues if not careful.
// For mock data in server components, these will resolve at build/request time.
// If this file is used by client components directly, `new Date()` parts might need useEffect.
export const mockSpacesData: SpaceData[] = [
  {
    id: 'space1',
    name: 'Estudio Creativo de Ana',
    address: 'Calle Falsa 123, Ciudad Ejemplo',
    description: 'Un espacio acogedor y bien iluminado, perfecto para talleres de arte y diseño. Equipado con mesas amplias y buena luz natural.',
    type: 'home',
    coverImageUrl: 'https://placehold.co/800x300.png',
    coverImageAiHint: 'estudio arte luminoso',
    mapIconUrl: 'https://placehold.co/50x50.png',
    mapIconAiHint: 'pincel icono',
    courses: [
      {
        id: 'course1-1',
        title: 'Taller de Acuarela para Principiantes',
        description: 'Aprende las técnicas básicas de la acuarela en un ambiente relajado.',
        level: 'Principiante',
        price: '$50 por sesión',
        classDuration: '2 horas',
        sessions: [
          { id: 's1-1-1', dateTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), duration: '2 horas', capacity: 10, enrolled: 3, status: 'Programada' },
          { id: 's1-1-2', dateTime: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), duration: '2 horas', capacity: 10, enrolled: 0, status: 'Confirmada' },
        ]
      },
      {
        id: 'course1-2',
        title: 'Dibujo de Retrato: Fundamentos',
        description: 'Explora cómo capturar la esencia de un rostro.',
        level: 'Intermedio',
        price: '$60 por sesión',
        classDuration: '2.5 horas',
        sessions: [
           { id: 's1-2-1', dateTime: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000), duration: '2.5 horas', capacity: 8, enrolled: 5, status: 'Programada' },
        ]
      },
    ]
  },
  {
    id: 'space2',
    name: 'Rincón de Ciencias de Carlos',
    address: 'Avenida Siempre Viva 742, Ciudad Ejemplo',
    description: 'Pequeño laboratorio casero ideal para tutorías de física y química para grupos reducidos. Cuenta con material básico de experimentación.',
    type: 'home',
    coverImageUrl: 'https://placehold.co/800x300.png',
    coverImageAiHint: 'laboratorio casero',
    mapIconUrl: 'https://placehold.co/50x50.png',
    mapIconAiHint: 'átomo icono',
    courses: [
      {
        id: 'course2-1',
        title: 'Tutoría de Física Preuniversitaria',
        description: 'Refuerzo en mecánica y termodinámica.',
        level: 'Avanzado',
        price: '$40 por hora',
        classDuration: '1 hora',
        sessions: []
      },
    ]
  },
];

export const getSpaceById = (id: string): SpaceData | undefined => {
  return mockSpacesData.find(s => s.id === id);
};

export const getCourseById = (spaceId: string, courseId: string): CoursePresencial | undefined => {
  const space = getSpaceById(spaceId);
  return space?.courses.find(c => c.id === courseId);
};

