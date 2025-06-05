import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UploadCloud, FileText, Video, BookOpen, Search, Filter, Edit3, Trash2, PlusCircle } from 'lucide-react';
import Link from 'next/link';

// Mock data for content
const mockContent = [
  { id: 'cnt1', name: 'Fundamentos de Álgebra.pdf', type: 'Documento', classroom: 'Matemáticas 9º Grado', size: '2.5MB', lastUpdated: '2024-07-20', status: 'Publicado' },
  { id: 'cnt2', name: 'Serie de Clases de Cálculo - Parte 1.mp4', type: 'Video', classroom: '10º Grado - Matemáticas Avanzadas', size: '150MB', lastUpdated: '2024-07-18', status: 'Publicado' },
  { id: 'cnt3', name: 'Simulación Interactiva de Física: Fuerzas', type: 'Módulo', classroom: 'AP Física C: Mecánica', size: 'N/A', lastUpdated: '2024-07-15', status: 'Borrador' },
  { id: 'cnt4', name: 'Guía de Análisis de Poesía.docx', type: 'Documento', classroom: 'Taller de Escritura Creativa - Otoño 2024', size: '800KB', lastUpdated: '2024-07-10', status: 'Publicado' },
];

export default function TeacherContentPage() {
  return (
    <div className="space-y-8 pt-8">
      <div className="flex justify-end mb-6">
        <Button className="bg-primary hover:bg-primary/80 text-primary-foreground">
          <UploadCloud className="mr-2 h-5 w-5" /> Subir Nuevo Contenido
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-grow max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar contenido por nombre o aula..." className="pl-10" />
                </div>
                <div className="flex gap-2 flex-wrap">
                    <Select>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filtrar por Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos los Tipos</SelectItem>
                            <SelectItem value="document">Documento</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="module">Módulo Interactivo</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filtrar por Aula" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas las Aulas</SelectItem>
                            {/* Populate with actual classrooms */}
                            <SelectItem value="g9math">Matemáticas 9º Grado</SelectItem>
                            <SelectItem value="g10advmath">10º Grado - Matemáticas Avanzadas</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline"><Filter className="mr-2 h-4 w-4" />Aplicar Filtros</Button>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          {mockContent.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Aula Asociada</TableHead>
                  <TableHead>Tamaño / Duración</TableHead>
                  <TableHead>Última Actualización</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockContent.map(item => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell>
                      {item.type === 'Documento' && <FileText className="h-5 w-5 text-primary" />}
                      {item.type === 'Video' && <Video className="h-5 w-5 text-primary" />}
                      {item.type === 'Módulo' && <BookOpen className="h-5 w-5 text-primary" />}
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell className="text-muted-foreground">{item.classroom}</TableCell>
                    <TableCell className="text-muted-foreground">{item.size}</TableCell>
                    <TableCell className="text-muted-foreground">{new Date(item.lastUpdated).toLocaleDateString('es-ES')}</TableCell>
                    <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'Publicado' ? 'bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'}`}>
                            {item.status}
                        </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit3 className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <UploadCloud className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl font-semibold text-muted-foreground mb-2">Tu biblioteca de contenido está vacía.</p>
              <p className="text-sm text-muted-foreground mb-6">Sube documentos, videos o crea módulos interactivos para compartir con tus estudiantes.</p>
              <Button size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground">
                <PlusCircle className="mr-2 h-5 w-5" /> Agrega tu Primer Contenido
              </Button>
            </div>
          )}
        </CardContent>
         {mockContent.length > 0 && (
            <CardFooter className="justify-end">
                <p className="text-sm text-muted-foreground">Mostrando {mockContent.length} elementos</p>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
