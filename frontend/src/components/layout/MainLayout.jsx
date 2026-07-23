import { cn } from '../../lib/cn'
import Header from './Header'
import Footer from './Footer'

function MainLayout({
  children,
  user,
  onLogout,
  showFooter = true,
  className,
  contentClassName,
}) {
  return (
    <div className={cn('min-h-screen flex flex-col bg-white', className)}>
      <Header user={user} onLogout={onLogout} />
      <main className={cn('flex-1', contentClassName)}>{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}

export default MainLayout
