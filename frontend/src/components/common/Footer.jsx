import React from 'react'
import { Link } from 'react-router-dom'
import { Twitter, Linkedin } from 'lucide-react'
import { BRAND, COMPANY_INFO, FOOTER_LINKS, LEGAL_LINKS, SOCIAL_LINKS } from '../../constants'
import Logo from './Logo'

/**
 * Footer component with company info, navigation links, and social links
 */
const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company branding and social links */}
          <div className="col-span-1">
            <Link to="/">
              <Logo 
                size="md" 
                className="mb-6"
                iconClassName="bg-gradient-to-br from-primary-500 to-secondary-500"
                textClassName="text-white"
              />
            </Link>
            <p className="text-primary-200 mb-6">
              {COMPANY_INFO.description}
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.slice(0, 2).map((social, index) => (
                <a key={index} href={social.href} className="text-primary-400 hover:text-white transition-colors" aria-label={social.ariaLabel}>
                  <span className="sr-only">{social.name}</span>
                  {social.icon === 'twitter' && <Twitter className="h-6 w-6" />}
                  {social.icon === 'linkedin' && <Linkedin className="h-6 w-6" />}
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic footer navigation sections */}
          {Object.entries(FOOTER_LINKS).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-lg font-semibold mb-6">{section.title}</h3>
              <ul className="space-y-4 text-primary-200">
                {section.links.map((item, index) => (
                  <li key={index}>
                    {/* Use Link for internal routes, anchor for external/hash links */}
                    {item.href.startsWith('#') ? (
                      <Link to={`/${item.href}`} className="hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    ) : item.href.startsWith('http') ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        {item.name}
                      </a>
                    ) : (
                      <Link to={item.href} className="hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer bottom section with copyright and legal links */}
        <div className="border-t border-primary-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-200 text-sm">
              {COMPANY_INFO.copyright}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {LEGAL_LINKS.map((link, index) => (
                <Link
                  key={index}
                  to={link.href.startsWith('#') ? `/${link.href}` : link.href}
                  className="text-primary-200 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
