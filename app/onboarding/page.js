"use client"

import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { submitArtist } from '../utils/api';
import { ThemeContext } from '../components/context/ThemeContext';

// Form validation schema
const schema = Yup.object({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  bio: Yup.string().max(500, 'Bio must be 500 characters or less').required('Bio is required'),
  categories: Yup.array().min(1, 'Select at least one category').required('Category is required'),
  languages: Yup.array().min(1, 'Select at least one language').required('Language is required'),
  feeRange: Yup.string().required('Fee range is required'),
  location: Yup.string().min(2, 'Location must be at least 2 characters').required('Location is required'),
  image: Yup.mixed().nullable().test('fileSize', 'Image must be less than 5MB', (value) => !value || value.size <= 5000000),
});

/**
 * Artist Onboarding Form Page
 * @returns {JSX.Element} Onboarding form
 */
export default function Onboarding() {
  const { theme } = useContext(ThemeContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      categories: [],
      languages: [],
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await submitArtist(data);
      setSuccess(true);
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-2xl"
    >
      <h1 className="text-3xl font-bold mb-6">Onboard Your Artist</h1>
      {success ? (
        <p className="text-green-600">Artist submitted successfully!</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <Input id="name" {...register('name')} aria-label="Artist name" />
            {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium">Bio</label>
            <Textarea id="bio" {...register('bio')} aria-label="Artist bio" />
            {errors.bio && <p className="text-red-600 text-sm">{errors.bio.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Categories</label>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  {['Singer', 'Dancer', 'DJ', 'Speaker'].map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={field.value.includes(category)}
                        onCheckedChange={(checked) => {
                          field.onChange(
                            checked
                              ? [...field.value, category]
                              : field.value.filter((c) => c !== category)
                          );
                        }}
                      />
                      <label htmlFor={`category-${category}`} className="ml-2">{category}</label>
                    </div>
                  ))}
                </div>
              )}
            />
            {errors.categories && <p className="text-red-600 text-sm">{errors.categories.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Languages</label>
            <Controller
              name="languages"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  {['English', 'Spanish', 'French', 'Hindi'].map((language) => (
                    <div key={language} className="flex items-center">
                      <Checkbox
                        id={`language-${language}`}
                        checked={field.value.includes(language)}
                        onCheckedChange={(checked) => {
                          field.onChange(
                            checked
                              ? [...field.value, language]
                              : field.value.filter((l) => l !== language)
                          );
                        }}
                      />
                      <label htmlFor={`language-${language}`} className="ml-2">{language}</label>
                    </div>
                  ))}
                </div>
              )}
            />
            {errors.languages && <p className="text-red-600 text-sm">{errors.languages.message}</p>}
          </div>

          <div>
            <label htmlFor="feeRange" className="block text-sm font-medium">Fee Range</label>
            <Controller
              name="feeRange"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fee range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$0–$500">$0–$500</SelectItem>
                    <SelectItem value="$500–$1000">$500–$1000</SelectItem>
                    <SelectItem value="$1000+">$1000+</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.feeRange && <p className="text-red-600 text-sm">{errors.feeRange.message}</p>}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium">Profile Image (Optional)</label>
            <Input id="image" type="file" accept=".jpg,.png" {...register('image')} />
            {errors.image && <p className="text-red-600 text-sm">{errors.image.message}</p>}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium">Location</label>
            <Input id="location" {...register('location')} aria-label="Artist location" />
            {errors.location && <p className="text-red-600 text-sm">{errors.location.message}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      )}
    </motion.div>
  );
}