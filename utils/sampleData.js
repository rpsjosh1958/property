// Sample property data - replace the API calls with this static data for now
export const sampleProperties = {
  propertiesForRent: [
    {
      id: 1,
      externalID: 'rent-001',
      coverPhoto: {
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      rooms: 2,
      baths: 2,
      isVerified: true,
      title: 'Modern City Apartment',
      price: 1200,
      rentFrequency: 'monthly',
      score_l1: 45,
      randBoostScore: 85,
      area: 850,
      agency: {
        logo: {
          url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
        }
      },
      description: 'Beautiful modern apartment in the heart of the city with stunning views and premium amenities.',
      type: 'Apartment',
      purpose: 'for-rent',
      furnishingStatus: 'Furnished',
      amenities: [
        {
          amenities: [
            { text: 'Gym' },
            { text: 'Pool' },
            { text: 'Parking' },
            { text: 'Security' }
          ]
        }
      ],
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        }
      ]
    },
    {
      id: 2,
      externalID: 'rent-002',
      coverPhoto: {
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      rooms: 3,
      baths: 2,
      isVerified: true,
      title: 'Spacious Family Home',
      price: 1800,
      rentFrequency: 'monthly',
      score_l1: 32,
      randBoostScore: 92,
      area: 1200,
      agency: {
        logo: {
          url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
        }
      },
      description: 'Perfect family home with garden, modern kitchen, and excellent transport links.',
      type: 'House',
      purpose: 'for-rent',
      furnishingStatus: 'Unfurnished',
      amenities: [
        {
          amenities: [
            { text: 'Garden' },
            { text: 'Garage' },
            { text: 'Modern Kitchen' }
          ]
        }
      ],
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        }
      ]
    },
    {
      id: 3,
      externalID: 'rent-003',
      coverPhoto: {
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      rooms: 1,
      baths: 1,
      isVerified: false,
      title: 'Cozy Studio Apartment',
      price: 800,
      rentFrequency: 'monthly',
      score_l1: 28,
      randBoostScore: 75,
      area: 450,
      agency: {
        logo: {
          url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
        }
      },
      description: 'Perfect for young professionals, this studio offers everything you need in a great location.',
      type: 'Studio',
      purpose: 'for-rent',
      furnishingStatus: 'Furnished',
      amenities: [
        {
          amenities: [
            { text: 'WiFi' },
            { text: 'Laundry' }
          ]
        }
      ],
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        }
      ]
    }
  ],
  propertiesForSale: [
    {
      id: 4,
      externalID: 'sale-001',
      coverPhoto: {
        url: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      rooms: 4,
      baths: 3,
      isVerified: true,
      title: 'Luxury Villa with Pool',
      price: 450000,
      rentFrequency: null,
      score_l1: 67,
      randBoostScore: 95,
      area: 2500,
      agency: {
        logo: {
          url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
        }
      },
      description: 'Stunning luxury villa with private pool, landscaped gardens, and premium finishes throughout.',
      type: 'Villa',
      purpose: 'for-sale',
      furnishingStatus: 'Unfurnished',
      amenities: [
        {
          amenities: [
            { text: 'Private Pool' },
            { text: 'Garden' },
            { text: 'Garage' },
            { text: 'Security System' }
          ]
        }
      ],
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        }
      ]
    },
    {
      id: 5,
      externalID: 'sale-002',
      coverPhoto: {
        url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      rooms: 3,
      baths: 2,
      isVerified: true,
      title: 'Contemporary Townhouse',
      price: 280000,
      rentFrequency: null,
      score_l1: 41,
      randBoostScore: 88,
      area: 1600,
      agency: {
        logo: {
          url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
        }
      },
      description: 'Modern townhouse with open-plan living, fitted kitchen, and private parking.',
      type: 'Townhouse',
      purpose: 'for-sale',
      furnishingStatus: 'Unfurnished',
      amenities: [
        {
          amenities: [
            { text: 'Parking' },
            { text: 'Modern Kitchen' },
            { text: 'Balcony' }
          ]
        }
      ],
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        }
      ]
    },
    {
      id: 6,
      externalID: 'sale-003',
      coverPhoto: {
        url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      rooms: 2,
      baths: 1,
      isVerified: false,
      title: 'City Center Penthouse',
      price: 350000,
      rentFrequency: null,
      score_l1: 53,
      randBoostScore: 91,
      area: 1100,
      agency: {
        logo: {
          url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
        }
      },
      description: 'Exclusive penthouse with panoramic city views, premium finishes, and rooftop terrace.',
      type: 'Penthouse',
      purpose: 'for-sale',
      furnishingStatus: 'Partially Furnished',
      amenities: [
        {
          amenities: [
            { text: 'City Views' },
            { text: 'Rooftop Terrace' },
            { text: 'Concierge' },
            { text: 'Lift Access' }
          ]
        }
      ],
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        }
      ]
    }
  ]
};
