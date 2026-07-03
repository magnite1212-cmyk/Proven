export type UserRole = 'admin' | 'clinic' | 'patient';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  clinicId?: string;
  clinicName?: string;
  patientId?: string;
  name?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface ClinicProfile {
  id: string;
  name: string;
  logo?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  branches?: BranchLocation[];
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BranchLocation {
  id: string;
  address: string;
  googleMapsLink?: string;
}

export interface NotificationPreferences {
  enabled: boolean;
  grantedAt?: Date;
}
