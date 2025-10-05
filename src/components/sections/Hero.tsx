import React, { useEffect, useState } from 'react';
import { Sparkles, Calendar, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxX = (mousePosition.x - window.innerWidth / 2) * 0.02;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) * 0.02;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-primary-50 to-terracotta-50">
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-300 rounded-full blur-3xl animate-pulse-slow"
          style={{
            transform: `translate(${parallaxX}px, ${parallaxY}px)`,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-300 rounded-full blur-3xl animate-pulse-slow"
          style={{
            transform: `translate(${-parallaxX}px, ${-parallaxY}px)`,
            animationDelay: '1s',
          }}
        />
      </div>

      <div className="absolute inset-0 cave-texture opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-8 animate-float">
          <Sparkles className="w-4 h-4 text-terracotta-600" />
          <span className="text-sm font-medium text-neutral-700">
            {t('hero.dates')}
          </span>
        </div>

        <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-6">
          <span className="block" style={{ color: '#A8350D' }}>{t('hero.title')}</span>
        </h1>

        <p className="text-xl sm:text-2xl lg:text-3xl text-neutral-700 font-medium mb-4 max-w-3xl mx-auto">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 text-neutral-600">
            <Calendar className="w-5 h-5 text-terracotta-600" />
            <span className="font-medium">3 Days of Creativity</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-neutral-400 rounded-full" />
          <div className="flex items-center gap-2 text-neutral-600">
            <MapPin className="w-5 h-5 text-terracotta-600" />
            <span className="font-medium">Barcelona, Spain</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Button size="lg" fullWidth onClick={() => document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' })}>
            {t('cta.getTickets')}
          </Button>
          <Button size="lg" variant="outline" fullWidth onClick={() => document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' })}>
            {t('cta.exploreProgram')}
          </Button>
        </div>

        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: '150+', label: { en: 'Artists', es: 'Artistas', fr: 'Artistes', zh: '艺术家' } },
            { number: '50+', label: { en: 'Sessions', es: 'Sesiones', fr: 'Sessions', zh: '场次' } },
            { number: '3000+', label: { en: 'Attendees', es: 'Asistentes', fr: 'Participants', zh: '参与者' } },
            { number: '20+', label: { en: 'Countries', es: 'Países', fr: 'Pays', zh: '国家' } },
          ].map((stat, index) => (
            <div key={index} className="glass-card rounded-2xl p-6 hover-lift">
              <div className="text-4xl font-bold mb-2" style={{ color: '#A8350D' }}>{stat.number}</div>
              <div className="text-sm text-neutral-600 font-medium">{t('', stat.label)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-500 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
