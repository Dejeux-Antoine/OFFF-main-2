import React, { useState, useEffect } from 'react';
import { Users, ExternalLink, Instagram, Twitter, Globe } from 'lucide-react';
import { Card } from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

interface Artist {
  id: string;
  name: string;
  bio: string;
  bio_translations: Record<string, string>;
  image_url: string;
  website: string;
  social_links: Record<string, string>;
  tags: string[];
}

export const ArtistsSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      // Données fictives pour le développement
      const mockArtists: Artist[] = [
        {
          id: '1',
          name: 'Alex Chen',
          bio: 'Digital artist and creative technologist',
          bio_translations: {
            en: 'Digital artist and creative technologist',
            es: 'Artista digital y tecnólogo creativo',
            fr: 'Artiste numérique et technologue créatif',
            zh: '数字艺术家和创意技术专家'
          },
          image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
          website: 'https://alexchen.art',
          social_links: {
            instagram: 'alexchen_art',
            twitter: 'alexchen',
            website: 'https://alexchen.art'
          },
          tags: ['digital art', 'technology', 'interactive']
        },
        
        {
          id: '3',
          name: 'David Kim',
          bio: 'Creative director and brand strategist',
          bio_translations: {
            en: 'Creative director and brand strategist',
            es: 'Director creativo y estratega de marca',
            fr: 'Directeur créatif et stratège de marque',
            zh: '创意总监和品牌策略师'
          },
          image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
          website: 'https://davidkim.studio',
          social_links: {
            instagram: 'davidkim_studio',
            twitter: 'davidkimstudio',
            website: 'https://davidkim.studio'
          },
          tags: ['branding', 'strategy', 'creative direction']
        },
        {
          id: '4',
          name: 'Luna Rodriguez',
          bio: 'Performance artist and multimedia creator',
          bio_translations: {
            en: 'Performance artist and multimedia creator',
            es: 'Artista de performance y creadora multimedia',
            fr: 'Artiste de performance et créatrice multimédia',
            zh: '表演艺术家和多媒体创作者'
          },
          image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
          website: 'https://lunarodriguez.art',
          social_links: {
            instagram: 'luna_performs',
            twitter: 'lunarodriguez'
          },
          tags: ['performance', 'multimedia', 'experimental']
        },
        {
          id: '5',
          name: 'Sophie Anderson',
          bio: 'UX designer and design systems expert',
          bio_translations: {
            en: 'UX designer and design systems expert',
            es: 'Diseñadora UX y experta en sistemas de diseño',
            fr: 'Designer UX et experte en systèmes de design',
            zh: 'UX设计师和设计系统专家'
          },
          image_url: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop&crop=face',
          website: 'https://sophieanderson.design',
          social_links: {
            instagram: 'sophie_ux',
            twitter: 'sophieanderson',
            website: 'https://sophieanderson.design'
          },
          tags: ['UX design', 'design systems', 'user research']
        },
        {
          id: '6',
          name: 'João Silva',
          bio: 'Creative coder and generative artist',
          bio_translations: {
            en: 'Creative coder and generative artist',
            es: 'Programador creativo y artista generativo',
            fr: 'Codeur créatif et artiste génératif',
            zh: '创意程序员和生成艺术家'
          },
          image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
          website: 'https://joaosilva.code',
          social_links: {
            instagram: 'joao_codes',
            twitter: 'joaosilva'
          },
          tags: ['creative coding', 'generative art', 'algorithms']
        }
      ];

      setArtists(mockArtists);
    } catch (error) {
      console.error('Error fetching artists:', error);
    } finally {
      setLoading(false);
    }
  };

  const allTags = Array.from(
    new Set(artists.flatMap((artist) => artist.tags || []))
  );

  const filteredArtists =
    selectedTag === 'all'
      ? artists
      : artists.filter((artist) => artist.tags?.includes(selectedTag));

  return (
    <section id="artists" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 rounded-full mb-4">
            <Users className="w-4 h-4 text-accent-700" />
            <span className="text-sm font-medium text-accent-700">
              {t('nav.artists')}
            </span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gradient mb-4">
            {t('', {
              en: 'Featured Artists',
              es: 'Artistas Destacados',
              fr: 'Artistes en Vedette',
              zh: '特邀艺术家',
            })}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('', {
              en: 'Meet the creative minds shaping the future of design and art',
              es: 'Conoce las mentes creativas que dan forma al futuro del diseño y el arte',
              fr: 'Rencontrez les esprits créatifs qui façonnent l\'avenir du design et de l\'art',
              zh: '认识塑造设计和艺术未来的创意人才',
            })}
          </p>
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-organic ${
                selectedTag === 'all'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {t('', { en: 'All', es: 'Todos', fr: 'Tous', zh: '全部' })}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-xl font-medium transition-organic capitalize ${
                  selectedTag === tag
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-neutral-100 rounded-2xl aspect-square animate-pulse" />
            ))}
          </div>
        ) : filteredArtists.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500">
              {t('', {
                en: 'No artists found',
                es: 'No se encontraron artistas',
                fr: 'Aucun artiste trouvé',
                zh: '未找到艺术家',
              })}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtists.map((artist) => {
              const bio = artist.bio_translations?.[language] || artist.bio;
              return (
                <Card key={artist.id} hover className="overflow-hidden group">
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-primary-100 to-accent-100">
                    {artist.image_url ? (
                      <img
                        src={artist.image_url}
                        alt={artist.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl font-bold text-primary-300">
                          {artist.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex gap-2">
                        {artist.website && (
                          <a
                            href={artist.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                          >
                            <Globe className="w-4 h-4 text-white" />
                          </a>
                        )}
                        {artist.social_links?.instagram && (
                          <a
                            href={artist.social_links.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                          >
                            <Instagram className="w-4 h-4 text-white" />
                          </a>
                        )}
                        {artist.social_links?.twitter && (
                          <a
                            href={artist.social_links.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                          >
                            <Twitter className="w-4 h-4 text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">
                      {artist.name}
                    </h3>
                    {bio && (
                      <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                        {bio}
                      </p>
                    )}
                    {artist.tags && artist.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {artist.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
