'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, Users, BookOpen, MessageSquare, TrendingUp, 
  Download, Filter
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from 'recharts';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker'; 
import { useToast } from "@/hooks/use-toast";

const mockIncomeData = [
  { month: "Ene", usd: 120 },
  { month: "Feb", usd: 180 },
  { month: "Mar", usd: 150 },
  { month: "Abr", usd: 220 },
  { month: "May", usd: 300 },
  { month: "Jun", usd: 250 },
];

const mockStudentActivityData = [
  { month: "Ene", newStudents: 10, activeStudents: 50 },
  { month: "Feb", newStudents: 15, activeStudents: 58 },
  { month: "Mar", newStudents: 12, activeStudents: 65 },
  { month: "Abr", newStudents: 20, activeStudents: 75 },
  { month: "May", newStudents: 18, activeStudents: 80 },
  { month: "Jun", newStudents: 25, activeStudents: 90 },
];

const mockCoursePerformanceData = [
    { name: "JavaScript Avanzado", students: 50, rating: 4.8, income: 500 },
    { name: "Diseño Web Básico", students: 75, rating: 4.5, income: 350 },
    { name: "Introducción a IA", students: 30, rating: 4.9, income: 600 },
];

const mockCommunityStatsData = [
    { metric: "Posts Creados", value: 25 },
    { metric: "Likes Recibidos", value: 1200 },
    { metric: "Comentarios", value: 350 },
    { metric: "Alcance Estimado", value: "15K" },
];

const incomeChartConfig: ChartConfig = {
  usd: {
    label: 'Ingresos (USD)',
    color: 'hsl(var(--chart-1))',
  },
};

const studentActivityChartConfig: ChartConfig = {
  newStudents: {
    label: "Nuevos Estudiantes",
    color: "hsl(var(--chart-3))",
  },
  activeStudents: {
    label: "Estudiantes Activos",
    color: "hsl(var(--chart-4))",
  },
};


export default function TeacherAnalyticsPage() {
  const [incomeChartData, setIncomeChartData] = React.useState<typeof mockIncomeData | null>(null);
  const [studentActivityChartData, setStudentActivityChartData] = React.useState<typeof mockStudentActivityData | null>(null);
  const { toast } = useToast();

  const [filterStartDate, setFilterStartDate] = React.useState<Date | undefined>(undefined);
  const [filterEndDate, setFilterEndDate] = React.useState<Date | undefined>(undefined);

  React.useEffect(() => {
    setIncomeChartData(mockIncomeData);
    setStudentActivityChartData(mockStudentActivityData);
  }, []);

  const handleApplyDateFilters = () => {
    if (!filterStartDate && !filterEndDate) {
        toast({
            title: "Fechas no seleccionadas",
            description: "Por favor, selecciona al menos una fecha de inicio o fin para filtrar.",
            variant: "destructive",
        });
        return;
    }
    console.log("Filtros de Fecha Aplicados:", {
        startDate: filterStartDate,
        endDate: filterEndDate,
    });
    toast({
        title: "Filtros de Fecha Aplicados (Simulación)",
        description: "Las analíticas se han actualizado con las nuevas fechas.",
    });
  };

  return (
    <div className="space-y-8 pt-8">
      <div className="flex flex-col sm:flex-row justify-end items-center gap-3 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="w-full sm:w-[180px]">
                <Label htmlFor="startDateAnalytics" className="sr-only">Fecha de Inicio</Label>
                <DatePicker date={filterStartDate} setDate={setFilterStartDate} placeholder="Fecha de Inicio" />
            </div>
            <div className="w-full sm:w-[180px]">
                <Label htmlFor="endDateAnalytics" className="sr-only">Fecha de Fin</Label>
                <DatePicker date={filterEndDate} setDate={setFilterEndDate} placeholder="Fecha de Fin" disabled={(date) => filterStartDate ? date < filterStartDate : false } />
            </div>
        </div>
        <Button onClick={handleApplyDateFilters} className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground">
            <Filter className="mr-2 h-4 w-4"/>Aplicar Fechas
        </Button>
        <Button variant="secondary" className="w-full sm:w-auto"><Download className="mr-2 h-4 w-4"/>Exportar</Button>
      </div>

      <Tabs defaultValue="income" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="income"><DollarSign className="mr-2 h-4 w-4"/>Ingresos</TabsTrigger>
          <TabsTrigger value="students"><Users className="mr-2 h-4 w-4"/>Estudiantes</TabsTrigger>
          <TabsTrigger value="courses"><BookOpen className="mr-2 h-4 w-4"/>Cursos y Contenido</TabsTrigger>
          <TabsTrigger value="community"><MessageSquare className="mr-2 h-4 w-4"/>Comunidad</TabsTrigger>
        </TabsList>

        <TabsContent value="income" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Resumen de Ingresos</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Card className="bg-muted/30">
                <CardHeader className="pb-2">
                  <CardDescription>Ingresos Totales (USD)</CardDescription>
                  <CardTitle className="text-3xl">$1,230.50</CardTitle>
                </CardHeader>
              </Card>
              <Card className="bg-muted/30">
                <CardHeader className="pb-2">
                  <CardDescription>Próximo Pago Estimado (USD)</CardDescription>
                  <CardTitle className="text-3xl">$350.00</CardTitle>
                </CardHeader>
              </Card>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
                <div>
                    <CardTitle className="font-headline text-xl">Flujo de Ingresos Mensual (USD)</CardTitle>
                    <CardDescription>Visualiza la evolución de tus ingresos.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
              {incomeChartData ? (
                <ChartContainer config={incomeChartConfig} className="aspect-video h-[350px] w-full">
                  <AreaChart data={incomeChartData} margin={{left: -20, right: 10, top: 5, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis 
                        tickLine={false} 
                        axisLine={false} 
                        tickMargin={8} 
                        tickFormatter={(value) => `$${value}`}
                    />
                    <ChartTooltip 
                        cursor={false} 
                        content={<ChartTooltipContent indicator="line" />} 
                    />
                    <Area
                      dataKey="usd"
                      type="natural"
                      fill="var(--color-usd)"
                      fillOpacity={0.3}
                      stroke="var(--color-usd)"
                      stackId="a"
                    />
                  </AreaChart>
                </ChartContainer>
              ) : (
                <div className="flex items-center justify-center h-[350px] text-muted-foreground">Cargando gráfico de ingresos...</div>
              )}
            </CardContent>
          </Card>
           <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-xl">Historial de Transacciones Recientes</CardTitle>
                <CardDescription>Un resumen de las últimas transacciones y pagos.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead className="text-right">Monto</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>2024-07-15</TableCell>
                            <TableCell>Venta Curso "JS Avanzado"</TableCell>
                            <TableCell><Badge variant="secondary">Curso</Badge></TableCell>
                            <TableCell className="text-right text-green-500">+$50.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2024-07-10</TableCell>
                            <TableCell>Retiro de Saldo</TableCell>
                            <TableCell><Badge variant="outline">Retiro</Badge></TableCell>
                            <TableCell className="text-right text-red-500">-$200.00</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>2024-07-05</TableCell>
                            <TableCell>SuperLike en Post Comunitario</TableCell>
                            <TableCell><Badge variant="default" className="bg-amber-500/80 text-white">Token</Badge></TableCell>
                            <TableCell className="text-right text-amber-600">+TOK 100</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                 <Button variant="link" className="mt-4 w-full">Ver Historial Completo</Button>
            </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Métricas Clave de Estudiantes</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Card className="bg-muted/30">
                        <CardHeader className="pb-2">
                            <CardDescription>Total Estudiantes Inscritos</CardDescription>
                            <CardTitle className="text-3xl">1250</CardTitle>
                        </CardHeader>
                    </Card>
                     <Card className="bg-muted/30">
                        <CardHeader className="pb-2">
                            <CardDescription>Nuevos Estudiantes (Últimos 30 días)</CardDescription>
                            <CardTitle className="text-3xl">78</CardTitle>
                        </CardHeader>
                    </Card>
                     <Card className="bg-muted/30">
                        <CardHeader className="pb-2">
                            <CardDescription>Tasa de Finalización Promedio</CardDescription>
                            <CardTitle className="text-3xl">85%</CardTitle>
                        </CardHeader>
                    </Card>
                </CardContent>
            </Card>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Actividad y Crecimiento de Estudiantes</CardTitle>
                    <CardDescription>Visualiza la evolución de nuevos y activos estudiantes.</CardDescription>
                </CardHeader>
                <CardContent>
                    {studentActivityChartData ? (
                        <ChartContainer config={studentActivityChartConfig} className="aspect-video h-[350px] w-full">
                            <LineChart data={studentActivityChartData} margin={{left: -20, right: 10, top: 5, bottom: 5}}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8}/>
                                <YAxis tickLine={false} axisLine={false} tickMargin={8}/>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />}/>
                                <Line type="monotone" dataKey="newStudents" stroke="var(--color-newStudents)" strokeWidth={3} dot={false} />
                                <Line type="monotone" dataKey="activeStudents" stroke="var(--color-activeStudents)" strokeWidth={3} dot={false} />
                            </LineChart>
                        </ChartContainer>
                    ) : (
                         <div className="flex items-center justify-center h-[350px] text-muted-foreground">Cargando gráfico de actividad estudiantil...</div>
                    )}
                </CardContent>
            </Card>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Detalle de Estudiantes por Curso</CardTitle>
                    <CardDescription>Lista de cursos con número de inscritos y tasa de aprobación.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Curso</TableHead>
                                <TableHead className="text-center">Inscritos</TableHead>
                                <TableHead className="text-center">Tasa Aprobación</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockCoursePerformanceData.map(course => (
                                <TableRow key={course.name}>
                                    <TableCell className="font-medium">{course.name}</TableCell>
                                    <TableCell className="text-center">{course.students}</TableCell>
                                    <TableCell className="text-center text-green-600">{(course.rating / 5 * 100 * 0.9).toFixed(0)}%</TableCell>
                                    <TableCell className="text-right"><Button variant="link" size="sm">Ver Detalles</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Rendimiento de Cursos y Contenido</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Título del Curso/Contenido</TableHead>
                                <TableHead className="text-center">Inscripciones/Vistas</TableHead>
                                <TableHead className="text-center">Valoración Media</TableHead>
                                <TableHead className="text-right">Ingresos Generados (USD)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {mockCoursePerformanceData.map(course => (
                                <TableRow key={course.name}>
                                    <TableCell className="font-medium">{course.name}</TableCell>
                                    <TableCell className="text-center">{course.students}</TableCell>
                                    <TableCell className="text-center">{course.rating}/5</TableCell>
                                    <TableCell className="text-right">${course.income.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Popularidad del Contenido Interactivo (Módulos)</CardTitle>
                     <CardDescription>Visualiza qué módulos son los más utilizados.</CardDescription>
                </CardHeader>
                 <CardContent className="h-[300px]">
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        <TrendingUp className="h-10 w-10 mr-2"/> Gráfico de popularidad de módulos próximamente.
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Interacción en la Comunidad</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                     {mockCommunityStatsData.map(stat => (
                        <Card key={stat.metric} className="bg-muted/30">
                            <CardHeader className="pb-2">
                                <CardDescription>{stat.metric}</CardDescription>
                                <CardTitle className="text-3xl">{stat.value}</CardTitle>
                            </CardHeader>
                        </Card>
                     ))}
                </CardContent>
            </Card>
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Posts Comunitarios Más Populares</CardTitle>
                    <CardDescription>Tus publicaciones con mayor interacción.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Título del Post</TableHead>
                                <TableHead className="text-center">Vistas</TableHead>
                                <TableHead className="text-center">Likes</TableHead>
                                <TableHead className="text-center">Comentarios</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Mi Resumen del Ciclo del Agua</TableCell>
                                <TableCell className="text-center">1.2K</TableCell>
                                <TableCell className="text-center">152</TableCell>
                                <TableCell className="text-center">18</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Explorando la Superposición Cuántica</TableCell>
                                <TableCell className="text-center">850</TableCell>
                                <TableCell className="text-center">98</TableCell>
                                <TableCell className="text-center">32</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Button variant="link" className="mt-4 w-full" asChild>
                        <Link href="/my-community-content">Ver Todos Mis Posts</Link>
                    </Button>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
