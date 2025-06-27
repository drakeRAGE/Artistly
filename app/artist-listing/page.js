'use client';

import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, Grid3X3, List,
  Users, MapPin, DollarSign, Sparkles, SlidersHorizontal, TrendingUp
} from 'lucide-react';

import ArtistCard from '../components/ArtistCard';
import { ThemeContext } from '../components/context/ThemeContext.js';
import { fetchArtists } from '../utils/api';

export default function ClientArtistListing() {
  const { theme } = useContext(ThemeContext);

  const [artists, setArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating'
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    priceRange: [0, 100000],
  });

  useEffect(() => {
    async function loadArtists() {
      const data = await fetchArtists();
      setArtists(data || []);
      console.log("Fetched:", data);
    }
    loadArtists();
  }, []);

  const filteredArtists = (artists ?? []).filter((artist) => {
    const [minPrice, maxPrice] = filters.priceRange;

    const artistPrice = parseInt(
      artist.priceRange?.split('-')[0]?.replace(/[^\d]/g, '') || '0',
      10
    );

    const matchesSearch =
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !filters.category ||
      artist.category.toLowerCase() === filters.category.toLowerCase();

    const matchesLocation =
      !filters.location ||
      artist.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchesPrice = artistPrice >= minPrice && artistPrice <= maxPrice;

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  const sortedArtists = [...filteredArtists].sort((a, b) => {
    const priceA = parseInt(a.priceRange?.split('-')[0]?.replace(/[^\d]/g, '') || '0', 10);
    const priceB = parseInt(b.priceRange?.split('-')[0]?.replace(/[^\d]/g, '') || '0', 10);

    switch (sortBy) {
      case 'price-low':
        return priceA - priceB;
      case 'price-high':
        return priceB - priceA;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const stats = [
    { 
      icon: Users, 
      value: filteredArtists.length, 
      label: 'Artists Available',
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30'
    },
    {
      icon: MapPin,
      value: [...new Set(filteredArtists.map((a) => a.location))].length,
      label: 'Locations',
      gradient: 'from-violet-500 to-purple-600',
      bgGradient: 'from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30'
    },
    {
      icon: DollarSign,
      value:
        filteredArtists.length > 0
          ? `₹${Math.min(
              ...filteredArtists.map((a) =>
                parseInt(a.priceRange?.split('-')[0]?.replace(/[^\d]/g, '') || '0', 10)
              )
            )}+`
          : '₹0',
      label: 'Starting From',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Hero Header with Enhanced Stats */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        {/* Glassmorphism Header Background */}
        <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-emerald-600/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-emerald-400/10" />
          
          <div className="container mx-auto px-6 py-12 relative">
            {/* Main Title Section */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/20 dark:to-purple-400/20 backdrop-blur-sm rounded-full border border-blue-200/50 dark:border-blue-700/50 mb-6"
              >
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Premium Artist Directory
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6 leading-tight"
              >
                Discover
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  Amazing Artists
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Connect with talented creators and bring your vision to life with our curated collection of professional artists
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-12 relative">
        
        {/* Enhanced Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl shadow-black/5 dark:shadow-black/20">
            {/* Search Bar */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <div className="relative flex-1 group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                  <input
                    type="text"
                    placeholder="Search artists by name, category, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-700/80 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 backdrop-blur-sm text-lg"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                    showFilters
                      ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white shadow-blue-500/30 hover:shadow-blue-500/50'
                      : 'bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 border border-gray-200/50 dark:border-gray-600/50'
                  }`}
                >
                  <SlidersHorizontal className={`w-5 h-5 ${showFilters ? 'animate-pulse' : ''}`} />
                  Advanced Filters
                  {showFilters && (
                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                  )}
                </motion.button>
                
                <div className="relative group">
                  <motion.select
                    whileHover={{ scale: 1.02 }}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-6 py-4 pr-12 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 text-gray-900 dark:text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer min-w-[200px]"
                  >
                    <option value="featured">✨ Featured Artists</option>
                    <option value="price-low">Budget Friendly</option>
                    <option value="price-high">Premium Artists</option>
                    <option value="rating">Top Rated</option>
                  </motion.select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <TrendingUp className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors duration-200" />
                  </div>
                </div>
                
                <div className="flex bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-2 shadow-lg border border-gray-200/50 dark:border-gray-600/50">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Enhanced Results Summary */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 dark:from-blue-400/20 dark:via-purple-400/20 dark:to-blue-400/20 px-6 py-3 rounded-full border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-sm"
                >
                  <span className="text-blue-700 dark:text-blue-300 font-bold text-lg">
                    {sortedArtists.length} artist{sortedArtists.length !== 1 ? 's' : ''} found
                  </span>
                </motion.div>
                {searchQuery && (
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 dark:from-emerald-400/20 dark:via-teal-400/20 dark:to-emerald-400/20 px-6 py-3 rounded-full border border-emerald-200/50 dark:border-emerald-700/50 backdrop-blur-sm"
                  >
                    <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
                      for &quot;<span className="font-bold">{searchQuery}</span>&quot;
                    </span>
                  </motion.div>
                )}
                {(filters.category || filters.location || filters.priceRange[1] < 100000) && (
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 dark:from-orange-400/20 dark:via-red-400/20 dark:to-orange-400/20 px-6 py-3 rounded-full border border-orange-200/50 dark:border-orange-700/50 backdrop-blur-sm"
                  >
                    <span className="text-orange-700 dark:text-orange-300 font-medium">
                      🔥 Filtered Results
                    </span>
                  </motion.div>
                )}
              </div>
              {sortedArtists.length > 0 && (
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="bg-gradient-to-r from-gray-100 to-white dark:from-gray-800 dark:to-gray-700 px-4 py-2 rounded-xl border border-gray-200/50 dark:border-gray-600/50"
                >
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Sorted by <span className="text-gray-800 dark:text-gray-200 font-bold">{sortBy.replace('-', ' ')}</span>
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="mb-10 overflow-hidden"
            >
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/20 shadow-2xl shadow-black/5 dark:shadow-black/20 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                    <Filter className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Advanced Filters
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Category Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </label>
                    <div className="relative group">
                      <select
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        className="w-full appearance-none px-5 py-4 pr-12 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 text-gray-900 dark:text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                      >
                        <option value="">🎭 All Categories</option>
                        <option value="singer">🎤 Singer</option>
                        <option value="dancer">💃 Dancer</option>
                        <option value="dj">🎧 DJ</option>
                        <option value="speaker">🎙️ Speaker</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-500 group-hover:border-t-blue-500 transition-colors duration-200"></div>
                      </div>
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search location..."
                        value={filters.location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value.toLowerCase() })}
                        className="w-full pl-12 pr-5 py-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                      />
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Price Range
                    </label>
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="5000"
                          value={filters.priceRange[1]}
                          onChange={(e) => setFilters({ 
                            ...filters, 
                            priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
                          })}
                          className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg appearance-none cursor-pointer slider-thumb"
                          style={{
                            background: `linear-gradient(to right, #3b82f6 0%, #8b5cf6 ${(filters.priceRange[1] / 100000) * 100}%, #e5e7eb ${(filters.priceRange[1] / 100000) * 100}%, #e5e7eb 100%)`
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200/50 dark:border-emerald-700/50 rounded-xl">
                          
                          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                            ₹0
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200/50 dark:border-blue-700/50 rounded-xl">
                          
                          <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                            ₹{filters.priceRange[1].toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter Actions */}
                <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredArtists.length} results with current filters
                  </div>
                  <button
                    onClick={() => setFilters({ category: '', location: '', priceRange: [0, 100000] })}
                    className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Artists Grid/List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`${
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
              : 'space-y-8'
          }`}
        >
          <AnimatePresence mode="wait">
            {sortedArtists.length > 0 ? (
              sortedArtists.map((artist, index) => (
                <motion.div
                  key={artist.id}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05,
                    ease: 'easeOut'
                  }}
                  className="group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className={`relative ${viewMode === 'list' ? 'min-h-[200px]' : ''}`}>
                      <ArtistCard artist={artist} viewMode={viewMode} />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="col-span-full flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="relative mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center shadow-2xl">
                    <Search className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce" />
                </div>
                
                <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
                  No artists found
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
                  We could not find any artists matching your criteria. Try adjusting your search or filters to discover more talent.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({ category: '', location: '', priceRange: [0, 100000] });
                  }}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 bg-size-200 hover:bg-pos-100"
                  style={{ backgroundSize: '200% 100%' }}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                    Clear All Filters
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Load More Button */}
        {sortedArtists.length > 12 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center mt-16"
          >
            <button className="group relative px-12 py-5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-2 border-gray-200/50 dark:border-gray-700/50 rounded-2xl font-bold text-gray-700 dark:text-gray-300 hover:border-blue-400/50 dark:hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-3 text-lg">
                <TrendingUp className="w-5 h-5 group-hover:animate-bounce" />
                Load More Artists
              </span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}