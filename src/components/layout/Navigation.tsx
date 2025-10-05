import React, { useState, useEffect } from 'react';
import { Home, Calendar, Users, Map, Award, Ticket, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface NavItem {
  id: string;
  icon: React.ElementType;
  labelKey: string;
}

const navItems: NavItem[] = [
  { id: 'home', icon: Home, labelKey: 'nav.home' },
  { id: 'program', icon: Calendar, labelKey: 'nav.program' },
  { id: 'artists', icon: Users, labelKey: 'nav.artists' },
  { id: 'map', icon: Map, labelKey: 'nav.map' },
  { id: 'badge', icon: Award, labelKey: 'nav.badge' },
  { id: 'tickets', icon: Ticket, labelKey: 'nav.tickets' },
];

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
  { code: 'zh', label: '中文' },
];

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-lg py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="font-display text-3xl font-bold tracking-wider" style={{ color: '#A8350D' }}>OFFF</span>
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-2 rounded-xl transition-organic flex items-center gap-2 ${
                      activeSection === item.id
                        ? 'bg-primary-500 text-white'
                        : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{t(item.labelKey)}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center space-x-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`px-3 py-1.5 rounded-lg transition-organic text-sm font-medium ${
                    language === lang.code
                      ? 'bg-primary-500 text-white'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-neutral-100 transition-organic"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-neutral-700" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-20 right-4 left-4 bg-white rounded-3xl shadow-2xl p-6 transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-8'
          }`}
        >
          <div className="space-y-2 mb-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full px-4 py-3 rounded-xl transition-organic flex items-center gap-3 ${
                    activeSection === item.id
                      ? 'bg-primary-500 text-white'
                      : 'text-neutral-700 hover:bg-primary-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{t(item.labelKey)}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-neutral-200">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-neutral-600" />
              <span className="text-sm font-medium text-neutral-700">Language</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`px-3 py-2 rounded-lg transition-organic text-sm font-medium ${
                    language === lang.code
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
