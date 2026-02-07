export interface AdminUser {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  admin: AdminUser;
}

export interface LoginPayload {
  email: string;
  password: string;
}
