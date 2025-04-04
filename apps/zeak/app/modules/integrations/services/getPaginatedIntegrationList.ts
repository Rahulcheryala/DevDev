import { PrismaClient, Status } from '@prisma/client'
import { IIntegrationModel } from "../models/integration.model";

export interface IntegrationsQuery {
    id?: string;
    integrationName?: string;
    applicationName?: string;
    integrationCode?: string;
    status?: Status;
    integrationType?: string;
    connectionType?: string;
    integrationCategory?: string;
    isTested?: boolean;
    companyIds?: string[];
    tags?: string[];
    page?: number;
    limit?: number;
    deletedAt?: Date | null;
    copies?: number;
  }
  
  export async function getPaginatedIntegrationsList(
    prisma: PrismaClient,
    filters: Partial<IntegrationsQuery>,
    page?: number,
    limit?: number
  ) {
    const {
      id,
      integrationName,
      applicationName,
      integrationCode,
      status,
      integrationType,
      connectionType,
      integrationCategory,
      isTested,
      companyIds,
      tags,
    } = filters;
  
    const pageNumber = page || 1;
    const pageSize = limit || 10;
    const skip = (pageNumber - 1) * pageSize;
  
    const whereClause: any = {};
  
    if (id) {
      whereClause.id = id;
    }
  
    if (integrationName) {
      whereClause.integrationName = {
        equals: integrationName,
      };
    }
  
    if (applicationName) {
      whereClause.applicationName = {
        contains: applicationName,
        mode: 'insensitive',
      };
    }
  
    if (integrationCode) {
      whereClause.integrationCode = {
        contains: integrationCode,
        mode: 'insensitive',
      };
    }
  
    if (status) {
      whereClause.status = status;
    }
  
    if (integrationType) {
      whereClause.integrationType = integrationType;
    }
  
    if (connectionType) {
      whereClause.connectionType = connectionType;
    }
  
    if (integrationCategory) {
      whereClause.integrationCategory = integrationCategory;
    }
  
    if (isTested !== undefined) {
      whereClause.isTested = isTested;
    }
  
    if (companyIds && companyIds.length > 0) {
      whereClause.companyIds = {
        hasSome: companyIds,
      };
    }
  
    if (tags && tags.length > 0) {
      whereClause.tags = {
        hasSome: tags,
      };
    }
  
    // Soft delete filter
    whereClause.deletedAt = null;
  
    const [integrations, totalCount] = await Promise.all([
      prisma.integrationsMaster.findMany({
        where: whereClause,
        skip,
        take: pageSize,
        orderBy: {
          integrationName: 'asc',
        },
      //   include: {
      //     createdByUser: {
      //       select: {
      //         id: true,
      //         firstName: true,
      //         lastName: true,
      //         email: true,
      //       },
      //     },
      //   },
      }),
      prisma.integrationsMaster.count({
        where: whereClause,
      }),
    ]);
  
    const totalPages = Math.ceil(totalCount / pageSize);
  
    return {
      data: integrations as unknown as IIntegrationModel[],
      pagination: {
        total: totalCount,
        pageSize,
        current: pageNumber,
        totalPages,
      },
    };
  }
  
  export async function getIntegrationById(
    prisma: PrismaClient,
    id: string
  ) {
    const integration = await prisma.integrationsMaster.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      // include: {
      //   createdByUser: {
      //     select: {
      //       id: true,
      //       firstName: true,
      //       lastName: true,
      //       email: true,
      //     },
      //   },
      // },
    });
  
    return integration as IIntegrationModel | null;
  }
  