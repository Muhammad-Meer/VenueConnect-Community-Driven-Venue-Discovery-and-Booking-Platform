import { cn } from '../../lib/cn';

export function Card({ className, children, hover, ...props }) {
  return (
    <div
      className={cn(
        'card-surface',
        hover && 'transition hover:-translate-y-0.5 hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return <div className={cn('border-b border-border px-5 py-4', className)}>{children}</div>;
}

export function CardTitle({ className, children }) {
  return <h3 className={cn('text-base font-semibold text-content', className)}>{children}</h3>;
}

export function CardDescription({ className, children }) {
  return <p className={cn('mt-1 text-sm text-content-muted', className)}>{children}</p>;
}

export function CardContent({ className, children }) {
  return <div className={cn('p-5', className)}>{children}</div>;
}

export function CardFooter({ className, children }) {
  return <div className={cn('border-t border-border px-5 py-4', className)}>{children}</div>;
}

export default Card;
