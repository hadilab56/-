export interface User {
  id: number;
  name: string | null;
  email: string | null;
  password: string | null;
  address: string | null;
  phone: string | null;
  role: string;
}
