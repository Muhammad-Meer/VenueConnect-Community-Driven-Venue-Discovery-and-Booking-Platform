import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Select from '../../components/ui/Select';
import Checkbox from '../../components/ui/Checkbox';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { venueSchema } from '../../schemas/venue';
import { AMENITIES, CITIES, WORKSPACE_TYPES } from '../../constants/venues';
import { createVenue, fetchVenueById, updateVenue } from '../../store/slices/venueSlice';
import { useToast } from '../../components/ui/Toast';

export default function VenueForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const current = useSelector((s) => s.venue.current);
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState(['']);

  const form = useForm({
    resolver: zodResolver(venueSchema),
    defaultValues: {
      name: '',
      description: '',
      address: '',
      city: '',
      neighborhood: '',
      capacity: 10,
      pricePerHour: 50,
      workspaceType: 'meeting_room',
      amenities: [],
      images: [],
      floorPlan: '',
    },
  });

  useEffect(() => {
    if (isEdit) dispatch(fetchVenueById(id));
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isEdit && current?._id === id) {
      form.reset({
        name: current.name || '',
        description: current.description || '',
        address: current.address || '',
        city: current.city || '',
        neighborhood: current.neighborhood || '',
        capacity: current.capacity || 10,
        pricePerHour: current.pricePerHour || 50,
        workspaceType: current.workspaceType || 'meeting_room',
        amenities: current.amenities || [],
        images: current.images || [],
        floorPlan: current.floorPlan || '',
      });
      setAmenities(current.amenities || []);
      setImages(current.images?.length ? current.images : ['']);
    }
  }, [current, form, id, isEdit]);

  const toggleAmenity = (value) => {
    setAmenities((prev) => (prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]));
  };

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      amenities,
      images: images.filter(Boolean),
      location: values.lat && values.lng ? { type: 'Point', coordinates: [Number(values.lng), Number(values.lat)] } : undefined,
    };
    const result = isEdit
      ? await dispatch(updateVenue({ id, payload }))
      : await dispatch(createVenue(payload));
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success(isEdit ? 'Venue updated' : 'Venue created');
      navigate('/owner/venues');
    } else {
      toast.error('Save failed', result.payload);
    }
  };

  return (
    <div>
      <PageHeader
        title={isEdit ? 'Edit venue' : 'Add venue'}
        description="Configure spaces, gallery, amenities, pricing, and location."
      />
      <form className="grid gap-6 xl:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Basics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input label="Name" error={form.formState.errors.name?.message} {...form.register('name')} />
            <Textarea label="Description" error={form.formState.errors.description?.message} {...form.register('description')} />
            <Input label="Address" error={form.formState.errors.address?.message} {...form.register('address')} />
            <div className="grid grid-cols-2 gap-3">
              <Select label="City" options={CITIES} error={form.formState.errors.city?.message} {...form.register('city')} />
              <Input label="Neighborhood" {...form.register('neighborhood')} />
            </div>
            <Select label="Workspace type" options={WORKSPACE_TYPES} placeholder={null} {...form.register('workspaceType')} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Capacity" type="number" error={form.formState.errors.capacity?.message} {...form.register('capacity')} />
              <Input label="Price / hour" type="number" error={form.formState.errors.pricePerHour?.message} {...form.register('pricePerHour')} />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gallery upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {images.map((img, idx) => (
                <Input
                  key={idx}
                  label={`Image URL ${idx + 1}`}
                  value={img}
                  onChange={(e) => {
                    const next = [...images];
                    next[idx] = e.target.value;
                    setImages(next);
                  }}
                  placeholder="https://…"
                />
              ))}
              <Button type="button" variant="outline" onClick={() => setImages((p) => [...p, ''])}>
                Add image field
              </Button>
              <Input label="Floor plan URL" {...form.register('floorPlan')} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-2">
              {AMENITIES.map((a) => (
                <Checkbox
                  key={a.value}
                  label={a.label}
                  checked={amenities.includes(a.value)}
                  onChange={() => toggleAmenity(a.value)}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-2">
          <Button type="submit">{isEdit ? 'Save changes' : 'Create venue'}</Button>
        </div>
      </form>
    </div>
  );
}
