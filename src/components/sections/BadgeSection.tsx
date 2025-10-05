import React, { useState, useEffect } from 'react';
import { Award, Trophy, Star, MapPin, Calendar, TrendingUp, Share2, Download } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';

interface BadgeData {
  displayName: string;
  level: number;
  points: number;
  qrScans: number;
  collectedSessions: number;
  collectedLocations: number;
  achievements: Array<{
    id: string;
    name: string;
    icon: string;
    unlockedAt: string;
  }>;
}

export const BadgeSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [badgeData, setBadgeData] = useState<BadgeData>({
    displayName: 'Festival Explorer',
    level: 1,
    points: 0,
    qrScans: 0,
    collectedSessions: 0,
    collectedLocations: 0,
    achievements: [],
  });

  const sampleAchievements = [
    {
      id: '1',
      name: t('', { en: 'First Steps', es: 'Primeros Pasos', fr: 'Premiers Pas', zh: '第一步' }),
      icon: '🎯',
      description: t('', {
        en: 'Attended your first session',
        es: 'Asististe a tu primera sesión',
        fr: 'Participé à votre première session',
        zh: '参加了第一场活动',
      }),
      unlocked: true,
    },
    {
      id: '2',
      name: t('', { en: 'Explorer', es: 'Explorador', fr: 'Explorateur', zh: '探险家' }),
      icon: '🗺️',
      description: t('', {
        en: 'Visited 5 different locations',
        es: 'Visitaste 5 ubicaciones diferentes',
        fr: 'Visité 5 emplacements différents',
        zh: '访问了5个不同的地点',
      }),
      unlocked: false,
    },
    {
      id: '3',
      name: t('', { en: 'Social Butterfly', es: 'Mariposa Social', fr: 'Papillon Social', zh: '社交达人' }),
      icon: '🦋',
      description: t('', {
        en: 'Connected with 10 artists',
        es: 'Conectaste con 10 artistas',
        fr: 'Connecté avec 10 artistes',
        zh: '与10位艺术家建立了联系',
      }),
      unlocked: false,
    },
    {
      id: '4',
      name: t('', { en: 'Master Collector', es: 'Coleccionista Maestro', fr: 'Collectionneur Maître', zh: '收藏大师' }),
      icon: '💎',
      description: t('', {
        en: 'Scanned 20 QR codes',
        es: 'Escaneaste 20 códigos QR',
        fr: 'Scanné 20 codes QR',
        zh: '扫描了20个二维码',
      }),
      unlocked: false,
    },
  ];

  const stats = [
    {
      icon: Calendar,
      label: t('', { en: 'Sessions', es: 'Sesiones', fr: 'Sessions', zh: '场次' }),
      value: badgeData.collectedSessions,
      color: 'text-pink-500',
      bg: 'bg-pink-50',
    },
    {
      icon: MapPin,
      label: t('', { en: 'Locations', es: 'Ubicaciones', fr: 'Emplacements', zh: '地点' }),
      value: badgeData.collectedLocations,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      icon: Star,
      label: t('', { en: 'QR Scans', es: 'Escaneos QR', fr: 'Scans QR', zh: '二维码扫描' }),
      value: badgeData.qrScans,
      color: 'text-accent-500',
      bg: 'bg-accent-50',
    },
    {
      icon: Trophy,
      label: t('', { en: 'Achievements', es: 'Logros', fr: 'Réalisations', zh: '成就' }),
      value: sampleAchievements.filter((a) => a.unlocked).length,
      color: 'text-primary-500',
      bg: 'bg-primary-50',
    },
  ];

  const levelProgress = (badgeData.points % 100) / 100;

  return (
    <section id="badge" className="py-24 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-4">
            <Award className="w-4 h-4 text-primary-700" />
            <span className="text-sm font-medium text-primary-700">{t('nav.badge')}</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gradient mb-4">
            {t('', {
              en: 'Your Digital Badge',
              es: 'Tu Insignia Digital',
              fr: 'Votre Badge Numérique',
              zh: '您的数字徽章',
            })}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('', {
              en: 'Track your festival journey and unlock achievements',
              es: 'Rastrea tu viaje por el festival y desbloquea logros',
              fr: 'Suivez votre parcours au festival et débloquez des réalisations',
              zh: '追踪您的节日之旅并解锁成就',
            })}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card variant="elevated" className="mb-8 overflow-hidden">
            <div className="relative p-8 bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 right-10 w-40 h-40 bg-white organic-shape animate-float" />
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-white organic-shape-alt" style={{ animationDelay: '1s' }} />
              </div>

              <div className="relative z-10 text-center text-white">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm organic-shape mb-4">
                  <Award className="w-12 h-12" />
                </div>
                <h3 className="font-display text-3xl font-bold mb-2">{badgeData.displayName}</h3>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-bold">
                      {t('', { en: 'Level', es: 'Nivel', fr: 'Niveau', zh: '等级' })} {badgeData.level}
                    </span>
                  </div>
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full font-bold">
                    {badgeData.points} {t('', { en: 'pts', es: 'pts', fr: 'pts', zh: '分' })}
                  </div>
                </div>

                <div className="max-w-md mx-auto">
                  <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-1000 animate-shimmer"
                      style={{ width: `${levelProgress * 100}%` }}
                    />
                  </div>
                  <p className="text-sm mt-2 text-white/90">
                    {Math.round(levelProgress * 100)}% {t('', { en: 'to next level', es: 'al siguiente nivel', fr: 'au niveau suivant', zh: '到下一级' })}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white">
              <div className="flex items-center justify-center gap-3">
                <Button variant="primary" icon={Share2}>
                  {t('', { en: 'Share Badge', es: 'Compartir', fr: 'Partager', zh: '分享' })}
                </Button>
                <Button variant="outline" icon={Download}>
                  {t('', { en: 'Download', es: 'Descargar', fr: 'Télécharger', zh: '下载' })}
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} variant="elevated" hover>
                  <div className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.bg} rounded-xl mb-3`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="text-3xl font-bold text-neutral-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-neutral-600 font-medium">{stat.label}</div>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card variant="elevated">
            <div className="p-6">
              <h3 className="font-display text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-primary-500" />
                {t('', {
                  en: 'Achievements',
                  es: 'Logros',
                  fr: 'Réalisations',
                  zh: '成就',
                })}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sampleAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-xl border-2 transition-organic ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200 shadow-md'
                        : 'bg-neutral-50 border-neutral-200 opacity-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-neutral-900 mb-1">{achievement.name}</h4>
                        <p className="text-sm text-neutral-600">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 text-white fill-current" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
