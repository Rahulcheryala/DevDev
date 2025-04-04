import { EmployeeUser } from "../../../../components/types/employee-user.model"
import { TeamStatus } from "../../company/types"
type TeamVisibility = 'Private' | 'Public' // Update with actual values from golden.teamVisibility
type TeamUserRole = 'Member' | 'Admin'

interface ITeam {
  id: string
  companyId: string
  name: string
  teamCode: string
  description?: string
  status: TeamStatus
  parentTeamId?: string
  teamLeaderId?: string
  visibility: TeamVisibility
  userCount?: number
  startDate?: string
  endDate?: string
  metadata?: Record<string, any>
  createdAt: string
  createdBy: string
  updatedAt?: string
  lastUpdatedBy?: string
  deletedAt?: string
  deletedBy?: string
  version: number
  imageUrl?: string
  isArchived: boolean
  syncToken?: string
}

interface TeamUser {
  id: string
  teamId: string
  userId: string
  role: TeamUserRole
  isActive: boolean
  addedAt: string
  addedBy: string
  removedAt?: string
  removedBy?: string
  lastActivityAt?: string
  notes?: string
  syncToken?: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatarUrl?: string
  phno?: string
}

export type ITeamModel = ITeam & {
  teamUsers: (TeamUser & {
    user: EmployeeUser
  })[]
  parentTeam?: Pick<ITeam, 'id' | 'name' | 'teamCode' | 'description'>
  teamLeader?: User
  createdByUser: User | null
  lastUpdatedByUser?: User | null
  deletedByUser?: User | null
}

