"use client"

import { useContext } from 'react';
import { Button } from './ui/button';
import { ThemeContext } from '../components/context/ThemeContext';

/**
 * Theme Toggle component
 * @returns {JSX.Element} Theme toggle button
 */
export default function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Button
            variant="ghost"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </Button>
    );
}