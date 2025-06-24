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
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Artistly
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
              Empowering artists to showcase their creativity and connect with audiences through innovative digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-200 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <span className="text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors duration-200">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Follow us for updates and inspiration
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200/50 dark:border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 Artistly. All rights reserved. Made with ❤️ for artists.
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-400 dark:text-gray-500">
              <span>Version 2.0</span>
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