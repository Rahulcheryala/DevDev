import { PrismaClient, Status } from '@prisma/client'
import { IConnectionModel } from '../models/connection.model';

// export interface IntegrationsQuery {
//     id?: string;
//     integrationName?: string;
//     applicationName?: string;
//     integrationCode?: string;
//     status?: Status;
//     integrationType?: string;
//     connectionType?: string;
//     integrationCategory?: string;
//     isTested?: boolean;
//     companyIds?: string[];
//     tags?: string[];
//     page?: number;
//     limit?: number;
//   }
  
  export async function getPaginatedConnectionsList(
    prisma: PrismaClient,
    // filters: Partial<IntegrationsQuery>,
    // page?: number,
    // limit?: number
  ) {
    // const {
    //   id,
    //   integrationName,
    //   applicationName,
    //   integrationCode,
    //   status,
    //   integrationType,
    //   connectionType,
    //   integrationCategory,
    //   isTested,
    //   companyIds,
    //   tags,
    // } = filters;
  
    // const pageNumber = page || 1;
    // const pageSize = limit || 10;
    // const skip = (pageNumber - 1) * pageSize;
  
    // const whereClause: any = {};
  
    // if (id) {
    //   whereClause.id = id;
    // }
  
    // if (integrationName) {
    //   whereClause.integrationName = {
    //     contains: integrationName,
    //     mode: 'insensitive',
    //   };
    // }
  
    // if (applicationName) {
    //   whereClause.applicationName = {
    //     contains: applicationName,
    //     mode: 'insensitive',
    //   };
    // }
  
    // if (integrationCode) {
    //   whereClause.integrationCode = {
    //     contains: integrationCode,
    //     mode: 'insensitive',
    //   };
    // }
  
    // if (status) {
    //   whereClause.status = status;
    // }
  
    // if (integrationType) {
    //   whereClause.integrationType = integrationType;
    // }
  
    // if (connectionType) {
    //   whereClause.connectionType = connectionType;
    // }
  
    // if (integrationCategory) {
    //   whereClause.integrationCategory = integrationCategory;
    // }
  
    // if (isTested !== undefined) {
    //   whereClause.isTested = isTested;
    // }
  
    // if (companyIds && companyIds.length > 0) {
    //   whereClause.companyIds = {
    //     hasSome: companyIds,
    //   };
    // }
  
    // if (tags && tags.length > 0) {
    //   whereClause.tags = {
    //     hasSome: tags,
    //   };
    // }
  
    // // Soft delete filter
    // whereClause.deletedAt = null;
  
    const [connections, totalCount] = await Promise.all([
      prisma.integrationConnections.findMany({
        // where: whereClause,
        // skip,
        // take: pageSize,
        orderBy: {
          createdAt: 'desc',
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
      prisma.integrationConnections.count({
        where: {
          deletedAt: null,
        },
      }),
    ]);

    // console.log(totalCount);
  
    // const totalPages = Math.ceil(totalCount / pageSize);
  
    return {
      // data: integrations, // TODO(vamsi): Add the data type for type 
      // specifications
      data: connections as unknown as IConnectionModel[],
    //   pagination: {
    //     total: totalCount,
    //     pageSize,
    //     current: pageNumber,
    //     totalPages,
    //   },
    };
  }

  