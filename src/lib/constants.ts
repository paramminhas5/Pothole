import { Category, CityArea } from '@/types';

export const CATEGORIES: { value: Category; labelEn: string; labelHi: string }[] = [
  { value: 'legal', labelEn: 'Legal Aid', labelHi: 'कानूनी सहायता' },
  { value: 'medical', labelEn: 'Medical', labelHi: 'चिकित्सा' },
  { value: 'food-water', labelEn: 'Food & Water', labelHi: 'भोजन और पानी' },
  { value: 'transport', labelEn: 'Transport', labelHi: 'परिवहन' },
  { value: 'shelter', labelEn: 'Shelter', labelHi: 'आश्रय' },
  { value: 'translation', labelEn: 'Translation', labelHi: 'अनुवाद' },
  { value: 'documentation', labelEn: 'Documentation', labelHi: 'दस्तावेज़ीकरण' },
  { value: 'supplies', labelEn: 'Supplies', labelHi: 'आपूर्ति' },
  { value: 'general-organizing', labelEn: 'General Organizing', labelHi: 'सामान्य संगठन' },
  { value: 'media', labelEn: 'Media & Documentation', labelHi: 'मीडिया और दस्तावेज़ीकरण' },
  { value: 'other', labelEn: 'Other', labelHi: 'अन्य' },
];

// Fixed city/area list — privacy by design, no precise addresses
export const CITIES_AREAS: CityArea[] = [
  {
    city: 'Delhi',
    areas: ['North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi', 'New Delhi'],
  },
  {
    city: 'Mumbai',
    areas: ['South Mumbai', 'Western Suburbs', 'Eastern Suburbs', 'Navi Mumbai', 'Thane'],
  },
  {
    city: 'Bengaluru',
    areas: ['Central Bengaluru', 'North Bengaluru', 'South Bengaluru', 'East Bengaluru', 'West Bengaluru'],
  },
  {
    city: 'Hyderabad',
    areas: ['Central Hyderabad', 'Secunderabad', 'Cyberabad', 'Old City', 'Outer Ring'],
  },
  {
    city: 'Chennai',
    areas: ['North Chennai', 'South Chennai', 'Central Chennai', 'West Chennai'],
  },
  {
    city: 'Kolkata',
    areas: ['North Kolkata', 'South Kolkata', 'Central Kolkata', 'East Kolkata', 'Salt Lake'],
  },
  {
    city: 'Pune',
    areas: ['Central Pune', 'Kothrud', 'Hinjewadi', 'Hadapsar', 'Pimpri-Chinchwad'],
  },
  {
    city: 'Ahmedabad',
    areas: ['Central Ahmedabad', 'West Ahmedabad', 'East Ahmedabad', 'SG Highway'],
  },
  {
    city: 'Jaipur',
    areas: ['Walled City', 'Civil Lines', 'Malviya Nagar', 'Vaishali Nagar', 'Mansarovar'],
  },
  {
    city: 'Lucknow',
    areas: ['Hazratganj', 'Gomti Nagar', 'Aliganj', 'Indira Nagar', 'Aminabad'],
  },
  {
    city: 'Chandigarh',
    areas: ['Sector 1-20', 'Sector 21-40', 'Sector 41-60', 'Manimajra', 'Mohali Border'],
  },
  {
    city: 'Bhopal',
    areas: ['Old Bhopal', 'New Bhopal', 'Kolar', 'Hoshangabad Road', 'Bairagarh'],
  },
];

export const POST_EXPIRY_HOURS = 72;
export const MAX_DESCRIPTION_LENGTH = 500;
export const RATE_LIMIT_POSTS_PER_HOUR = 5;
export const RATE_LIMIT_URGENT_PER_DAY = 2;
