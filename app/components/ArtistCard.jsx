"use client"

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { MapPin, Star, Sparkles, ArrowRight } from 'lucide-react';

/**
 * Enhanced Artist Card component
 * @param {Object} props - Component props
 * @param {Object} props.artist - Artist data
 * @returns {JSX.Element} Artist card
 */
export default function ArtistCard({ artist }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
            className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500"
        >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Floating sparkle effect */}
            <motion.div
                className="absolute top-4 right-4 text-yellow-400 opacity-0 group-hover:opacity-100"
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Sparkles size={20} />
            </motion.div>

            {/* Image container with overlay effects */}
            <div className="relative h-56 overflow-hidden">
                <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Category badge */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-4 left-4"
                >
                    <div className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg">
                        <span className="text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {artist.category}
                        </span>
                    </div>
                </motion.div>

                {/* Rating stars */}
                <div className="absolute top-4 right-16 flex items-center gap-1 px-2 py-1 rounded-full bg-black/20 backdrop-blur-sm">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={12}
                            className={`${i <= [3, 4, 5][Math.floor(Math.random() * 3)] ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Content section */}
            <div className="relative p-6 space-y-4">
                {/* Artist name with gradient text */}
                <motion.h3
                    className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {artist.name}
                </motion.h3>

                {/* Info grid */}
                <div className="space-y-3">
                    {/* Price with emphasis */}
                    <motion.div
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <span className="text-sm text-gray-500 font-medium">Starting from</span>
                        <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            {artist.priceRange}
                        </span>
                    </motion.div>

                    {/* Location with icon */}
                    <motion.div
                        className="flex items-center gap-2 text-gray-600"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <MapPin size={16} className="text-blue-500" />
                        <span className="text-sm font-medium">{artist.location}</span>
                    </motion.div>
                </div>

                {/* Enhanced CTA button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="pt-4"
                >
                    <Button
                        onClick={() => console.log('Quote requested:', artist.id)}
                        className="group/btn w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                    >
                        <motion.div
                            className="flex items-center justify-center gap-2"
                            whileHover={{ x: -2 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <span>Request Quote</span>
                            <motion.div
                                animate={{ x: [0, 4, 0] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <ArrowRight size={16} />
                            </motion.div>
                        </motion.div>

                        {/* Button shine effect */}
                        <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    </Button>
                </motion.div>

                {/* Decorative bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600/50 via-purple-600/50 to-pink-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </motion.div>
    );
}