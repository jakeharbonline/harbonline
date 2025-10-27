interface SectionProps {
  children: React.ReactNode;
  background?: 'primary' | 'secondary' | 'gradient';
  spacing?: 'tight' | 'normal' | 'loose';
  id?: string;
  className?: string;
}

export function Section({
  children,
  background = 'primary',
  spacing = 'normal',
  id,
  className = '',
}: SectionProps) {
  const backgroundStyles = {
    primary: 'bg-bg-primary',
    secondary: 'bg-bg-secondary',
    gradient: 'bg-gradient-to-b from-bg-primary to-bg-secondary',
  };

  const spacingStyles = {
    tight: 'py-12 md:py-16',
    normal: 'py-12 md:py-20',
    loose: 'py-16 md:py-24 lg:py-32',
  };

  return (
    <section
      id={id}
      className={`${backgroundStyles[background]} ${spacingStyles[spacing]} ${className} relative`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">{children}</div>
    </section>
  );
}
