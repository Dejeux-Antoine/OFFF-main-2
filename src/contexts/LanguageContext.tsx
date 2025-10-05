import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es' | 'fr' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, translations?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations: Record<string, Record<Language, string>> = {
  'nav.home': {
    en: 'Home',
    es: 'Inicio',
    fr: 'Accueil',
    zh: '首页',
  },
  'nav.program': {
    en: 'Program',
    es: 'Programa',
    fr: 'Programme',
    zh: '节目',
  },
  'nav.artists': {
    en: 'Artists',
    es: 'Artistas',
    fr: 'Artistes',
    zh: '艺术家',
  },
  'nav.map': {
    en: 'Map',
    es: 'Mapa',
    fr: 'Carte',
    zh: '地图',
  },
  'nav.badge': {
    en: 'My Badge',
    es: 'Mi Insignia',
    fr: 'Mon Badge',
    zh: '我的徽章',
  },
  'nav.tickets': {
    en: 'Tickets',
    es: 'Entradas',
    fr: 'Billets',
    zh: '门票',
  },
  'hero.title': {
    en: 'OFFF 2026',
    es: 'OFFF 2026',
    fr: 'OFFF 2026',
    zh: 'OFFF 2026',
  },
  'hero.subtitle': {
    en: 'Where Creativity Meets Innovation',
    es: 'Donde la Creatividad se Encuentra con la Innovación',
    fr: 'Où la Créativité Rencontre l\'Innovation',
    zh: '创意与创新的交汇之地',
  },
  'hero.dates': {
    en: 'April 16-18, 2026 • Barcelona',
    es: '16-18 de Abril, 2026 • Barcelona',
    fr: '16-18 Avril, 2026 • Barcelone',
    zh: '2026年4月16-18日 • 巴塞罗那',
  },
  'cta.getTickets': {
    en: 'Get Tickets',
    es: 'Comprar Entradas',
    fr: 'Acheter des Billets',
    zh: '购票',
  },
  'cta.exploreProgram': {
    en: 'Explore Program',
    es: 'Explorar Programa',
    fr: 'Explorer le Programme',
    zh: '浏览节目',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('offf-language') as Language;
    if (savedLang && ['en', 'es', 'fr', 'zh'].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('offf-language', lang);
  };

  const t = (key: string, customTranslations?: Record<string, string>) => {
    if (customTranslations && customTranslations[language]) {
      return customTranslations[language];
    }
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
