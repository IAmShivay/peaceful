export interface Sound {
  id: string;
  title: string;
  description?: string;
  duration: number;
  fileUrl: string;
  thumbnailUrl?: string;
  waveformUrl?: string;
  fileSize: number;
  format: 'mp3' | 'wav' | 'flac' | 'aac' | 'm4a' | 'ogg';
  quality: 'standard' | 'high' | 'premium';
  categoryId: string;
  category?: Category;
  tags: string[];
  isPublic: boolean;
  isPremium: boolean;
  downloadCount: number;
  playCount: number;
  uploadedBy: string;
  uploader?: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SoundUpload {
  title: string;
  description?: string;
  categoryId: string;
  tags: string[];
  isPublic: boolean;
  isPremium: boolean;
  quality: 'standard' | 'high' | 'premium';
  file: File;
  thumbnail?: File;
}

export interface SoundFilter {
  category?: string;
  tags?: string[];
  quality?: 'standard' | 'high' | 'premium';
  isPremium?: boolean;
  duration?: {
    min?: number;
    max?: number;
  };
  sortBy?: 'newest' | 'oldest' | 'popular' | 'downloads' | 'title';
  search?: string;
}

export interface SoundStats {
  totalSounds: number;
  totalDownloads: number;
  totalPlays: number;
  averageRating: number;
  topCategories: Array<{
    categoryId: string;
    categoryName: string;
    count: number;
  }>;
}

import { Category } from './category';
