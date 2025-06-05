'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Video, Clock, PlusCircle, Edit, Timer, ListTodo, Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, type CalendarProps } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { isSameDay, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from "@/lib/utils";

// Base classNames copiadas de ui/calendar.tsx y simplificadas donde sea necesario para SSR
const calendarBaseClassNames: CalendarProps['classNames'] = {
  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
  month: "space-y-4",
  caption: "flex justify-center pt-1 relative items-center",
  caption_label: "text-sm font-medium",
  nav: "space-x-1 flex items-center",
  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground",
  nav_button_previous: "absolute left-1",
  nav_button_next: "absolute right-1",
  table: "w-full border-collapse space-y-1",
  head_row: "flex",
  head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
  row: "flex w-full mt-2",
  cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
  day_outside: "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
  day_disabled: "text-muted-foreground opacity-50",
  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
  day_hidden: "invisible",
  day_range_end: "day-range-end",
  day_selected: "day-selected-custom", 
  day_today: "day-today-custom", 
};


const createEventDate = (dayOffset: number, hour: number, minute: number) => {
  const baseDate = new Date(); 
  const targetDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + dayOffset);
  targetDate.setHours(hour, minute, 0, 0);
  return targetDate;
};

const upcomingLearningEventsRaw = [
  { id: 'learn1', courseTitle: 'Desarrollo Web Avanzado', lessonTitle: 'Módulo 3: Backend con Node.js y Express', dayOffset: 2, hour: 10, minute: 0, duration: '2 horas', type: 'Clase en Vivo Estudiante', isLearning: true },
  { id: 'learn2', courseTitle: 'Introducción a la Computación Cuántica', lessonTitle: 'Qubits y Superposición', dayOffset: 0, hour: new Date().getHours() + 2, minute: 0, duration: '1.5 horas', type: 'Sesión 1 a 1 Estudiante', isLearning: true },
  { id: 'learn3', courseTitle: 'Marketing Digital Esencial', lessonTitle: 'Análisis de Métricas y KPIs', dayOffset: 5, hour: 14, minute: 0, duration: '1 hora', type: 'Clase en Vivo Estudiante', isLearning: true },
  { id: 'learn4', courseTitle: 'Historia del Arte Moderno', lessonTitle: 'Impresionismo y Postimpresionismo', dayOffset: 8, hour: 11, minute: 0, duration: '1 hora', type: 'Clase Grabada Estudiante', isLearning: true },
  { id: 'learn5', courseTitle: 'Club de Debate Filosófico', lessonTitle: 'Existencialismo vs. Estoicismo', dayOffset: 1, hour: 16, minute: 0, duration: '1 hora', type: 'Debate Estudiante', isLearning: true },
  { id: 'learn6', courseTitle: 'Python para Principiantes', lessonTitle: 'Introducción a Bucles', dayOffset: 10, hour: 18, minute: 0, duration: '1 hora', type: 'Clase en Vivo Estudiante', isLearning: true },
];

const upcomingTeachingEventsRaw = [
 { id: 'teach1', title: 'Matemáticas 10º Grado - Intro Cálculo', classroom: '10º Grado - Matemáticas Avanzadas', dayOffset: 1, hour: 9, minute: 0, duration: '1 hora', type: 'Clase en Vivo Profesor', isTeaching: true },
 { id: 'teach2', title: 'AP Física - Horas de Consulta', classroom: 'AP Física C: Mecánica', dayOffset: 3, hour: 15, minute: 0, duration: '45 mins', type: 'Sesión de Preguntas Profesor', isTeaching: true },
 { id: 'teach3', title: 'Taller de Programación Python', classroom: 'Club de Código Vespertino', dayOffset: 6, hour: 17, minute: 0, duration: '2 horas', type: 'Taller Profesor', isTeaching: true },
 { id: 'teach4', title: 'Revisión Examen Final - Química Orgánica', classroom: 'Química Avanzada', dayOffset: 9, hour: 13, minute: 0, duration: '1.5 horas', type: 'Clase de Repaso Profesor', isTeaching: true },
 { id: 'teach7', title: 'Consultas Proyecto Final Web', classroom: 'Desarrollo Web Avanzado', dayOffset: 2, hour: 14, minute: 0, duration: '1 hora', type: 'Sesión de Preguntas Profesor', isTeaching: true },
 { id: 'teach8', title: 'Introducción a la Edición de Video', classroom: 'Club Multimedia', dayOffset: 11, hour: 10, minute: 0, duration: '2 horas', type: 'Taller Profesor', isTeaching: true },
];

const pastEventsRaw = [
 // Learning
 { id: 'past1', courseTitle: 'Taller de Escritura Creativa', lessonTitle: 'Desarrollo de Personajes', dayOffset: -3, hour:10, minute:0, duration: '2 horas', type: 'Taller Estudiante', courseId: 'courseXYZ', isLearning: true },
 { id: 'pastL2', courseTitle: 'Python Básico', lessonTitle: 'Variables y Tipos de Datos', dayOffset: -5, hour:14, minute:0, duration: '1 hora', type: 'Clase Grabada Estudiante', courseId: 'py101', isLearning: true },
 { id: 'pastL3', courseTitle: 'Diseño UX', lessonTitle: 'Introducción a Figma', dayOffset: -10, hour:11, minute:0, duration: '1.5 horas', type: 'Clase en Vivo Estudiante', courseId: 'uxIntro', isLearning: true },
 { id: 'pastL4', courseTitle: 'Marketing Digital', lessonTitle: 'SEO On-Page', dayOffset: -12, hour:9, minute:0, duration: '1 hora', type: 'Clase Grabada Estudiante', courseId: 'mk101', isLearning: true },
 { id: 'pastL5', courseTitle: 'Historia Universal', lessonTitle: 'La Revolución Francesa', dayOffset: -15, hour:10, minute:0, duration: '2 horas', type: 'Clase en Vivo Estudiante', courseId: 'histU', isLearning: true },

 // Teaching
 { id: 'past2', title: 'Revisión de Álgebra Lineal', classroom: '10º Grado - Matemáticas Avanzadas', dayOffset: -7, hour:10, minute:0, duration: '1 hora', type: 'Clase Grabada Profesor', isTeaching: true },
 { id: 'pastT2', title: 'Consulta Física Mecánica', classroom: 'AP Física C: Mecánica', dayOffset: -4, hour:15, minute:0, duration: '45 mins', type: 'Sesión de Preguntas Profesor', isTeaching: true },
 { id: 'pastT3', title: 'Seminario de Filosofía', classroom: 'Club de Debate', dayOffset: -8, hour:16, minute:0, duration: '1 hora', type: 'Taller Profesor', isTeaching: true },
 { id: 'pastT4', title: 'Introducción a la Química Orgánica', classroom: 'Química Avanzada', dayOffset: -15, hour:13, minute:0, duration: '1.5 horas', type: 'Clase de Repaso Profesor', isTeaching: true },
 { id: 'pastT5', title: 'Taller de Oratoria', classroom: 'Habilidades Blandas', dayOffset: -20, hour:17, minute:0, duration: '2 horas', type: 'Taller Profesor', isTeaching: true },
];


interface UnifiedEvent {
  id: string;
  title: string;
  description: string;
  dateTime: Date;
  duration: string;
  type: string;
  isLearning?: boolean;
  isTeaching?: boolean;
  courseId?: string;
  actionButton?: React.ReactNode;
  viewRecordingButton?: React.ReactNode;
}

const processRawEvents = (rawLearning: any[], rawTeaching: any[], rawPast: any[]): UnifiedEvent[] => {
  const learningUpcoming: UnifiedEvent[] = rawLearning.map(e => {
    let eventDateTime;
    if (e.id === 'learn2') { 
        const todayForDynamic = new Date();
        eventDateTime = new Date(todayForDynamic.getFullYear(), todayForDynamic.getMonth(), todayForDynamic.getDate() + e.dayOffset, e.hour, e.minute);
    } else {
        eventDateTime = createEventDate(e.dayOffset, e.hour, e.minute);
    }
    return {
        id: e.id,
        title: e.lessonTitle,
        description: e.courseTitle,
        dateTime: eventDateTime,
        duration: e.duration,
        type: e.type,
        isLearning: true,
        actionButton: <Button size="sm" className="bg-primary hover:bg-primary/80 text-primary-foreground"><Video className="mr-2 h-4 w-4" /> Unirse</Button>
    };
  });

  const teachingUpcoming: UnifiedEvent[] = rawTeaching.map(e => ({
    id: e.id,
    title: e.title,
    description: e.classroom,
    dateTime: createEventDate(e.dayOffset, e.hour, e.minute),
    duration: e.duration,
    type: e.type,
    isTeaching: true,
    actionButton: (
      <div className="flex gap-2 w-full sm:w-auto">
        <Button variant="outline" size="sm" className="flex-1 sm:flex-none"><Edit className="mr-2 h-4 w-4" /> Editar</Button>
        <Button size="sm" className="flex-1 sm:flex-none bg-accent hover:bg-accent/80 text-accent-foreground"><Video className="mr-2 h-4 w-4" /> Iniciar</Button>
      </div>
    )
  }));

  const pastProcessed: UnifiedEvent[] = rawPast.map(e => ({
    id: e.id,
    title: e.lessonTitle || e.title || 'Evento Pasado',
    description: e.courseTitle || e.classroom || '',
    dateTime: createEventDate(e.dayOffset, e.hour, e.minute),
    duration: e.duration,
    type: e.type,
    isLearning: e.isLearning,
    isTeaching: e.isTeaching,
    courseId: e.courseId,
    viewRecordingButton: <Button variant="outline" size="sm" className="w-full sm:w-auto">Ver Grabación</Button>
  }));

  return [...learningUpcoming, ...teachingUpcoming, ...pastProcessed];
};


export default function UnifiedSchedulePage() {
  const [isClient, setIsClient] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>(undefined);
  const [displayedMonth, setDisplayedMonth] = React.useState<Date | undefined>(undefined);
  
  const [allEvents, setAllEvents] = React.useState<UnifiedEvent[]>([]);
  const [clientDaysWithLearningActivity, setClientDaysWithLearningActivity] = React.useState<Date[]>([]);
  const [clientDaysWithTeachingActivity, setClientDaysWithTeachingActivity] = React.useState<Date[]>([]);
  
  const [nextUpcomingEventDetails, setNextUpcomingEventDetails] = React.useState<UnifiedEvent | null>(null);
  const [countdown, setCountdown] = React.useState<string>("Cargando...");
  const [upcomingEventsCount, setUpcomingEventsCount] = React.useState<number>(0);

  const [eventsForSelectedDay, setEventsForSelectedDay] = React.useState<UnifiedEvent[]>([]);
  const [isEventModalOpen, setIsEventModalOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<'student' | 'teacher'>('student');
  
  const [isAllLearningModalOpen, setIsAllLearningModalOpen] = React.useState(false);
  const [allLearningSearchTerm, setAllLearningSearchTerm] = React.useState('');
  const [isAllTeachingModalOpen, setIsAllTeachingModalOpen] = React.useState(false);
  const [allTeachingSearchTerm, setAllTeachingSearchTerm] = React.useState('');

  const [isAllPastLearningModalOpen, setIsAllPastLearningModalOpen] = React.useState(false);
  const [allPastLearningSearchTerm, setAllPastLearningSearchTerm] = React.useState('');
  const [isAllPastTeachingModalOpen, setIsAllPastTeachingModalOpen] = React.useState(false);
  const [allPastTeachingSearchTerm, setAllPastTeachingSearchTerm] = React.useState('');


  const eventDialogDescriptionId = "event-dialog-description-schedule";


  React.useEffect(() => {
    setIsClient(true);
    setSelectedDay(new Date()); 
    setDisplayedMonth(new Date());
    setAllEvents(processRawEvents(upcomingLearningEventsRaw, upcomingTeachingEventsRaw, pastEventsRaw));
  }, []);

  React.useEffect(() => {
    if (isClient && allEvents.length > 0) {
        const learningEventsDates = allEvents.filter(event => event.isLearning).map(event => event.dateTime);
        const teachingEventsDates = allEvents.filter(event => event.isTeaching).map(event => event.dateTime);
        
        setClientDaysWithLearningActivity(learningEventsDates);
        setClientDaysWithTeachingActivity(teachingEventsDates);

        const relevantEventsForRole = allEvents.filter(event => {
            if (selectedRole === 'student' && event.isLearning) return true;
            if (selectedRole === 'teacher' && event.isTeaching) return true;
            return false;
        });

        const upcomingForRole = relevantEventsForRole
            .filter(event => event.dateTime >= new Date())
            .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
        
        setUpcomingEventsCount(upcomingForRole.length);
        setNextUpcomingEventDetails(upcomingForRole[0] || null);
    }
  }, [allEvents, isClient, selectedRole]);


  React.useEffect(() => {
    if (!isClient || !nextUpcomingEventDetails) {
        setCountdown(isClient ? "No hay eventos próximos." : "Cargando...");
        return;
    }
    const calculateTimeLeft = () => {
        if (!nextUpcomingEventDetails?.dateTime) return "Calculando...";
        const difference = +new Date(nextUpcomingEventDetails.dateTime) - +new Date();
        if (difference <= 0) return "¡Ahora!";
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        let parts = [];
        if (days > 0) parts.push(`${days}d`);
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}m`);
        if (days === 0 && hours === 0 && minutes < 30) parts.push(`${seconds}s`);
        return parts.length > 0 ? parts.join(' ') : "Pronto";
    };
    const timerId = setInterval(() => setCountdown(calculateTimeLeft()), 1000);
    setCountdown(calculateTimeLeft()); 
    return () => clearInterval(timerId);
  }, [nextUpcomingEventDetails, isClient]);

  const getDayClasses = React.useCallback((date: Date): string => {
    let dayClasses = 'rdp-button h-9 w-9 p-0 font-normal aria-selected:opacity-100';
    if (isClient) {
      const isLearningEventDay = clientDaysWithLearningActivity.some(eventDate => isSameDay(date, eventDate));
      const isTeachingEventDay = clientDaysWithTeachingActivity.some(eventDate => isSameDay(date, eventDate));
      
      if (selectedRole === 'student' && isLearningEventDay) {
        dayClasses = cn(dayClasses, 'day-learning-event-indicator');
      }
      if (selectedRole === 'teacher' && isTeachingEventDay) {
        dayClasses = cn(dayClasses, 'day-teaching-event-indicator');
      }
    }
    return dayClasses;
  }, [isClient, selectedRole, clientDaysWithLearningActivity, clientDaysWithTeachingActivity]);
  
  const handleDayClick = (day: Date) => {
    if (!isClient) return;
    const eventsOnDay = allEvents.filter(event => {
      const isSame = isSameDay(event.dateTime, day);
      if (!isSame) return false;
      if (selectedRole === 'student') return !!event.isLearning;
      if (selectedRole === 'teacher') return !!event.isTeaching;
      return false; 
    });
    setSelectedDay(day);
    setEventsForSelectedDay(eventsOnDay.sort((a,b) => a.dateTime.getTime() - b.dateTime.getTime()));
    setIsEventModalOpen(true); 
  };
  
  const currentClassNames: CalendarProps['classNames'] = React.useMemo(() => ({
    ...calendarBaseClassNames,
    day: getDayClasses, 
    day_selected: "day-selected-custom",
    day_today: "day-today-custom",
  }), [getDayClasses]);
  
  const modifiers: CalendarProps['modifiers'] = React.useMemo(() => ({
    today: isClient ? new Date() : undefined,
  }), [isClient]);

  const modifiersClassNames: CalendarProps['modifiersClassNames'] = React.useMemo(() => ({
     today: 'day-today-custom',
  }), []);

  const upcomingLearningEvents = allEvents.filter(e => e.isLearning && e.dateTime >= new Date()).sort((a,b) => a.dateTime.getTime() - b.dateTime.getTime());
  const upcomingTeachingEvents = allEvents.filter(e => e.isTeaching && e.dateTime >= new Date()).sort((a,b) => a.dateTime.getTime() - b.dateTime.getTime());

  const pastLearningEvents = allEvents.filter(e => e.isLearning && e.dateTime < new Date() && !isSameDay(e.dateTime, new Date())).sort((a,b) => b.dateTime.getTime() - a.dateTime.getTime());
  const pastTeachingEvents = allEvents.filter(e => e.isTeaching && e.dateTime < new Date() && !isSameDay(e.dateTime, new Date())).sort((a,b) => b.dateTime.getTime() - a.dateTime.getTime());

  const filteredAllLearningEvents = upcomingLearningEvents.filter(event => 
    event.title.toLowerCase().includes(allLearningSearchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(allLearningSearchTerm.toLowerCase())
  );

  const filteredAllTeachingEvents = upcomingTeachingEvents.filter(event =>
    event.title.toLowerCase().includes(allTeachingSearchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(allTeachingSearchTerm.toLowerCase())
  );

  const filteredAllPastLearningEvents = pastLearningEvents.filter(event => 
    event.title.toLowerCase().includes(allPastLearningSearchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(allPastLearningSearchTerm.toLowerCase())
  );

  const filteredAllPastTeachingEvents = pastTeachingEvents.filter(event =>
    event.title.toLowerCase().includes(allPastTeachingSearchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(allPastTeachingSearchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-8 pt-8">
      <Card className="shadow-xl">
        <CardContent className="p-4 md:p-6">
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-1 space-y-4 order-2 lg:order-1">
              <CardHeader className="p-0 pb-2">
                <CardTitle className="font-headline text-xl">Resumen del Calendario</CardTitle>
              </CardHeader>
              <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as 'student' | 'teacher')} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="student">Estudiante</TabsTrigger>
                  <TabsTrigger value="teacher">Profesor</TabsTrigger>
                </TabsList>
              </Tabs>
              <Card className="shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-4">
                  <CardDescription className="text-xs uppercase font-semibold">Actividad Pendiente</CardDescription>
                  <ListTodo className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pb-3 px-4">
                  <div className="text-3xl font-bold">{upcomingEventsCount}</div>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-4">
                  <CardDescription className="text-xs uppercase font-semibold">Próximo Evento en</CardDescription>
                  <Timer className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pb-1 px-4">
                  <div className="text-3xl font-bold">{countdown}</div>
                </CardContent>
                {nextUpcomingEventDetails && (
                  <CardFooter className="flex flex-col items-start gap-2 pt-1 pb-3 px-4">
                    <p className="text-xs text-muted-foreground truncate w-full">
                      {nextUpcomingEventDetails.title} - {format(nextUpcomingEventDetails.dateTime, 'PPP p', { locale: es })}
                    </p>
                    <div className="w-full mt-1">
                    {selectedRole === 'teacher' ? (
                        <Button size="sm" className="w-full sm:w-auto bg-accent hover:bg-accent/80 text-accent-foreground">
                            <Video className="mr-2 h-4 w-4" /> Iniciar
                        </Button>
                      ) : (
                        <Button size="sm" className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground">
                            <Video className="mr-2 h-4 w-4" /> Unirse
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                )}
              </Card>
            </div>
            <div className={cn("lg:col-span-2 order-1 lg:order-2 flex justify-center")}>
            {isClient ? (
                <Calendar
                    mode="single"
                    selected={selectedDay}
                    onSelect={setSelectedDay}
                    onDayClick={handleDayClick}
                    month={displayedMonth}
                    onMonthChange={setDisplayedMonth}
                    className="rounded-md border p-0 sm:p-3"
                    classNames={currentClassNames} 
                    modifiers={modifiers} 
                    modifiersClassNames={modifiersClassNames}
                    locale={es}
                    disabled={!isClient} 
                />
              ) : (
                <div className="p-0 sm:p-3 border rounded-md min-h-[350px] w-full flex items-center justify-center bg-muted/20">
                  <p className="text-muted-foreground">Cargando calendario interactivo...</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {isEventModalOpen && selectedDay && (
        <Dialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
            <DialogContent 
                className="sm:max-w-lg" 
                aria-describedby={eventDialogDescriptionId}
            >
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl text-primary">
                        Eventos para el {format(selectedDay, 'PPP', { locale: es })}
                    </DialogTitle>
                    <DialogDescription id={eventDialogDescriptionId}> 
                        Lista de eventos programados ({selectedRole === 'student' ? 'Aprendizaje' : 'Enseñanza'}).
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                    {eventsForSelectedDay.length > 0 ? eventsForSelectedDay.map(event => (
                        <Card key={event.id} className={`bg-muted/30 ${event.isTeaching ? 'border-l-4 border-accent' : 'border-l-4 border-primary'}`}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">{event.title}</CardTitle>
                                <CardDescription>{event.description} - {event.type.replace('Estudiante','').replace('Profesor','').trim()}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-1">
                                <div className="text-sm text-muted-foreground">
                                    <p className="flex items-center"><Clock className="h-4 w-4 mr-1.5"/>{format(event.dateTime, 'p', { locale: es })} (Duración: {event.duration})</p>
                                </div>
                                {React.isValidElement(event.actionButton) ? React.cloneElement(event.actionButton as React.ReactElement<any>, { className: `${(event.actionButton as React.ReactElement<any>).props.className} w-full sm:w-auto` }) : 
                                 React.isValidElement(event.viewRecordingButton) ? React.cloneElement(event.viewRecordingButton as React.ReactElement<any>, { className: `${(event.viewRecordingButton as React.ReactElement<any>).props.className} w-full sm:w-auto` }) : null}

                            </CardContent>
                        </Card>
                    )) : (
                        <p className="text-muted-foreground">No hay eventos para este día que coincidan con el rol seleccionado.</p>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEventModalOpen(false)}>Cerrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      )}

      <Tabs defaultValue="learning" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="learning">Mis Clases (Aprendizaje)</TabsTrigger>
          <TabsTrigger value="teaching">Mis Eventos (Enseñanza)</TabsTrigger>
        </TabsList>

        <TabsContent value="learning" className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><CalendarDays className="mr-2 text-primary" />Próximas Clases</CardTitle>
            </CardHeader>
            <CardContent>
              {isClient && upcomingLearningEvents.length > 0 ? (
                <div className="space-y-6">
                  {upcomingLearningEvents.slice(0,3).map(item => (
                    <Card key={item.id} className="bg-muted/30 hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-headline">{item.title}</CardTitle>
                        <CardDescription>{item.description} - {item.type.replace('Estudiante', '').trim()}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                        <div className="space-y-1">
                            <div className="flex items-center text-muted-foreground">
                                <Clock className="h-4 w-4 mr-2"/>
                                {format(item.dateTime, 'PPP p', { locale: es })}
                            </div>
                            <p className="text-sm text-muted-foreground">Duración: {item.duration}</p>
                        </div>
                        {React.isValidElement(item.actionButton) ? React.cloneElement(item.actionButton as React.ReactElement<any>, { className: `${(item.actionButton as React.ReactElement<any>).props.className} w-full sm:w-auto` }) : null}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-6">{isClient ? "No tienes próximas clases." : "Cargando..."} <Link href="/courses" className="text-primary hover:underline">¡Explora cursos!</Link></p>
              )}
            </CardContent>
             {isClient && upcomingLearningEvents.length > 3 && (
                <CardFooter className="border-t pt-4">
                    <Button 
                        variant="outline" 
                        className="hover:bg-primary/80 hover:text-primary-foreground focus-visible:ring-primary"
                        onClick={() => setIsAllLearningModalOpen(true)}
                    >
                        <ListTodo className="mr-2 h-4 w-4" /> Ver Todas Mis Clases ({upcomingLearningEvents.length})
                    </Button>
                </CardFooter>
            )}
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Clases Pasadas</CardTitle>
            </CardHeader>
            <CardContent>
              {isClient && pastLearningEvents.length > 0 ? (
                <div className="space-y-4">
                  {pastLearningEvents.slice(0,3).map(item => (
                    <Card key={item.id} className="bg-muted/20">
                      <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description} - {format(item.dateTime, 'PPP', {locale: es})} - {item.type.replace('Estudiante', '').trim()}</p>
                        </div>
                        {React.isValidElement(item.viewRecordingButton) ? 
                          React.cloneElement(item.viewRecordingButton as React.ReactElement<any>, { 
                            className: cn((item.viewRecordingButton as React.ReactElement<any>).props.className, "hover:bg-primary/10 hover:text-primary focus-visible:ring-primary") 
                          }) 
                          : null}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-6">{isClient ? "No hay clases pasadas." : "Cargando..."}</p>
              )}
            </CardContent>
            {isClient && pastLearningEvents.length > 3 && (
                <CardFooter className="border-t pt-4">
                    <Button 
                        variant="outline" 
                        className="hover:bg-primary/10 hover:text-primary focus-visible:ring-primary"
                        onClick={() => setIsAllPastLearningModalOpen(true)}
                    >
                        <ListTodo className="mr-2 h-4 w-4" /> Ver Todas las Grabaciones ({pastLearningEvents.length})
                    </Button>
                </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="teaching" className="space-y-8">
           <Card className="shadow-lg">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="font-headline text-xl flex items-center"><CalendarDays className="mr-2 text-accent" />Próximos Eventos</CardTitle>
              <Button className="bg-accent hover:bg-accent/80 text-accent-foreground">
                <PlusCircle className="mr-2 h-5 w-5" /> Programar Nuevo Evento
              </Button>
            </CardHeader>
            <CardContent>
              {isClient && upcomingTeachingEvents.length > 0 ? (
                <div className="space-y-6">
                  {upcomingTeachingEvents.slice(0,3).map(item => (
                    <Card key={item.id} className="bg-muted/30 hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-headline">{item.title}</CardTitle>
                        <CardDescription>{item.description} - {item.type.replace('Profesor', '').trim()}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                         <div className="space-y-1">
                            <div className="flex items-center text-muted-foreground">
                                <Clock className="h-4 w-4 mr-2"/>
                                 {format(item.dateTime, 'PPP p', { locale: es })}
                            </div>
                            <p className="text-sm text-muted-foreground">Duración: {item.duration}</p>
                        </div>
                        {React.isValidElement(item.actionButton) ? React.cloneElement(item.actionButton as React.ReactElement<any>, { className: `${(item.actionButton as React.ReactElement<any>).props.className} w-full sm:w-auto` }) : null}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-6">{isClient ? "No tienes próximos eventos como profesor." : "Cargando..."} <Link href="#" className="text-accent hover:underline">¡Programa uno!</Link></p>
              )}
            </CardContent>
             {isClient && upcomingTeachingEvents.length > 3 && (
                <CardFooter className="border-t pt-4">
                    <Button 
                        variant="outline" 
                        className="hover:bg-accent/80 hover:text-accent-foreground focus-visible:ring-accent" 
                        onClick={() => setIsAllTeachingModalOpen(true)}
                    >
                        <ListTodo className="mr-2 h-4 w-4" /> Ver Todos Mis Eventos ({upcomingTeachingEvents.length})
                    </Button>
                </CardFooter>
            )}
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Eventos Pasados</CardTitle>
            </CardHeader>
            <CardContent>
              {isClient && pastTeachingEvents.length > 0 ? (
                <div className="space-y-4">
                  {pastTeachingEvents.slice(0,3).map(item => (
                    <Card key={item.id} className="bg-muted/20">
                      <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description} - {format(item.dateTime, 'PPP', {locale: es})} - {item.type.replace('Profesor', '').trim()}</p>
                        </div>
                         {React.isValidElement(item.viewRecordingButton) ? 
                           React.cloneElement(item.viewRecordingButton as React.ReactElement<any>, { 
                             className: cn((item.viewRecordingButton as React.ReactElement<any>).props.className, "hover:bg-accent/10 hover:text-accent focus-visible:ring-accent") 
                           }) 
                           : null}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-6">{isClient ? "No hay eventos pasados como profesor." : "Cargando..."}</p>
              )}
            </CardContent>
             {isClient && pastTeachingEvents.length > 3 && (
                <CardFooter className="border-t pt-4">
                    <Button 
                        variant="outline" 
                        className="hover:bg-accent/10 hover:text-accent focus-visible:ring-accent" 
                        onClick={() => setIsAllPastTeachingModalOpen(true)}
                    >
                        <ListTodo className="mr-2 h-4 w-4" /> Ver Todos los Eventos Pasados ({pastTeachingEvents.length})
                    </Button>
                </CardFooter>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal para Todas las Clases de Aprendizaje */}
      <Dialog open={isAllLearningModalOpen} onOpenChange={setIsAllLearningModalOpen}>
        <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
          <DialogHeader>
            <DialogTitle><span className="sr-only">Todas Mis Próximas Clases (Aprendizaje)</span></DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Buscar por título o curso..."
                    value={allLearningSearchTerm}
                    onChange={(e) => setAllLearningSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>
            <ScrollArea className="h-[calc(60vh-80px)] pr-3">
              {filteredAllLearningEvents.length > 0 ? (
                <div className="space-y-4">
                  {filteredAllLearningEvents.map(item => (
                     <Card key={item.id} className="bg-muted/30 hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-headline">{item.title}</CardTitle>
                            <CardDescription>{item.description} - {item.type.replace('Estudiante', '').trim()}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                            <div className="space-y-1">
                                <div className="flex items-center text-muted-foreground">
                                    <Clock className="h-4 w-4 mr-2"/>
                                    {format(item.dateTime, 'PPP p', { locale: es })}
                                </div>
                                <p className="text-sm text-muted-foreground">Duración: {item.duration}</p>
                            </div>
                            {React.isValidElement(item.actionButton) ? React.cloneElement(item.actionButton as React.ReactElement<any>, { className: `${(item.actionButton as React.ReactElement<any>).props.className} w-full sm:w-auto` }) : null}
                        </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-6">
                  {allLearningSearchTerm ? "No se encontraron clases que coincidan con tu búsqueda." : "No tienes próximas clases."}
                </p>
              )}
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAllLearningModalOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Todos los Eventos de Enseñanza */}
      <Dialog open={isAllTeachingModalOpen} onOpenChange={setIsAllTeachingModalOpen}>
        <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
           <DialogHeader>
            <DialogTitle><span className="sr-only">Todos Mis Próximos Eventos (Enseñanza)</span></DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
             <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Buscar por título o aula..."
                    value={allTeachingSearchTerm}
                    onChange={(e) => setAllTeachingSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>
            <ScrollArea className="h-[calc(60vh-80px)] pr-3">
              {filteredAllTeachingEvents.length > 0 ? (
                <div className="space-y-4">
                  {filteredAllTeachingEvents.map(item => (
                    <Card key={item.id} className="bg-muted/30 hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-headline">{item.title}</CardTitle>
                            <CardDescription>{item.description} - {item.type.replace('Profesor', '').trim()}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                            <div className="space-y-1">
                                <div className="flex items-center text-muted-foreground">
                                    <Clock className="h-4 w-4 mr-2"/>
                                    {format(item.dateTime, 'PPP p', { locale: es })}
                                </div>
                                <p className="text-sm text-muted-foreground">Duración: {item.duration}</p>
                            </div>
                            {React.isValidElement(item.actionButton) ? React.cloneElement(item.actionButton as React.ReactElement<any>, { className: `${(item.actionButton as React.ReactElement<any>).props.className} w-full sm:w-auto` }) : null}
                        </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                 <p className="text-muted-foreground text-center py-6">
                  {allTeachingSearchTerm ? "No se encontraron eventos que coincidan con tu búsqueda." : "No tienes próximos eventos como profesor."}
                </p>
              )}
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAllTeachingModalOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Todas las Clases Pasadas (Aprendizaje) */}
      <Dialog open={isAllPastLearningModalOpen} onOpenChange={setIsAllPastLearningModalOpen}>
        <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
          <DialogHeader>
            <DialogTitle><span className="sr-only">Todas Mis Clases Pasadas (Aprendizaje)</span></DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Buscar por título o curso..."
                    value={allPastLearningSearchTerm}
                    onChange={(e) => setAllPastLearningSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>
            <ScrollArea className="h-[calc(60vh-80px)] pr-3">
              {filteredAllPastLearningEvents.length > 0 ? (
                <div className="space-y-4">
                  {filteredAllPastLearningEvents.map(item => (
                     <Card key={item.id} className="bg-muted/20">
                      <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description} - {format(item.dateTime, 'PPP', {locale: es})} - {item.type.replace('Estudiante', '').trim()}</p>
                        </div>
                        {React.isValidElement(item.viewRecordingButton) ? 
                          React.cloneElement(item.viewRecordingButton as React.ReactElement<any>, { 
                            className: cn((item.viewRecordingButton as React.ReactElement<any>).props.className, "hover:bg-primary/10 hover:text-primary focus-visible:ring-primary") 
                          }) 
                          : null}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-6">
                  {allPastLearningSearchTerm ? "No se encontraron clases pasadas que coincidan con tu búsqueda." : "No hay clases pasadas."}
                </p>
              )}
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAllPastLearningModalOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Todos los Eventos Pasados (Enseñanza) */}
      <Dialog open={isAllPastTeachingModalOpen} onOpenChange={setIsAllPastTeachingModalOpen}>
        <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
           <DialogHeader>
            <DialogTitle><span className="sr-only">Todos Mis Eventos Pasados (Enseñanza)</span></DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
             <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Buscar por título o aula..."
                    value={allPastTeachingSearchTerm}
                    onChange={(e) => setAllPastTeachingSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>
            <ScrollArea className="h-[calc(60vh-80px)] pr-3">
              {filteredAllPastTeachingEvents.length > 0 ? (
                <div className="space-y-4">
                  {filteredAllPastTeachingEvents.map(item => (
                    <Card key={item.id} className="bg-muted/20">
                       <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description} - {format(item.dateTime, 'PPP', {locale: es})} - {item.type.replace('Profesor', '').trim()}</p>
                        </div>
                         {React.isValidElement(item.viewRecordingButton) ? 
                           React.cloneElement(item.viewRecordingButton as React.ReactElement<any>, { 
                             className: cn((item.viewRecordingButton as React.ReactElement<any>).props.className, "hover:bg-accent/10 hover:text-accent focus-visible:ring-accent") 
                           }) 
                           : null}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                 <p className="text-muted-foreground text-center py-6">
                  {allPastTeachingSearchTerm ? "No se encontraron eventos pasados que coincidan con tu búsqueda." : "No hay eventos pasados como profesor."}
                </p>
              )}
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAllPastTeachingModalOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
