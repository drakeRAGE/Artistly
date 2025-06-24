
// Enhanced CategoryCard Component
"use client"

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

/**
 * Enhanced Category Card component with modern professional design
 * @param {Object} props - Component props
 * @param {Object} props.category - Category data
 * @returns {JSX.Element} Category card
 */
export default function CategoryCard({ category }) {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 hover:shadow-2xl hover:shadow-gray-300/50 dark:hover:shadow-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-500"
        >
            {/* Image Container with Overlay */}
            <div className="relative overflow-hidden">
                <Image
                    src={category.image}
                    alt={category.name}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Floating Badge */}
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        Premium
                    </span>
                </div>

                {/* Hover Action Button */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 relative">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-2xl" />

                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {category.name}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                        {category.description}
                    </p>

                    {/* CTA Link */}
                    <a
                        href={`/artist-listing?category=${category.name}`}
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 font-semibold text-sm group/link transition-all duration-300"
                    >
                        <span>View Artists</span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                    </a>

                    {/* Bottom Border Animation */}
                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-0 group-hover:w-full transition-all duration-500 ease-out" />
                </div>
            </div>

            {/* Card Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/5 group-hover:via-purple-600/5 group-hover:to-pink-600/5 transition-all duration-500 pointer-events-none" />
        </motion.div>
    );
}