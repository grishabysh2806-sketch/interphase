import { CaseStudy } from '../types';

// In a real scenario, this would use fetch() to hit a backend
// For this demo, we simulate an API delay and return high-quality mock data
export const fetchCaseStudies = async (): Promise<CaseStudy[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'MAIN BATTLEFIELD',
          client: 'ASUS ROG',
          description: 'The heart of Eleusis. 40 stations arranged for maximum team synergy. Cyberpunk lighting ambiance.',
          tags: ['RTX 4070', '240Hz', 'Open Space'],
          imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop',
          year: 'OPEN 24/7'
        },
        {
          id: '2',
          title: 'VIP BLACK OPS',
          client: 'NVIDIA',
          description: 'Sound-dampened 5-seater bootcamp rooms. Perfect for team training or private scrims.',
          tags: ['RTX 4090', 'Privacy', 'Soundproof'],
          imageUrl: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=2678&auto=format&fit=crop',
          year: 'BOOKING REQUIRED'
        },
        {
          id: '3',
          title: 'SIM RACING PIT',
          client: 'MOZA RACING',
          description: 'Full motion rig simulation. Feel every bump on the Nürburgring. Triple monitor setup.',
          tags: ['Direct Drive', 'VR Ready', 'Motion Rig'],
          imageUrl: 'https://images.unsplash.com/photo-1548685913-fe6678b427dd?q=80&w=2670&auto=format&fit=crop',
          year: 'LIMITED SLOTS'
        },
         {
          id: '4',
          title: 'CONSOLE LOUNGE',
          client: 'PlayStation 5',
          description: '4K OLED TVs, PS5 Pros, and chill sofas. FIFA, MK1, and Tekken 8 tournaments held weekly.',
          tags: ['4K OLED', 'Co-op', 'Chill'],
          imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2670&auto=format&fit=crop',
          year: 'WALK-IN'
        }
      ]);
    }, 1500); // Simulate network lag
  });
};
