import Breadcrumb from '../ui/Breadcrumb';
import { cn } from '../../lib/cn';

export default function PageHeader({ title, description, breadcrumbs, actions, className }) {
  return (
    <div className={cn('mb-6 space-y-3 md:mb-8', className)}>
      {breadcrumbs?.length > 0 && <Breadcrumb items={breadcrumbs} />}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-content md:text-3xl">{title}</h1>
          {description && <p className="mt-1 max-w-2xl text-sm text-content-muted md:text-base">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  );
}
