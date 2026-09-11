export type AdminRole = "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  originalFilename: string;
  storageBucket: string;
  storagePath: string;
  publicUrl: string;
  mimeType: string;
  fileSize: number;
  isActive: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalPages: number;
  totalMedia: number;
  contactSubmissions: number;
  volunteerApplications: number;
}
