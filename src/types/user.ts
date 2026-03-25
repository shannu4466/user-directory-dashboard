export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  status: 'active' | 'inactive';
  lastSeen: string;
  avatarUrl: string;
}
