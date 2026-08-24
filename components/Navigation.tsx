"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import LanguageToggle from "@/components/berlin/LanguageToggle";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  // The Hebrew/English switch is scoped to the Berlin guide, so only surface it
  // in the header on that route.
  const showLanguageToggle = pathname === "/berlin";

  const menuItems = [
    { name: "דף הבית", href: "/berlin" },
    { name: "אודות", href: "/about" },
    { name: "בלוג", href: "/blog" },
    { name: "גלריית תמונות", href: "/gallery/photos" },
    { name: "גלריית וידאו", href: "/gallery/videos" },
    { name: "המלצות", href: "/recommendations" },
    { name: "צור קשר", href: "/contact" },
    { name: "תפריט ראשי", href: "/" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-cream-50/95 shadow-sm backdrop-blur dark:bg-navy-800" dir="rtl" role="navigation" aria-label="ניווט ראשי">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Right side for RTL */}
          <div className="flex-shrink-0 order-2 md:order-1">
            <Link href="/" className="flex items-center" aria-label="Traveliga - חזרה לדף הבית">
              <Image
                src="/traveliga-mark.svg"
                alt=""
                width={44}
                height={44}
                priority
              />
              <span className="ms-3 text-xl font-bold text-navy-700 dark:text-cream-100">
                Traveliga
              </span>
            </Link>
          </div>

          {/* End cluster (left side for RTL): language switch + menu */}
          <div className="flex items-center gap-2 sm:gap-3 order-1 md:order-2">
            {showLanguageToggle && <LanguageToggle />}

            {/* Desktop Menu */}
            <div className="hidden md:flex md:gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-navy-600 dark:text-cream-200 hover:text-gold-700 dark:hover:text-gold-400 px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-navy-600 dark:text-cream-200 hover:text-gold-700 dark:hover:text-gold-400 p-2 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
                aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? (
                  <FaTimes className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <FaBars className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - RTL aligned */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-cream-50 dark:bg-navy-800 border-t border-navy-100 dark:border-navy-700"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-right text-navy-600 dark:text-cream-200 hover:bg-gold-50 dark:hover:bg-navy-700 hover:text-gold-700 dark:hover:text-gold-400 px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-inset"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
