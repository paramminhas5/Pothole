// Core types for the Sahayata Civic Mutual-Aid Platform

export type Category =
  | 'legal' | 'medical' | 'food-water' | 'transport' | 'shelter'
  | 'translation' | 'documentation' | 'supplies' | 'general-organizing'
  | 'media' | 'other';
export type PostType = 'need' | 'offer';
export type Urgency = 'routine' | 'urgent';
export type ModerationStatus = 'pending' | 'approved' | 'rejected';
export type Locale = 'en' | 'hi';

export interface PublicChapter {
  id: string;
  name: string;
  city: string;
  area: string;
  categories: Category[];
  contact_method: string;
  description: string;
  updated_at: string;
}

export interface Chapter extends PublicChapter {
  status: ModerationStatus;
  created_at: string;
}

export interface PublicPost {
  id: string;
  type: PostType;
  category: Category;
  city: string;
  area: string;
  description: string;
  urgency: Urgency;
  expires_at: string;
  created_at: string;
}

// Internal/owner DTO. Public APIs must return PublicPost instead.
export interface Post extends PublicPost {
  status: ModerationStatus;
  reported_count: number;
  resolved: boolean;
}

export interface OwnedPost extends Post {
  responses: ContactResponse[];
}

export interface Report {
  id: string;
  target_type: 'chapter' | 'post';
  target_id: string;
  reason: string;
  created_at: string;
}

export interface ContactResponse {
  id: string;
  post_id: string;
  responder_contact: string;
  responder_message: string;
  created_at: string;
}

export interface CityArea {
  city: string;
  areas: string[];
}
