import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "Videos", href: "/videos" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-escz-navy/95 backdrop-blur-sm border-b border-escz-gray/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 text-escz-cream font-bold text-xl hover:text-escz-orange transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-escz-orange to-escz-gold rounded-lg flex items-center justify-center">
                <span className="text-escz-navy font-bold text-sm">E</span>
              </div>
              <span className="hidden sm:inline">ESCZ</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-escz-cream/80 hover:text-escz-orange transition-colors duration-200 text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-escz-cream hover:text-escz-orange transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden pb-4 border-t border-escz-gray/20">
              <div className="flex flex-col gap-3 pt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-escz-cream/80 hover:text-escz-orange transition-colors duration-200 px-2 py-2 text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
};

export default Header;