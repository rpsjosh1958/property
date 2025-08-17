import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Get all visible properties for public display
export const getPublicProperties = async () => {
  try {
    const q = query(
      collection(db, 'properties'),
      where('isVisible', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching public properties:', error);
    return [];
  }
};

// Get properties by purpose (for-rent or for-sale)
export const getPropertiesByPurpose = async (purpose) => {
  try {
    const q = query(
      collection(db, 'properties'),
      where('isVisible', '==', true),
      where('purpose', '==', purpose),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching properties by purpose:', error);
    return [];
  }
};

// Transform Firebase property to match existing data structure
export const transformFirebaseProperty = (property) => {
  return {
    id: property.id,
    title: property.title || 'Untitled Property',
    purpose: property.purpose || 'for-rent',
    price: property.price || 0,
    rentFrequency: property.purpose === 'for-rent' ? 'Monthly' : null,
    rooms: property.rooms || 1,
    baths: property.baths || 1,
    area: property.area || 0,
    agency: {
      name: 'D&M Letting'
    },
    isVerified: true,
    location: [
      {
        name: property.location || 'Location not specified'
      }
    ],
    amenities: property.amenities || [],
    // Handle both images array and coverPhoto for compatibility
    photos: property.images ? property.images.map((url, index) => ({
      id: index,
      url: url
    })) : [],
    coverPhoto: property.images && property.images.length > 0 ? {
      url: property.images[0]
    } : null,
    description: property.description || '',
    type: property.type || 'apartment',
    furnishingStatus: property.furnishingStatus || null,
    createdAt: property.createdAt,
    updatedAt: property.updatedAt,
    // Add some default values for compatibility
    score_l1: Math.floor(Math.random() * 100) + 50, // Random score between 50-150
    randBoostScore: Math.floor(Math.random() * 500) + 100, // Random boost score
    externalID: property.id // Use Firebase ID as external ID
  };
};
