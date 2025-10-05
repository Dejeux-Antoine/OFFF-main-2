import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Filter, Plus, Check } from 'lucide-react';
import { Card } from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

interface EventSession {
  id: string;
  title: string;
  title_translations: Record<string, string>;
  description: string;
  session_type: string;
  start_time: string;
  end_time: string;
  location_id: string;
  is_live_streamed: boolean;
  tags: string[];
  location?: {
    name: string;
  };
  artists?: Array<{
    name: string;
    image_url: string;
  }>;
}

const sessionTypeColors: Record<string, string> = {
  talk: 'bg-blue-100 text-blue-700',
  workshop: 'bg-green-100 text-green-700',
  performance: 'bg-pink-100 text-pink-700',
  panel: 'bg-accent-100 text-accent-700',
};

export const ProgramSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [sessions, setSessions] = useState<EventSession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<EventSession[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [savedSessions, setSavedSessions] = useState<Set<string>>(new Set());

  const filterOptions = ['talk', 'workshop', 'performance', 'panel'];
  const days = ['all', 'day1', 'day2', 'day3'];

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...sessions];

      if (selectedFilters.length > 0) {
        filtered = filtered.filter((session) =>
          selectedFilters.includes(session.session_type)
        );
      }

      if (selectedDay !== 'all') {
        const dayIndex = parseInt(selectedDay.replace('day', ''));
        filtered = filtered.filter((session) => {
          const sessionDate = new Date(session.start_time);
          const festivalStartDate = new Date('2026-04-16');
          const daysDiff = Math.floor(
            (sessionDate.getTime() - festivalStartDate.getTime()) / (1000 * 60 * 60 * 24)
          );
          return daysDiff === dayIndex - 1;
        });
      }

      setFilteredSessions(filtered);
    };

    applyFilters();
  }, [sessions, selectedFilters, selectedDay]);

  const fetchSessions = async () => {
    try {
      // Données fictives pour le développement
      const mockSessions: EventSession[] = [
        {
          id: '1',
          title: 'The Future of Digital Art',
          title_translations: {
            en: 'The Future of Digital Art',
            es: 'El Futuro del Arte Digital',
            fr: 'L\'Avenir de l\'Art Numérique',
            zh: '数字艺术的未来'
          },
          description: 'Exploring the cutting edge of digital creativity',
          session_type: 'talk',
          start_time: '2026-04-16T10:00:00Z',
          end_time: '2026-04-16T11:00:00Z',
          location_id: '1',
          is_live_streamed: true,
          tags: ['digital', 'art', 'future'],
          location: { name: 'Main Stage' },
          artists: [
            { name: 'Alex Chen', image_url: '' },
            { name: 'Maria Santos', image_url: '' }
          ]
        },
        {
          id: '2',
          title: 'Interactive Design Workshop',
          title_translations: {
            en: 'Interactive Design Workshop',
            es: 'Taller de Diseño Interactivo',
            fr: 'Atelier de Design Interactif',
            zh: '交互设计工作坊'
          },
          description: 'Hands-on workshop about interactive design',
          session_type: 'workshop',
          start_time: '2026-04-16T14:00:00Z',
          end_time: '2026-04-16T16:00:00Z',
          location_id: '2',
          is_live_streamed: false,
          tags: ['design', 'interactive'],
          location: { name: 'Workshop Room A' },
          artists: [
            { name: 'John Doe', image_url: '' }
          ]
        },
        {
          id: '3',
          title: 'Creative Performance',
          title_translations: {
            en: 'Creative Performance',
            es: 'Actuación Creativa',
            fr: 'Performance Créative',
            zh: '创意表演'
          },
          description: 'Live creative performance',
          session_type: 'performance',
          start_time: '2026-04-17T20:00:00Z',
          end_time: '2026-04-17T21:30:00Z',
          location_id: '3',
          is_live_streamed: true,
          tags: ['performance', 'live'],
          location: { name: 'Performance Hall' },
          artists: [
            { name: 'Luna Rodriguez', image_url: '' },
            { name: 'David Kim', image_url: '' },
            { name: 'Sophie Anderson', image_url: '' }
          ]
        }
      ];

      setSessions(mockSessions);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const toggleSaveSession = (sessionId: string) => {
    setSavedSessions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sessionId)) {
        newSet.delete(sessionId);
      } else {
        newSet.add(sessionId);
      }
      return newSet;
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(language, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const dayLabels: Record<string, Record<string, string>> = {
    all: { en: 'All Days', es: 'Todos los Días', fr: 'Tous les Jours', zh: '所有日期' },
    day1: { en: 'Day 1', es: 'Día 1', fr: 'Jour 1', zh: '第1天' },
    day2: { en: 'Day 2', es: 'Día 2', fr: 'Jour 2', zh: '第2天' },
    day3: { en: 'Day 3', es: 'Día 3', fr: 'Jour 3', zh: '第3天' },
  };

  return (
    <section id="program" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-4">
            <Calendar className="w-4 h-4 text-primary-700" />
            <span className="text-sm font-medium text-primary-700">
              {t('nav.program')}
            </span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gradient mb-4">
            {t('', { en: 'Festival Program', es: 'Programa del Festival', fr: 'Programme du Festival', zh: '节目安排' })}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('', { en: 'Explore talks, workshops, and performances from world-class creators', es: 'Explora charlas, talleres y actuaciones de creadores de clase mundial', fr: 'Explorez des conférences, ateliers et performances de créateurs de classe mondiale', zh: '探索世界级创作者的演讲、工作坊和表演' })}
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-3 items-center">
            <Filter className="w-5 h-5 text-neutral-600" />
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-4 py-2 rounded-xl font-medium transition-organic capitalize ${
                  selectedFilters.includes(filter)
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-2.5 rounded-xl font-medium transition-organic whitespace-nowrap ${
                  selectedDay === day
                    ? 'bg-accent-500 text-white shadow-md'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {t('', dayLabels[day])}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-neutral-200 rounded w-3/4 mb-4" />
                <div className="h-3 bg-neutral-200 rounded w-full mb-2" />
                <div className="h-3 bg-neutral-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500">
              {t('', { en: 'No sessions found. Try adjusting your filters.', es: 'No se encontraron sesiones. Intenta ajustar los filtros.', fr: 'Aucune session trouvée. Essayez d\'ajuster vos filtres.', zh: '未找到场次。尝试调整筛选条件。' })}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => {
              const title = session.title_translations?.[language] || session.title;
              return (
                <Card key={session.id} variant="elevated" hover>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${sessionTypeColors[session.session_type] || 'bg-neutral-100 text-neutral-700'}`}>
                        {session.session_type}
                      </span>
                      <button
                        onClick={() => toggleSaveSession(session.id)}
                        className={`p-2 rounded-lg transition-organic ${
                          savedSessions.has(session.id)
                            ? 'bg-primary-500 text-white'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {savedSessions.has(session.id) ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <h3 className="font-display text-xl font-bold text-neutral-900 mb-3 line-clamp-2">
                      {title}
                    </h3>

                    <div className="space-y-2 text-sm text-neutral-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary-500" />
                        <span>
                          {formatDate(session.start_time)} • {formatTime(session.start_time)} - {formatTime(session.end_time)}
                        </span>
                      </div>
                      {session.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary-500" />
                          <span>{session.location.name}</span>
                        </div>
                      )}
                    </div>

                    {session.artists && session.artists.length > 0 && (
                      <div className="flex items-center gap-2 pt-4 border-t border-neutral-100">
                        <Users className="w-4 h-4 text-neutral-500" />
                        <div className="flex -space-x-2">
                          {session.artists.slice(0, 3).map((artist, idx) => (
                            <div
                              key={idx}
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                            >
                              {artist.name.charAt(0)}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-neutral-600 ml-1">
                          {session.artists.length > 3
                            ? `+${session.artists.length - 3} more`
                            : session.artists.map((a) => a.name).join(', ')}
                        </span>
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
