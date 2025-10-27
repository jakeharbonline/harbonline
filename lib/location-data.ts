/**
 * Location data for local SEO landing pages
 */

export interface LocationData {
  slug: string;
  name: string;
  county: string;
  description: string;
  localInfo: string;
  areasServed: string[];
  keywords: string[];
}

export const locations: LocationData[] = [
  {
    slug: 'chichester',
    name: 'Chichester',
    county: 'West Sussex',
    description: 'Chichester is a vibrant city with a thriving business community, from independent shops in the historic city centre to professional services and growing tech companies.',
    localInfo: 'Whether you\'re a retail business near the Cathedral, a restaurant on South Street, or a professional service provider in the surrounding villages, having a strong online presence is essential. Serving Chichester city centre, Stockbridge, Whyke, Fishbourne, Bosham, and surrounding areas.',
    areasServed: ['Chichester city centre', 'Stockbridge', 'Whyke', 'Fishbourne', 'Bosham'],
    keywords: [
      'web designer Chichester',
      'web developer Chichester',
      'website design Chichester',
      'Chichester web development',
    ],
  },
  {
    slug: 'bognor-regis',
    name: 'Bognor Regis',
    county: 'West Sussex',
    description: 'Bognor Regis is a bustling seaside town with a diverse business landscape, from tourism and hospitality to retail and professional services.',
    localInfo: 'From cafes and hotels along the seafront to shops in the town centre and businesses in Felpham, Bognor companies need websites that attract both locals and visitors. Serving Bognor Regis town centre, Felpham, Aldwick, and surrounding areas.',
    areasServed: ['Bognor Regis town centre', 'Felpham', 'Aldwick', 'Rose Green'],
    keywords: [
      'web designer Bognor Regis',
      'web developer Bognor Regis',
      'website design Bognor Regis',
      'Bognor Regis web development',
    ],
  },
  {
    slug: 'littlehampton',
    name: 'Littlehampton',
    county: 'West Sussex',
    description: 'Littlehampton is a thriving coastal town with a growing business community, from independent retailers to marine services and hospitality businesses.',
    localInfo: 'Whether you\'re based near the harbour, in the town centre, or in surrounding areas like Rustington and Wick, a professional website helps you reach more customers. Serving Littlehampton town centre, Rustington, Wick, and Climping.',
    areasServed: ['Littlehampton town centre', 'Rustington', 'Wick', 'Climping'],
    keywords: [
      'web designer Littlehampton',
      'web developer Littlehampton',
      'website design Littlehampton',
      'Littlehampton web development',
    ],
  },
  {
    slug: 'worthing',
    name: 'Worthing',
    county: 'West Sussex',
    description: 'Worthing is West Sussex\'s largest town, with a vibrant economy spanning retail, professional services, creative industries, and hospitality.',
    localInfo: 'From businesses in the town centre and along the seafront to companies in Goring and Durrington, Worthing businesses need modern websites to compete online. Serving Worthing town centre, Goring, Durrington, Broadwater, and surrounding areas.',
    areasServed: ['Worthing town centre', 'Goring', 'Durrington', 'Broadwater', 'Tarring'],
    keywords: [
      'web designer Worthing',
      'web developer Worthing',
      'website design Worthing',
      'Worthing web development',
    ],
  },
  {
    slug: 'brighton',
    name: 'Brighton',
    county: 'East Sussex',
    description: 'Brighton is a dynamic city known for its creative industries, tech startups, hospitality businesses, and thriving independent retail scene.',
    localInfo: 'From digital agencies in the Lanes to restaurants in North Laine and startups in the tech quarter, Brighton businesses need cutting-edge websites that stand out. Serving Brighton city centre, Hove, Kemptown, Preston Park, and surrounding areas.',
    areasServed: ['Brighton city centre', 'Hove', 'Kemptown', 'Preston Park', 'The Lanes'],
    keywords: [
      'web designer Brighton',
      'web developer Brighton',
      'website design Brighton',
      'Brighton web development',
    ],
  },
];
