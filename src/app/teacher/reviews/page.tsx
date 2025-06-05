import { PageTitle } from '@/components/shared/PageTitle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, MessageSquare, TrendingUp, UserCircle } from 'lucide-react';

// Mock data for reviews (ratings out of 10)
const mockReviews = [
  { id: 'r1', studentName: 'Alicia W.', courseName: 'Desarrollo Web Avanzado', rating: 10, comment: '¡La Dra. Reed es una instructora increíble! El curso fue desafiante pero increíblemente gratificante. Explicaciones claras y excelentes proyectos.', date: '2024-07-20' },
  { id: 'r2', studentName: 'Roberto T.', courseName: 'Introducción a la Computación Cuántica', rating: 8, comment: 'Materia compleja, pero el Prof. Finch la hizo lo más accesible posible. Apreciaría más ejemplos del mundo real.', date: '2024-07-18' },
  { id: 'r3', studentName: 'Carlos B.', courseName: 'Desarrollo Web Avanzado', rating: 10, comment: 'Me encantó el enfoque práctico. Las secciones de Node.js fueron particularmente útiles para mi carrera.', date: '2024-07-15' },
  { id: 'r4', studentName: 'Diana P.', courseName: 'Taller de Escritura Creativa', rating: 6, comment: 'El taller fue divertido, pero sentí que el feedback sobre las tareas podría haber sido más detallado. Sin embargo, el instructor fue atractivo.', date: '2024-07-12' },
];

const averageRating = mockReviews.length > 0 ? (mockReviews.reduce((acc, r) => acc + r.rating, 0) / mockReviews.length).toFixed(1) : "0.0";

export default function TeacherReviewsPage() {
  return (
    <div className="space-y-8">
      <PageTitle title="Reseñas y Feedback de Estudiantes" description="Comprende las perspectivas de los estudiantes para mejorar tu enseñanza." />

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Valoración Media</CardTitle>
            <Star className="h-5 w-5 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-headline text-primary">{averageRating} <span className="text-2xl text-muted-foreground">/ 10</span></div>
            <p className="text-xs text-muted-foreground">Basado en {mockReviews.length} reseñas</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Reseñas</CardTitle>
            <MessageSquare className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-headline">{mockReviews.length}</div>
            <p className="text-xs text-muted-foreground">En todos los cursos</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tendencia del Feedback</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-headline">Positiva</div>
            <p className="text-xs text-muted-foreground">+5% desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Reseñas Detalladas</CardTitle>
          <CardDescription>Lee lo que dicen tus estudiantes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {mockReviews.length > 0 ? (
            mockReviews.map(review => (
              <Card key={review.id} className="bg-muted/30">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <UserCircle className="h-6 w-6 mr-2 text-primary" /> {review.studentName}
                      </CardTitle>
                      <CardDescription className="text-xs">en <span className="font-medium text-foreground">{review.courseName}</span> - {new Date(review.date).toLocaleDateString('es-ES')}</CardDescription>
                    </div>
                    <div className="flex items-center mt-1 text-amber-400">
                       <Star className="h-5 w-5 fill-current mr-1" />
                       <span className="font-semibold">{review.rating} / 10</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{review.comment}"</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-8">Aún no se han recibido reseñas.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
