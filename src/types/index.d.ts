//login-register
export interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
  detail?: string;
  error?: string;
}

export interface RegisterResponse {
  user: User;
  access: string;
  refresh: string;
  detail?: string;
  error?: string;
}

//user
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  photo: string | null;
}

//cookies
export interface UserCookiesContextType {
  saveUser: (user: User) => void;
  removeUser: () => void;
  getUser: () => User | null;
  saveAccessToken: (token: string) => void;
  removeAccessToken: () => void;
  getAccessToken: () => string | undefined;
  saveRefreshToken: (token: string) => void;
  removeRefreshToken: () => void;
  getRefreshToken: () => string | undefined;
  removeSession: () => void;
}