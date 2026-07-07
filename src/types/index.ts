export interface User {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface AuthState {
  phone: string;
  otp: string;
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
