import { supabase } from './supabase';

export const seedSampleData = async () => {
  try {
    const artistsData = [
      {
        name: 'Lara Gómez',
        bio: 'Lara\'s large-scale works blend Mediterranean color palettes with community stories—recognized for redefining urban spaces as living canvases.',
        bio_translations: {
          es: 'Las obras a gran escala de Lara combinan paletas de colores mediterráneos con historias comunitarias, reconocida por redefinir los espacios urbanos como lienzos vivientes.',
          fr: 'Les œuvres à grande échelle de Lara mélangent des palettes de couleurs méditerranéennes avec des histoires communautaires—reconnue pour redéfinir les espaces urbains comme des toiles vivantes.',
          zh: 'Lara的大型作品将地中海色彩调色板与社区故事融合在一起，以重新定义城市空间为生活画布而闻名。',
        },
        image_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&w=400',
        tags: ['Muralist', 'Urban Artist', 'Street Art'],
        social_links: {
          instagram: 'https://instagram.com',
          website: 'https://example.com',
        },
      },
      {
        name: 'Taro Ishikawa',
        bio: 'From Tokyo to Barcelona, Taro merges traditional sculpture with cutting-edge digital fabrication, creating hybrid experiences across continents.',
        bio_translations: {
          es: 'De Tokio a Barcelona, Taro fusiona la escultura tradicional con la fabricación digital de vanguardia, creando experiencias híbridas a través de continentes.',
          fr: 'De Tokyo à Barcelone, Taro fusionne la sculpture traditionnelle avec la fabrication numérique de pointe, créant des expériences hybrides à travers les continents.',
          zh: '从东京到巴塞罗那，Taro将传统雕塑与尖端数字制造技术相结合，跨大陆创造混合体验。',
        },
        image_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&w=400',
        tags: ['Sculptor', 'Design Technologist', 'Digital Fabrication'],
        website: 'https://example.com',
      },
      {
        name: 'Maria Santos',
        bio: 'Award-winning motion designer and creative director specializing in experimental animation.',
        bio_translations: {
          es: 'Diseñadora de movimiento galardonada y directora creativa especializada en animación experimental.',
          fr: 'Conceptrice de mouvement primée et directrice créative spécialisée en animation expérimentale.',
          zh: '屡获殊荣的动态设计师和创意总监，专注于实验性动画。',
        },
        image_url: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&w=400',
        tags: ['Motion Design', 'Animation', 'Creative Direction'],
        social_links: {
          instagram: 'https://instagram.com',
          twitter: 'https://twitter.com',
        },
      },
      {
        name: 'Alex Chen',
        bio: 'Digital artist pushing the boundaries of generative art and interactive installations.',
        bio_translations: {
          es: 'Artista digital que empuja los límites del arte generativo y las instalaciones interactivas.',
          fr: 'Artiste numérique repoussant les limites de l\'art génératif et des installations interactives.',
          zh: '数字艺术家，突破生成艺术和交互装置的界限。',
        },
        image_url: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&w=400',
        tags: ['Generative Art', 'Interactive', 'Installation'],
        website: 'https://example.com',
      },
    ];

    const { data: artists, error: artistsError } = await supabase
      .from('artists')
      .insert(artistsData)
      .select();

    if (artistsError) throw artistsError;

    const locationsData = [
      {
        name: 'Main Stage',
        name_translations: {
          es: 'Escenario Principal',
          fr: 'Scène Principale',
          zh: '主舞台',
        },
        type: 'stage',
        description: 'Our largest venue featuring keynote speakers and major performances',
        floor_level: 0,
        capacity: 1000,
        amenities: ['Audio/Video', 'Seating', 'AC'],
        coordinates: { lat: 41.3851, lng: 2.1734 },
      },
      {
        name: 'Creative Lab',
        name_translations: {
          es: 'Laboratorio Creativo',
          fr: 'Laboratoire Créatif',
          zh: '创意实验室',
        },
        type: 'workshop_space',
        description: 'Hands-on workshop space for interactive sessions',
        floor_level: 1,
        capacity: 50,
        amenities: ['WiFi', 'Workstations', 'Materials'],
        coordinates: { lat: 41.3852, lng: 2.1735 },
      },
      {
        name: 'Digital Gallery',
        name_translations: {
          es: 'Galería Digital',
          fr: 'Galerie Numérique',
          zh: '数字画廊',
        },
        type: 'art_installation',
        description: 'Immersive digital art installations and exhibitions',
        floor_level: 0,
        capacity: 200,
        amenities: ['Dark Room', 'Projection', 'Sound System'],
        coordinates: { lat: 41.3850, lng: 2.1736 },
      },
    ];

    const { data: locations, error: locationsError } = await supabase
      .from('locations')
      .insert(locationsData)
      .select();

    if (locationsError) throw locationsError;

    if (artists && locations && artists.length > 0 && locations.length > 0) {
      const sessionsData = [
        {
          title: 'Urban Nature – Street Art as Public Space',
          title_translations: {
            es: 'Naturaleza Urbana – Arte Callejero como Espacio Público',
            fr: 'Nature Urbaine – L\'Art de Rue comme Espace Public',
            zh: '城市自然——街头艺术作为公共空间',
          },
          description: 'Explore the intersection of street art, urban design, and ephemeral creativity with Barcelona-based muralist Lara Gómez.',
          session_type: 'talk',
          start_time: new Date('2026-04-17T14:00:00Z').toISOString(),
          end_time: new Date('2026-04-17T15:00:00Z').toISOString(),
          location_id: locations[0].id,
          capacity: 500,
          is_live_streamed: true,
          tags: ['Street Art', 'Urban Design', 'Public Space'],
        },
        {
          title: 'Analog Meets Digital: Sculpting Future Forms',
          title_translations: {
            es: 'Lo Analógico Encuentra lo Digital: Esculpiendo Formas Futuras',
            fr: 'L\'Analogique Rencontre le Numérique: Sculpter les Formes Futures',
            zh: '模拟与数字相遇：雕刻未来形态',
          },
          description: 'A hands-on workshop blending classical clay techniques with digital 3D printing, led by international sculptor Taro Ishikawa.',
          session_type: 'workshop',
          start_time: new Date('2026-04-18T10:00:00Z').toISOString(),
          end_time: new Date('2026-04-18T12:00:00Z').toISOString(),
          location_id: locations[1].id,
          capacity: 30,
          is_live_streamed: false,
          tags: ['Workshop', 'Sculpture', 'Digital Fabrication'],
        },
        {
          title: 'Motion Design in the Age of AI',
          title_translations: {
            es: 'Diseño de Movimiento en la Era de la IA',
            fr: 'Motion Design à l\'Ère de l\'IA',
            zh: 'AI时代的动态设计',
          },
          description: 'Discover how motion designers are integrating AI tools into their creative workflows',
          session_type: 'talk',
          start_time: new Date('2026-04-16T11:00:00Z').toISOString(),
          end_time: new Date('2026-04-16T12:00:00Z').toISOString(),
          location_id: locations[0].id,
          capacity: 500,
          is_live_streamed: true,
          tags: ['Motion Design', 'AI', 'Technology'],
        },
      ];

      const { data: sessions, error: sessionsError } = await supabase
        .from('event_sessions')
        .insert(sessionsData)
        .select();

      if (sessionsError) throw sessionsError;

      if (sessions) {
        const sessionArtistsData = [
          { session_id: sessions[0].id, artist_id: artists[0].id, role: 'speaker' },
          { session_id: sessions[1].id, artist_id: artists[1].id, role: 'workshop_leader' },
          { session_id: sessions[2].id, artist_id: artists[2].id, role: 'speaker' },
        ];

        await supabase.from('session_artists').insert(sessionArtistsData);
      }
    }

    const ticketsData = [
      {
        ticket_type: 'day_pass',
        title: 'Day Pass',
        title_translations: {
          es: 'Pase de Un Día',
          fr: 'Pass d\'un Jour',
          zh: '单日通行证',
        },
        description: 'Access to all events for one day',
        description_translations: {
          es: 'Acceso a todos los eventos durante un día',
          fr: 'Accès à tous les événements pour une journée',
          zh: '一天内访问所有活动',
        },
        price_eur: 85,
        currency: 'EUR',
        benefits: ['Full day access', 'Main stage talks', 'Exhibition entry', 'Networking events'],
        total_quantity: 500,
        sold_quantity: 142,
        is_available: true,
        valid_from: new Date('2026-04-16T00:00:00Z').toISOString(),
        valid_until: new Date('2026-04-18T23:59:59Z').toISOString(),
      },
      {
        ticket_type: 'full_festival',
        title: 'Full Festival Pass',
        title_translations: {
          es: 'Pase Completo del Festival',
          fr: 'Pass Festival Complet',
          zh: '全程节日通行证',
        },
        description: 'Complete access to all 3 days',
        description_translations: {
          es: 'Acceso completo a los 3 días',
          fr: 'Accès complet aux 3 jours',
          zh: '全部3天完整访问',
        },
        price_eur: 220,
        currency: 'EUR',
        benefits: [
          'All 3 days access',
          'All talks & workshops',
          'VIP networking lounge',
          'Festival merchandise',
          'Recording access',
        ],
        total_quantity: 1000,
        sold_quantity: 687,
        is_available: true,
        valid_from: new Date('2026-04-16T00:00:00Z').toISOString(),
        valid_until: new Date('2026-04-18T23:59:59Z').toISOString(),
      },
      {
        ticket_type: 'student',
        title: 'Student Pass',
        title_translations: {
          es: 'Pase de Estudiante',
          fr: 'Pass Étudiant',
          zh: '学生通行证',
        },
        description: 'Special rate for students with valid ID',
        description_translations: {
          es: 'Tarifa especial para estudiantes con identificación válida',
          fr: 'Tarif spécial pour les étudiants avec carte valide',
          zh: '持有效学生证的学生特价',
        },
        price_eur: 150,
        currency: 'EUR',
        benefits: ['All 3 days access', 'Student meetups', 'Portfolio reviews', 'Career sessions'],
        total_quantity: 300,
        sold_quantity: 245,
        is_available: true,
        valid_from: new Date('2026-04-16T00:00:00Z').toISOString(),
        valid_until: new Date('2026-04-18T23:59:59Z').toISOString(),
      },
    ];

    await supabase.from('tickets').insert(ticketsData);

    console.log('Sample data seeded successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error seeding data:', error);
    return { success: false, error };
  }
};
