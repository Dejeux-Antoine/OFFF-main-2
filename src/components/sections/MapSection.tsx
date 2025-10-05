import React from 'react';
import { Map, MapPin, Navigation } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const MapSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="map" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-4">
            <Map className="w-4 h-4 text-primary-700" />
            <span className="text-sm font-medium text-primary-700">
              {t('nav.map')}
            </span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gradient mb-4">
            {t('', { en: 'Venue & Location', es: 'Sede y Ubicación', fr: 'Lieu et Emplacement', zh: '场地和位置' })}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('', { en: 'Find your way around the festival grounds', es: 'Encuentra tu camino por el recinto del festival', fr: 'Trouvez votre chemin dans l\'enceinte du festival', zh: '在节日场地中找到方向' })}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-primary-500" />
                <h3 className="font-display text-2xl font-bold text-neutral-900">
                  {t('', { en: 'Main Venue', es: 'Sede Principal', fr: 'Lieu Principal', zh: '主要场地' })}
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">OFFF Festival Venue</h4>
                  <p className="text-neutral-600">Plaça de les Glòries Catalanes, 38, c, Sant Martí, 08018 Barcelona, Espagne</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-neutral-700">
                      {t('', { en: 'Metro', es: 'Metro', fr: 'Métro', zh: '地铁' })}:
                    </span>
                    <p className="text-neutral-600">Glòries (L1), Encants (L2)</p>
                  </div>
                  <div>
                    <span className="font-medium text-neutral-700">
                      {t('', { en: 'Bus', es: 'Autobús', fr: 'Bus', zh: '公交' })}:
                    </span>
                    <p className="text-neutral-600">7, 56, 60, 92, H12</p>
                  </div>
                  <div>
                    <span className="font-medium text-neutral-700">
                      {t('', { en: 'Parking', es: 'Parking', fr: 'Parking', zh: '停车' })}:
                    </span>
                    <p className="text-neutral-600">{t('', { en: 'Available nearby', es: 'Disponible cerca', fr: 'Disponible à proximité', zh: '附近有停车位' })}</p>
                  </div>
                  <div>
                    <span className="font-medium text-neutral-700">
                      {t('', { en: 'Distance', es: 'Distancia', fr: 'Distance', zh: '距离' })}:
                    </span>
                    <p className="text-neutral-600">{t('', { en: '10 min from center', es: '10 min del centro', fr: '10 min du centre', zh: '距市中心10分钟' })}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <h5 className="font-medium text-neutral-900 mb-2">
                    {t('', { en: 'Venue Highlights', es: 'Características del Lugar', fr: 'Points Forts du Lieu', zh: '场地亮点' })}
                  </h5>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    <li>• {t('', { en: 'Modern district location', es: 'Ubicación en distrito moderno', fr: 'Emplacement dans un quartier moderne', zh: '现代化区域位置' })}</li>
                    <li>• {t('', { en: 'Excellent connectivity', es: 'Excelente conectividad', fr: 'Excellente connectivité', zh: '交通便利' })}</li>
                    <li>• {t('', { en: 'Full accessibility', es: 'Totalmente accesible', fr: 'Entièrement accessible', zh: '完全无障碍' })}</li>
                    <li>• {t('', { en: 'Shopping & dining nearby', es: 'Tiendas y restaurantes cerca', fr: 'Commerces et restaurants à proximité', zh: '附近有购物和餐饮' })}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <div className="aspect-square bg-gradient-to-br from-primary-100 via-accent-50 to-primary-50 rounded-xl overflow-hidden">
              {/* Carte Google Maps intégrée */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.1234567890123!2d2.1895!3d41.4036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2c8a1234567%3A0x1234567890abcdef!2sPla%C3%A7a%20de%20les%20Gl%C3%B2ries%20Catalanes%2C%2038%2C%20Sant%20Mart%C3%AD%2C%2008018%20Barcelona%2C%20Spain!5e0!3m2!1sen!2ses!4v1696586400000!5m2!1sen!2ses"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="OFFF Festival Location Map"
              />
              
              {/* Overlay avec informations */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                  <MapPin className="w-4 h-4 text-primary-500" />
                  Glòries Catalanes
                </div>
              </div>
              
              {/* Bouton pour ouvrir dans Google Maps */}
              <div className="absolute bottom-4 right-4">
                <a
                  href="https://maps.google.com?q=Plaça+de+les+Glòries+Catalanes,+38,+Sant+Martí,+08018+Barcelona,+Spain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors shadow-lg"
                >
                  <Navigation className="w-4 h-4" />
                  {t('', { en: 'Open in Maps', es: 'Abrir en Mapas', fr: 'Ouvrir dans Maps', zh: '在地图中打开' })}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};