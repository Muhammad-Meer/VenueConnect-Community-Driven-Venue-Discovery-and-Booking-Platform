import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Star, Users, Trees } from 'lucide-react'
import type { Venue } from '@/data/mockData'
import { formatCurrency } from '@/lib/format'
import { iconSize } from '@/theme'
import { Badge } from '@/components/ui'

export default function VenueCard({ venue }: { venue: Venue }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group card-surface overflow-hidden hover:shadow-card-hover hover:border-primary-200 transition-all duration-normal"
    >
      <Link to={`/venues/${venue.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          <img
            src={venue.image}
            alt={venue.name}
            className="h-full w-full object-cover transition-transform duration-slow group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            {venue.featured && <Badge variant="primary">Featured</Badge>}
            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
              {venue.category}
            </Badge>
          </div>
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-white/95 backdrop-blur-sm px-2 py-1 text-caption font-semibold text-primary shadow-sm">
            <Star size={iconSize.xs} className="fill-warning text-warning" />
            {venue.rating}
            <span className="font-normal text-muted">({venue.reviewCount})</span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-body font-semibold text-primary tracking-tight group-hover:text-primary-600 transition-colors truncate">
            {venue.name}
          </h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-small text-muted">
            <MapPin size={iconSize.xs} className="shrink-0" />
            <span className="truncate">
              {venue.location}, {venue.city}
            </span>
          </p>

          <div className="mt-4 flex items-center gap-4 text-caption text-muted">
            <span className="inline-flex items-center gap-1">
              <Users size={iconSize.xs} /> {venue.capacity}
            </span>
            {venue.acres != null && (
              <span className="inline-flex items-center gap-1">
                <Trees size={iconSize.xs} /> {venue.acres} acres
              </span>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-divider flex items-end justify-between">
            <div>
              <p className="text-caption text-muted">From</p>
              <p className="text-body font-bold text-primary">
                {formatCurrency(venue.price)}
                <span className="text-caption font-normal text-muted"> / day</span>
              </p>
            </div>
            <span className="text-small font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              View details →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
