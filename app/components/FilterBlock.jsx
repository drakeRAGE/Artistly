'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { SlidersHorizontal } from 'lucide-react';

export default function FilterBlock({ filters, setFilters }) {
    const [isOpen, setIsOpen] = useState(false);

    const categories = ['Singer', 'Dancer', 'DJ', 'Speaker'];

    const resetFilters = () => {
        setFilters({
            category: '',
            location: '',
            priceRange: [0, 5000],
        });
    };

    return (
        <div className="w-full">
            {/* Toggle button for mobile */}
            <div className="md:hidden mb-4 flex justify-end">
                <Button
                    variant="outline"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    {isOpen ? 'Hide Filters' : 'Show Filters'}
                </Button>
            </div>

            {/* Filters section */}
            <div
                className={`transition-all duration-300 ${isOpen ? 'block' : 'hidden'
                    } md:block`}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Category
                        </label>
                        <Select
                            value={filters.category}
                            onValueChange={(value) =>
                                setFilters({ ...filters, category: value })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Location
                        </label>
                        <Input
                            value={filters.location}
                            onChange={(e) =>
                                setFilters({ ...filters, location: e.target.value })
                            }
                            placeholder="Enter city"
                        />
                    </div>

                    {/* Price Range */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Price Range
                        </label>
                        <div className="px-1">
                            <Slider
                                value={filters.priceRange}
                                onValueChange={(value) =>
                                    setFilters({ ...filters, priceRange: value })
                                }
                                min={0}
                                max={5000}
                                step={100}
                            />
                            <div className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                                ${filters.priceRange[0]} - ${filters.priceRange[1]}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reset Button */}
                <div className="mt-4 flex justify-end">
                    <Button
                        variant="ghost"
                        className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600"
                        onClick={resetFilters}
                    >
                        Reset Filters
                    </Button>
                </div>
            </div>
        </div>
    );
}
