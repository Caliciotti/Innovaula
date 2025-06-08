export function AppFooter() {
  return (
    <footer className="bg-card border-t border-border py-6 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} InnovAula. Todos los derechos reservados.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Revolucionando la educación con IA.
        </p>
      </div>
    </footer>
  );
}
