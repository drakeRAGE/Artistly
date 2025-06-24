"use client"

import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * Category Card component
 * @param {Object} props - Component props
 * @param {Object} props.category - Category data
 * @returns {JSX.Element} Category card
 */
export default function CategoryCard({ category }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
        >
            <Image
                src={category.image}
                alt={category.name}
                width={300}
                height={200}
                className="w-full h-40 object-cover"
                loading="lazy"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
                <a
                    href={`/artist-listing?category=${category.name}`}
                    className="mt-2 inline-block text-blue-600 hover:underline"
                >
                    View Artists
                </a>
            </div>
        </motion.div>
    );
}