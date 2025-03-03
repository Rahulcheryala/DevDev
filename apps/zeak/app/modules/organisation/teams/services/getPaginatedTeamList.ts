import { PrismaClient } from '@prisma/client'
import { decodeValue } from '../../../departments/utils/decode.utils'
import { ITeamModel } from '../models/team.model'
import { fetchCustomSchemaPrismaInstance } from '../../../../utils/prisma'

export interface TeamsQuery {
  id?: string
  name?: string
  teamCode?: string
  status?: 'Active' | 'Inactive'  // assuming these are the possible values
  visibility?: 'Private' | 'Public'
  startDate?: string
  endDate?: string
  companyId?: string
  parentTeamId?: string
  teamLeaderId?: string
  isArchived?: boolean
  createdBy?: string
  lastUpdatedBy?: string
  deletedAt?: string | null
  checkDuplicacy?: boolean
}

export const getTeamsList = async (
  prisma: PrismaClient,
  filters: Partial<TeamsQuery>,
  checkDuplicacy?: boolean,
  page?: number,
  limit?: number
) => {
  // Construct the where clause based on filters
  const where: any = {
    ...filters.id && { id: filters.id },
    ...filters.name && { 
      name: checkDuplicacy 
        ? { equals: filters.name, mode: 'insensitive' }
        : { contains: filters.name, mode: 'insensitive' } 
    },
    ...filters.teamCode && { 
      teamCode: checkDuplicacy 
        ? { equals: filters.teamCode, mode: 'insensitive' }
        : { contains: filters.teamCode, mode: 'insensitive' } 
    },
    ...filters.status && { status: filters.status },
    ...filters.visibility && { visibility: filters.visibility },
    ...filters.companyId && { companyId: filters.companyId },
    ...filters.parentTeamId && { parentTeamId: filters.parentTeamId },
    ...filters.teamLeaderId && { teamLeaderId: filters.teamLeaderId },
    ...filters.isArchived !== undefined && { isArchived: filters.isArchived },
    ...filters.createdBy && { createdBy: filters.createdBy },
    ...filters.lastUpdatedBy && { lastUpdatedBy: filters.lastUpdatedBy },
    ...filters.startDate && { startDate: { gte: filters.startDate } },
    ...filters.endDate && { endDate: { lte: filters.endDate } },
  };

  // Calculate skip and take only if page and limit are provided
  const skip = page && limit ? (page - 1) * limit : undefined;
  const take = limit;

  try {
    const [data, total] = await Promise.all([
      prisma.teams.findMany({
        where,
        include: {
          teamUsers: {
            where: {
              isActive: true,
              removedAt: null // Add this to ensure we only get active records
            },
            include: {
              user: true
            }
          },
          parentTeam: {
            select: {
              id: true,
              name: true,
              teamCode: true,
              status: true,
              visibility: true,
              imageUrl: true,
            }
          },
          teamLeader: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            }
          },
          // createdByUser: {
          //   select: {
          //     id: true,
          //     firstName: true,
          //     lastName: true,
          //     email: true,
          //   }
          // },
          // lastUpdatedByUser: {
          //   select: {
          //     id: true,
          //     firstName: true,
          //     lastName: true,
          //     email: true,
          //   }
          // },
          // deletedByUser: {
          //   select: {
          //     id: true,
          //     firstName: true,
          //     lastName: true,
          //     email: true,
          //   }
          // }
        } as never,
        ...(skip !== undefined && { skip }),
        ...(take !== undefined && { take }),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.teams.count({ where })
    ]);

    const publicSchemaPrisma = fetchCustomSchemaPrismaInstance('public');
    const users = await publicSchemaPrisma.user.findMany({
      where: {
        id: {
          in: [...new Set(data.flatMap((team) => [team.createdBy, team.lastUpdatedBy, team.deletedBy]))].filter((id): id is string => id !== null)
        }
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phno: true,
        avatarUrl: true,
      }
    });

    const userMap = new Map(users.map(user => [user.id, user]));

    // Format the response
    const formattedData: any[] = (data as unknown as ITeamModel[]).map((team) => ({
      ...team,
      teamUsers: team.teamUsers?.filter(tu => !tu.removedAt).map(tu => ({
        ...tu,
        user: tu.user && {
          ...tu.user,
          firstName: decodeValue(tu.user.firstName as unknown as Uint8Array<ArrayBufferLike>),
          lastName: decodeValue(tu.user.lastName as unknown as Uint8Array<ArrayBufferLike>),
          email: decodeValue(tu.user.email as unknown as Uint8Array<ArrayBufferLike>)
        }
      })),
      teamLeader: team.teamLeader && {
        ...team.teamLeader,
        firstName: decodeValue(team.teamLeader.firstName as unknown as Uint8Array<ArrayBufferLike>),
        lastName: decodeValue(team.teamLeader.lastName as unknown as Uint8Array<ArrayBufferLike>),
        email: decodeValue(team.teamLeader.email as unknown as Uint8Array<ArrayBufferLike>)
      },
      teamLeaderEmail: team.teamLeader && decodeValue(team.teamLeader.email as unknown as Uint8Array<ArrayBufferLike>),
      createdByUser: userMap.get(team.createdBy),
      lastUpdatedByUser: userMap.get(team.lastUpdatedBy!),
      deletedByUser: userMap.get(team.deletedBy!),
    }));

    return {
      data: formattedData || [],
      total,
      page: page || 1,
      limit: limit || total,
      totalPages: limit ? Math.ceil(total / limit) : 1
    };
  } catch (error: any) {
    throw new Error(`Error fetching teams: ${error.message}`);
  }
}
