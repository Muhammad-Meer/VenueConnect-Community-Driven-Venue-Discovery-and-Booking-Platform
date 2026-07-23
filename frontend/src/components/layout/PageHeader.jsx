import { cn } from '../../lib/cn'
import Breadcrumb from '../ui/Breadcrumb'

function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
  children,
}) {
  return (
    <div className={cn('mb-8', className)}>
      {breadcrumbs?.length > 0 && (
        <Breadcrumb items={breadcrumbs} className="mb-3" />
      )}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">
            {title}
          </h1>
          {description && (
            <p className="mt-1.5 text-sm md:text-base text-neutral-500 max-w-2xl">
              {description}
            </p>
          )}
          {children}
        </div>

        {actions && (
          <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>
        )}
      </div>
    </div>
  )
}

export default PageHeader
