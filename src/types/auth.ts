export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  subscription?: {
    id: string;
    planId: string;
    status: 'active' | 'inactive' | 'cancelled' | 'past_due';
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
  };
  downloadCount: number;
  monthlyDownloadCount: number;
  favorites: string[];
  isActive: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
  iat: number;
  exp: number;
}
