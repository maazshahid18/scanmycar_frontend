'use client';

import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4 px-6 relative z-50">
      
      {/* Flex Container for alignment */}
      <div className="flex justify-between items-center">
        
        <div className="flex items-center gap-4">
          {/* Hamburger Button (Visible on Mobile, Left side) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              // X Icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Logo */}
          <a href="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            ScanMyCar 🚗
          </a>
        </div>

        {/* Desktop Menu (Hidden on mobile, Visible on md+) */}
        <div className="hidden md:flex gap-6">
          <NavLinks />
        </div>
      </div>

      {/* Mobile Menu Dropdown (Visible only when isOpen is true) */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 md:hidden flex flex-col py-4 px-6 shadow-lg">
          <NavLinks mobile />
        </div>
      )}
    </nav>
  );
}

// Reusable component for links to avoid duplication
function NavLinks({ mobile = false }) {
  const baseClasses = "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors";
  const mobileClasses = mobile ? "py-2 block w-full" : "";

  return (
    <>
      <a href="/find" className={`${baseClasses} ${mobileClasses}`}>
        Find My QR
      </a>
      <a href="/register" className={`${baseClasses} ${mobileClasses}`}>
        Register
      </a>
      <a href="/dashboard" className={`${baseClasses} ${mobileClasses}`}>
        Dashboard
      </a>
    </>
  );
}