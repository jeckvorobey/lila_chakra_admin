export interface UserOut {
  id: string | number;
  telegram_id: number;
  username?: string | null;
  first_name: string;
  last_name?: string | null;
  language_code?: string;
  balance: number;
  photo_url?: string | null;
  is_admin: boolean;
  total_games?: number;
  completed_games?: number;
  created_at?: string;
  login?: string; // Adding login if it's used in admin table as an alias or extra field
}
