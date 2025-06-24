"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, Palette } from "lucide-react";
import { usePathname } from "next/navigation";
/**
 * Enhanced Footer component with modern professional design
 * @returns {JSX.Element} Footer
 */
export default function Footer() {
  const footerLinks = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/support", label: "Support" },
  ];

  const socialLinks = [
    { href: "#", label: "Twitter", icon: "𝕏" },
    { href: "#", label: "Instagram", icon: "📷" },
    { href: "#", label: "LinkedIn", icon: "💼" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200/50 dark:border-gray-800/50">
      <div className="container mx-auto px-6 py-12">

        {/* Bottom Bar */}
        <div className="border-t border-gray-200/50 dark:border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 Artistly. All rights reserved. Made with ❤️ for artists.
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-400 dark:text-gray-500">
              <span>Version 1.0</span>
              <span>•</span>
              <span>Last updated: June 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
    </footer>
  );
}