export interface IIntegrationModel {
  id: string;  // UUID
  integrationName: string;
  purpose?: string;
  application: string;
  connectionType: string;  // UUID reference to masterListValue
  integrationCategory: string;  // UUID reference to masterListValue
  authenticationType: string;  // UUID reference to masterListValue
  status: string;  // UUID reference to masterListValue
  connectionLimit?: number;
  createdAt: string;  // Timestamp
  createdBy: string;  // UUID reference to users
  updatedAt?: string | null;  // Timestamp
  lastUpdatedBy?: string | null;  // UUID reference to users
  deletedAt?: string | null;  // Timestamp
  deletedBy?: string | null;  // UUID reference to users
  syncToken?: string | null;  // UUID
} 