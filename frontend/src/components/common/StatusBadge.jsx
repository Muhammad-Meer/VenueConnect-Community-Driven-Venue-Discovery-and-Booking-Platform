import Badge from '../ui/Badge'
import { bookingStatus } from '../../lib/designTokens'

/**
 * Maps booking/payment statuses to semantic Badge variants.
 */
function StatusBadge({ status, className, size = 'md' }) {
  const config = bookingStatus[status] || {
    label: status || 'Unknown',
    color: 'neutral',
  }

  const variantMap = {
    warning: 'warning',
    success: 'success',
    danger: 'danger',
    info: 'info',
    neutral: 'neutral',
  }

  return (
    <Badge
      variant={variantMap[config.color] || 'neutral'}
      size={size}
      dot
      className={className}
    >
      {config.label}
    </Badge>
  )
}

export default StatusBadge
