export interface AdminUser {
  id: number;
  login: string;
  email?: string;
  role?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user?: AdminUser;
}

export interface LoginPayload {
  username: string;
  password: string;
}
