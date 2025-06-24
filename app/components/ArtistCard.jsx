"use client"

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

/**
 * Artist Card component
 * @param {Object} props - Component props
 * @param {Object} props.artist - Artist data
 * @returns {JSX.Element} Artist card
 */
export default function ArtistCard({ artist }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
        >
            <Image
                src={artist.image}
                alt={artist.name}
                width={300}
                height={200}
                className="w-full h-40 object-cover"
                loading="lazy"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{artist.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">Category: {artist.category}</p>
                <p className="text-gray-600 dark:text-gray-400">Price: {artist.priceRange}</p>
                <p className="text-gray-600 dark:text-gray-400">Location: {artist.location}</p>
                <Button
                    className="mt-2"
                    onClick={() => console.log('Quote requested:', artist.id)}
                >
                    Ask for Quote
                </Button>
            </div>
        </motion.div>
    );
}