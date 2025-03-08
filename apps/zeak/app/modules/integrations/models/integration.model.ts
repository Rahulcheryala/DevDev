import {
  ApplicationName,
  IntegrationType,
  IntegrationCategory,
  ConnectionType,
  Status,
  LastTestResult,
  AuthType
} from "@prisma/client";

export interface IIntegrationModel {
  id: string;
  integrationName: string;
  applicationName: ApplicationName;
  integrationCode: string;
  logo?: string;
  description?: string;
  isFavorite: boolean;
  integrationType: IntegrationType;
  integrationCategory: IntegrationCategory;
  connectionType: ConnectionType;
  authType: AuthType;
  connectionLimit: number;
  status: Status;
  companyIds: string[];
  tags?: any;
  isTested: boolean;
  lastTestedAt?: Date;
  lastTestedBy?: string;
  lastTestResult?: LastTestResult;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  lastUpdatedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
  syncToken: string;
}
