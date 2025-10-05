import React from 'react';
import { Ticket, Check, Sparkles, X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';

const ticketData = [
  {
    type: 'standard',
    icon: Ticket,
    title: {
      en: 'Standard Pass',
      es: 'Pase Estándar',
      fr: 'Pass Standard',
      zh: '标准通行证',
    },
    subtitle: {
      en: 'Affordable Access',
      es: 'Acceso Asequible',
      fr: 'Accès Abordable',
      zh: '实惠入场',
    },
    price: '95',
    currency: 'EUR',
    description: {
      en: 'Perfect for exploring the creative festival experience',
      es: 'Perfecto para explorar la experiencia del festival creativo',
      fr: 'Parfait pour explorer l\'expérience du festival créatif',
      zh: '非常适合探索创意节日体验',
    },
    included: [
      { en: 'All exhibitions', es: 'Todas las exposiciones', fr: 'Toutes les expositions', zh: '所有展览' },
      { en: 'Interactive installations', es: 'Instalaciones interactivas', fr: 'Installations interactives', zh: '互动装置' },
      { en: 'All activities & workshops', es: 'Todas las actividades y talleres', fr: 'Toutes les activités et ateliers', zh: '所有活动和工作坊' },
      { en: 'Festival merchandise discount', es: 'Descuento en merchandising', fr: 'Réduction sur le merchandising', zh: '节日商品折扣' },
    ],
    notIncluded: [
      { en: 'Main stage talks & conferences', es: 'Charlas y conferencias del escenario principal', fr: 'Conférences de la scène principale', zh: '主舞台演讲和会议' },
      { en: 'Exclusive networking events', es: 'Eventos de networking exclusivos', fr: 'Événements de réseautage exclusifs', zh: '独家社交活动' },
    ],
    gradient: 'from-brick-500 to-brick-600',
    border: 'border-brick-300',
    badge: 'bg-brick-100 text-brick-800',
  },
  {
    type: 'full',
    icon: Sparkles,
    title: {
      en: 'Full Experience Pass',
      es: 'Pase Experiencia Completa',
      fr: 'Pass Expérience Complète',
      zh: '完整体验通行证',
    },
    subtitle: {
      en: 'Premium Access',
      es: 'Acceso Premium',
      fr: 'Accès Premium',
      zh: '高级入场',
    },
    price: '245',
    currency: 'EUR',
    description: {
      en: 'The complete OFFF experience with exclusive access to everything',
      es: 'La experiencia OFFF completa con acceso exclusivo a todo',
      fr: 'L\'expérience OFFF complète avec un accès exclusif à tout',
      zh: '完整的OFFF体验，独家访问一切',
    },
    included: [
      { en: 'Everything in Standard Pass', es: 'Todo en el Pase Estándar', fr: 'Tout dans le Pass Standard', zh: '标准通行证的所有内容' },
      { en: 'All main stage talks & conferences', es: 'Todas las charlas y conferencias del escenario principal', fr: 'Toutes les conférences de la scène principale', zh: '所有主舞台演讲和会议' },
      { en: 'Exclusive networking events', es: 'Eventos de networking exclusivos', fr: 'Événements de réseautage exclusifs', zh: '独家社交活动' },
      { en: 'VIP lounge access', es: 'Acceso al salón VIP', fr: 'Accès au salon VIP', zh: 'VIP休息室访问' },
      { en: 'Recording access to all talks', es: 'Acceso a grabaciones de todas las charlas', fr: 'Accès aux enregistrements de toutes les conférences', zh: '所有演讲的录制访问' },
      { en: 'Premium festival merchandise', es: 'Merchandising premium del festival', fr: 'Merchandising premium du festival', zh: '高级节日商品' },
    ],
    notIncluded: [],
    gradient: 'from-terracotta-600 to-primary-700',
    border: 'border-terracotta-400',
    badge: 'bg-terracotta-100 text-terracotta-900',
    featured: true,
  },
];

export const TicketsSection: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section id="tickets" className="py-24 bg-gradient-to-br from-white via-primary-50 to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta-100 rounded-full mb-4">
            <Ticket className="w-4 h-4 text-terracotta-700" />
            <span className="text-sm font-medium text-terracotta-700">{t('nav.tickets')}</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#A8350D' }}>
            {t('', {
              en: 'Get Your Tickets',
              es: 'Obtén tus Entradas',
              fr: 'Obtenez vos Billets',
              zh: '购买门票',
            })}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('', {
              en: 'Choose the perfect pass for your creative journey at OFFF 2026',
              es: 'Elige el pase perfecto para tu viaje creativo en OFFF 2026',
              fr: 'Choisissez le pass parfait pour votre parcours créatif à OFFF 2026',
              zh: '选择最适合您在OFFF 2026创意之旅的通行证',
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {ticketData.map((ticket) => {
            const Icon = ticket.icon;
            return (
              <Card
                key={ticket.type}
                variant="elevated"
                className={`border-2 ${ticket.border} overflow-hidden ${ticket.featured ? 'lg:scale-105 shadow-2xl' : ''}`}
              >
                {ticket.featured && (
                  <div className="bg-gradient-to-r from-terracotta-600 to-terracotta-700 text-white text-center py-2 px-4 text-sm font-bold">
                    {t('', { en: 'MOST POPULAR', es: 'MÁS POPULAR', fr: 'LE PLUS POPULAIRE', zh: '最受欢迎' })}
                  </div>
                )}

                <div className={`p-8 bg-gradient-to-br ${ticket.gradient} text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 organic-shape -translate-y-8 translate-x-8" />
                  <div className="relative z-10">
                    <div className={`inline-flex items-center px-3 py-1 ${ticket.badge} rounded-full text-xs font-semibold mb-4`}>
                      {t('', ticket.subtitle)}
                    </div>
                    <Icon className="w-12 h-12 mb-4" />
                    <h3 className="font-display text-3xl font-bold mb-2">{t('', ticket.title)}</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-5xl font-bold">{ticket.price}</span>
                      <span className="text-xl opacity-90">{ticket.currency}</span>
                    </div>
                    <p className="text-white/90 text-sm">{t('', ticket.description)}</p>
                  </div>
                </div>

                <div className="p-8">
                  <div className="space-y-4 mb-6">
                    <div className="font-semibold text-neutral-900 mb-3">
                      {t('', { en: "What's included:", es: 'Qué incluye:', fr: 'Ce qui est inclus:', zh: '包含内容:' })}
                    </div>
                    {ticket.included.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm text-neutral-700">{t('', benefit)}</span>
                      </div>
                    ))}

                    {ticket.notIncluded.length > 0 && (
                      <>
                        <div className="font-semibold text-neutral-900 mt-6 mb-3">
                          {t('', { en: 'Not included:', es: 'No incluye:', fr: 'Non inclus:', zh: '不包含:' })}
                        </div>
                        {ticket.notIncluded.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-5 h-5 bg-neutral-100 rounded-full flex items-center justify-center mt-0.5">
                              <X className="w-3 h-3 text-neutral-400" />
                            </div>
                            <span className="text-sm text-neutral-500">{t('', item)}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>

                  <Button
                    variant={ticket.featured ? 'primary' : 'secondary'}
                    fullWidth
                    size="lg"
                    className={!ticket.featured ? 'bg-brick-500 hover:bg-brick-600' : ''}
                  >
                    {t('', {
                      en: `Buy ${t('', ticket.title)}`,
                      es: `Comprar ${t('', ticket.title)}`,
                      fr: `Acheter ${t('', ticket.title)}`,
                      zh: `购买${t('', ticket.title)}`,
                    })}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="font-display text-2xl font-bold text-neutral-900 mb-4">
              {t('', {
                en: 'Need Help Choosing?',
                es: '¿Necesitas Ayuda para Elegir?',
                fr: 'Besoin d\'Aide pour Choisir?',
                zh: '需要帮助选择吗？',
              })}
            </h3>
            <p className="text-neutral-600 mb-6">
              {t('', {
                en: 'Our team is here to help you find the perfect ticket for your needs.',
                es: 'Nuestro equipo está aquí para ayudarte a encontrar la entrada perfecta para tus necesidades.',
                fr: 'Notre équipe est là pour vous aider à trouver le billet parfait pour vos besoins.',
                zh: '我们的团队随时为您找到最适合您需求的门票。',
              })}
            </p>
            <Button variant="outline" size="md" className="border-terracotta-500 text-terracotta-700 hover:bg-terracotta-50">
              {t('', {
                en: 'Contact Support',
                es: 'Contactar Soporte',
                fr: 'Contacter le Support',
                zh: '联系支持',
              })}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
