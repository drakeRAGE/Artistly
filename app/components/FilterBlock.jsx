"use client"

import { useState } from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Button } from './ui/button';

/**
 * Filter Block component
 * @param {Object} props - Component props
 * @param {Object} props.filters - Current filter values
 * @param {Function} props.setFilters - Function to update filters
 * @returns {JSX.Element} Filter block
 */
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
        <div className="mb-6">
            <Button
                variant="outline"
                className="md:hidden mb-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? 'Hide Filters' : 'Show Filters'}
            </Button>
            <div className={`${isOpen ? 'block' : 'hidden'} md:block space-y-4`}>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium">Category</label>
                    <Select
                        value={filters.category}
                        onValueChange={(value) => setFilters({ ...filters, category: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={"selected"}>All</SelectItem>
                            {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium">Location</label>
                    <Input
                        id="location"
                        value={filters.location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                        placeholder="Enter city"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Price Range</label>
                    <Slider
                        value={filters.priceRange}
                        onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                        min={0}
                        max={5000}
                        step={100}
                        className="mt-2"
                    />
                    <p className="text-sm mt-1">
                        ${filters.priceRange[0]} - ${filters.priceRange[1]}
                    </p>
                </div>
                <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                </Button>
            </div>
        </div>
    );
}