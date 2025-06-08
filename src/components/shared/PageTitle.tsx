type PageTitleProps = {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function PageTitle({ title, description, className, titleClassName, descriptionClassName }: PageTitleProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h1 className={`text-4xl font-headline font-bold text-primary ${titleClassName}`}>
        {title}
      </h1>
      {description && (
        <p className={`mt-2 text-lg text-muted-foreground ${descriptionClassName}`}>
          {description}
        </p>
      )}
    </div>
  );
}
