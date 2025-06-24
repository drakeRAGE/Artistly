'use client'

import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard';

export default function HomeClient({ categories }) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Book Top Performing Artists for Your Events
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Connect with Singers, Dancers, DJs, and more on Artistly
        </p>
        <a
          href="/artist-listing"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
        >
          Explore Artists
        </a>
      </motion.section>

      {/* Category Cards */}
      <section className="py-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Explore Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
}
