import { useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../lib/cn'
import Button from './Button'

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-5xl',
}

function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  className,
  showClose = true,
  closeOnOverlay = true,
}) {
  const titleId = useId()

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-modal flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-neutral-900/50 backdrop-blur-[2px] animate-fade-in"
        onClick={closeOnOverlay ? onClose : undefined}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={cn(
          'relative w-full bg-white shadow-xl animate-scale-in',
          'rounded-t-2xl sm:rounded-2xl max-h-[92vh] flex flex-col',
          sizes[size] || sizes.md,
          className,
        )}
      >
        {(title || showClose) && (
          <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-3 sm:px-6 sm:pt-6">
            <div className="min-w-0">
              {title && (
                <h2
                  id={titleId}
                  className="text-lg font-semibold text-neutral-900 tracking-tight"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-neutral-500">{description}</p>
              )}
            </div>

            {showClose && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onClose}
                aria-label="Close dialog"
                className="shrink-0 text-neutral-400 hover:text-neutral-700"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            )}
          </div>
        )}

        <div className="px-5 sm:px-6 pb-5 sm:pb-6 overflow-y-auto scrollbar-thin flex-1">
          {children}
        </div>

        {footer && (
          <div className="px-5 sm:px-6 py-4 border-t border-neutral-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 bg-neutral-50/80 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}

export default Modal
