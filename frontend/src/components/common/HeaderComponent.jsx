import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import Logo from "./Logo";

/**
 * Main navigation header component with responsive design
 * Includes logo, navigation links, and mobile menu toggle
 */
const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Navigation links configuration - updated to use actual routes
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/", label: "Features", hash: "#features" },
    { to: "/", label: "Pricing", hash: "#pricing" },
    { to: "/", label: "About", hash: "#about" }
  ]

  const linkClasses = "text-neutral-700 hover:text-primary-600 transition-colors"

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-primary-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand logo */}
          <Link to="/">
            <Logo size="md" />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.to + (link.hash || '')} 
                to={link.to + (link.hash || '')} 
                className={linkClasses}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              to="/auth/login" 
              className="px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/auth/signup" 
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-green"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-700 hover:text-primary-600"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile navigation menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-100">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.to + (link.hash || '')} 
                  to={link.to + (link.hash || '')} 
                  className={linkClasses}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                to="/auth/login" 
                className="text-left text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/auth/signup" 
                className="text-left px-6 py-2 bg-primary-600 text-white rounded-lg w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HeaderComponent;
