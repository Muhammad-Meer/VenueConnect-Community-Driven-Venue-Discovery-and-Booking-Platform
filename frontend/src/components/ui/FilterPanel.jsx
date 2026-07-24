import { cn } from '../../lib/cn';
import Checkbox from './Checkbox';
import Select from './Select';
import Switch from './Switch';
import Button from './Button';
import { AMENITIES, BUDGET_RANGES, TEAM_SIZES, WORKSPACE_TYPES, CITIES } from '../../constants/venues';

export default function FilterPanel({ filters, onChange, onReset, className, compact = false }) {
  const set = (key, value) => onChange?.({ ...filters, [key]: value });

  const toggleAmenity = (value) => {
    const current = filters.amenities || [];
    const next = current.includes(value)
      ? current.filter((a) => a !== value)
      : [...current, value];
    set('amenities', next);
  };

  return (
    <div className={cn('space-y-5', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-content">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>

      <Select
        label="City"
        value={filters.city || ''}
        onChange={(e) => set('city', e.target.value)}
        options={CITIES}
        placeholder="Any city"
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-content">Neighborhood</label>
        <input
          className="input-base"
          value={filters.neighborhood || ''}
          onChange={(e) => set('neighborhood', e.target.value)}
          placeholder="e.g. SoHo"
        />
      </div>

      <Select
        label="Budget"
        value={filters.budget || ''}
        onChange={(e) => set('budget', e.target.value)}
        options={BUDGET_RANGES}
        placeholder="Any budget"
      />

      <Select
        label="Team size"
        value={filters.teamSize || ''}
        onChange={(e) => set('teamSize', e.target.value)}
        options={TEAM_SIZES}
        placeholder="Any size"
      />

      <Select
        label="Workspace type"
        value={filters.workspaceType || ''}
        onChange={(e) => set('workspaceType', e.target.value)}
        options={WORKSPACE_TYPES}
        placeholder="Any type"
      />

      {!compact && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-content">Amenities</p>
          <div className="space-y-2">
            {AMENITIES.map((a) => (
              <Checkbox
                key={a.value}
                label={a.label}
                checked={(filters.amenities || []).includes(a.value)}
                onChange={() => toggleAmenity(a.value)}
              />
            ))}
          </div>
        </div>
      )}

      <Switch
        label="Verified only"
        checked={Boolean(filters.verifiedOnly)}
        onChange={(e) => set('verifiedOnly', e.target.checked)}
      />

      <Select
        label="Sort by"
        value={filters.sortBy || 'featured'}
        onChange={(e) => set('sortBy', e.target.value)}
        options={[
          { value: 'featured', label: 'Featured' },
          { value: 'rating', label: 'Top rated' },
          { value: 'price_asc', label: 'Price: low to high' },
          { value: 'price_desc', label: 'Price: high to low' },
          { value: 'capacity', label: 'Largest capacity' },
          { value: 'newest', label: 'Newest' },
        ]}
        placeholder={null}
      />
    </div>
  );
}
