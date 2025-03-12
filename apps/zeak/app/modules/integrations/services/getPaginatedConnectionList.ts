import { PrismaClient, Status } from '@prisma/client'
import { IConnectionModel } from '../models/connection.model';

export interface ConnectionsQuery {
    id?: string;
    connectionName?: string;
    connectionStatus?: Status;
    integrationName?: string;
    applicationName?: string;
    connectionDescription?: string;
    errors?: number;
    updatedAt?: Date;
    lastTestedAt?: Date;
    // createdAt?: Date;
    isOnline?: boolean;
  }
  
  export async function getPaginatedConnectionsList(
    prisma: PrismaClient,
    filters: Partial<ConnectionsQuery>,
    page?: number,
    limit?: number
  ) {
    const {
      id,
      connectionName,
      connectionStatus,
      integrationName,
      applicationName,
      connectionDescription,
      errors,
      updatedAt,
      lastTestedAt,
      // createdAt,
      isOnline,
    } = filters;
  
    const pageNumber = page || 1;
    const pageSize = limit || 15; // TODO(vamsi): Change this to 10 and check if the pagination is working
    const skip = (pageNumber - 1) * pageSize;
  
    const whereClause: any = {};
  
    if (id) {
      whereClause.id = id;
    }
  
    if (connectionName) {
      whereClause.connectionName = {
        contains: connectionName,
        mode: 'insensitive',
      };
    }

    if (connectionStatus) {
      whereClause.connectionStatus = {
        contains: connectionStatus,
        mode: 'insensitive',
      };
    }

    if (integrationName) {
      whereClause.integrationName = {
        contains: integrationName,
        mode: 'insensitive',
      };
    }
  
    if (applicationName) {
      whereClause.applicationName = {
        contains: applicationName,
        mode: 'insensitive',
      };
    }
  
    if (connectionDescription) {
      whereClause.connectionDescription = {
        contains: connectionDescription,
        mode: 'insensitive',
      };
    }
  
    if (errors) {
      whereClause.errors = errors;
    }
  
    if (updatedAt) {
      whereClause.updatedAt = updatedAt;
    }
  
    if (lastTestedAt) {
      whereClause.lastTestedAt = lastTestedAt;
    }
  
    if (isOnline) {
      whereClause.isOnline = isOnline;
    }
  
    // Soft delete filter
    whereClause.deletedAt = null;
  
    const [connections, totalCount] = await Promise.all([
      prisma.integrationConnections.findMany({
        where: whereClause,
        skip,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          // createdByUser: {
          //   select: {
          //     id: true,
          //     firstName: true,
          //     lastName: true,
          //     email: true,
          //   },
          // },
          integration: {
            select: {
              integrationName: true,
              applicationName: true,
              integrationCategory: true,
              authType: true,
              logo: true,
            },
          },
        },
      }),
      prisma.integrationConnections.count({
        where: {
          deletedAt: null,
        },
      }),
    ]);

    // console.log(totalCount);
  
    const totalPages = Math.ceil(totalCount / pageSize);
  
    return {
      data: connections as unknown as IConnectionModel[],
      pagination: {
        total: totalCount,
        pageSize,
        current: pageNumber,
        totalPages,
      },
    };
  }

  