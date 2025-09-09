export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  subscription?: string;
  downloadCount: number;
  monthlyDownloadCount: number;
  lastDownloadReset: string;
  favorites: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
}

export interface UserStats {
  totalDownloads: number;
  monthlyDownloads: number;
  favoritesCount: number;
  joinedDate: string;
  subscriptionStatus?: 'active' | 'inactive' | 'cancelled' | 'past_due';
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  avatar?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
