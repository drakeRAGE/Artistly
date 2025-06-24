'use client';

import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import ArtistCard from '../components/ArtistCard';
import FilterBlock from '../components/FilterBlock';
import { ThemeContext } from '../components/context/ThemeContext.js';

export default function ClientArtistListing({ artists }) {
  const { theme } = useContext(ThemeContext);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    priceRange: [0, 5000],
  });

  const filteredArtists = (artists ?? []).filter((artist) => {
    const [minPrice, maxPrice] = filters.priceRange;
    const artistPrice = parseInt(artist.priceRange.split('–')[0].replace('$', ''));
    return (
      (!filters.category || artist.category === filters.category) &&
      (!filters.location || artist.location.includes(filters.location)) &&
      artistPrice >= minPrice &&
      artistPrice <= maxPrice
    );
  });


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-6">Browse Artists</h1>
      <FilterBlock filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtists.length > 0 ? (
          filteredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))
        ) : (
          <p className="text-center col-span-full">No artists found.</p>
        )}
      </div>
    </motion.div>
  );
}
