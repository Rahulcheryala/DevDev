export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  golden: {
    Tables: {
      addressMaster: {
        Row: {
          address1: string | null
          address2: string | null
          addressId: string
          city: string | null
          companyId: string
          contextId: number
          country: string | null
          county: string | null
          createdAt: string | null
          createdBy: string | null
          deletedAt: string | null
          deletedBy: string | null
          formattedAddress: string | null
          googlePlaceId: string | null
          isActive: boolean | null
          isRestricted: boolean | null
          lastUpdatedAt: string | null
          lastUpdatedBy: string | null
          latitude: number | null
          longitude: number | null
          postalCode: string | null
          state: string | null
          validFrom: string | null
          validTo: string | null
          verificationStatus:
            | Database["golden"]["Enums"]["verificationStatus"]
            | null
        }
        Insert: {
          address1?: string | null
          address2?: string | null
          addressId?: string
          city?: string | null
          companyId: string
          contextId: number
          country?: string | null
          county?: string | null
          createdAt?: string | null
          createdBy?: string | null
          deletedAt?: string | null
          deletedBy?: string | null
          formattedAddress?: string | null
          googlePlaceId?: string | null
          isActive?: boolean | null
          isRestricted?: boolean | null
          lastUpdatedAt?: string | null
          lastUpdatedBy?: string | null
          latitude?: number | null
          longitude?: number | null
          postalCode?: string | null
          state?: string | null
          validFrom?: string | null
          validTo?: string | null
          verificationStatus?:
            | Database["golden"]["Enums"]["verificationStatus"]
            | null
        }
        Update: {
          address1?: string | null
          address2?: string | null
          addressId?: string
          city?: string | null
          companyId?: string
          contextId?: number
          country?: string | null
          county?: string | null
          createdAt?: string | null
          createdBy?: string | null
          deletedAt?: string | null
          deletedBy?: string | null
          formattedAddress?: string | null
          googlePlaceId?: string | null
          isActive?: boolean | null
          isRestricted?: boolean | null
          lastUpdatedAt?: string | null
          lastUpdatedBy?: string | null
          latitude?: number | null
          longitude?: number | null
          postalCode?: string | null
          state?: string | null
          validFrom?: string | null
          validTo?: string | null
          verificationStatus?:
            | Database["golden"]["Enums"]["verificationStatus"]
            | null
        }
        Relationships: []
      }
      addressRelation: {
        Row: {
          addressId: string
          addressRelationId: string
          addressType: Database["golden"]["Enums"]["addressType"]
          contactId: string | null
          createdAt: string | null
          createdBy: string | null
          createdByUserId: string | null
          deletedAt: string | null
          deletedBy: string | null
          effectiveEndDate: string | null
          effectiveStartDate: string | null
          entityName: Database["golden"]["Enums"]["entityType"]
          isPrimary: boolean | null
          isVerified: boolean | null
          lastUpdatedAt: string | null
          lastUpdatedBy: string | null
          lastVerifiedOn: string | null
          notes: string | null
        }
        Insert: {
          addressId: string
          addressRelationId?: string
          addressType: Database["golden"]["Enums"]["addressType"]
          contactId?: string | null
          createdAt?: string | null
          createdBy?: string | null
          createdByUserId?: string | null
          deletedAt?: string | null
          deletedBy?: string | null
          effectiveEndDate?: string | null
          effectiveStartDate?: string | null
          entityName: Database["golden"]["Enums"]["entityType"]
          isPrimary?: boolean | null
          isVerified?: boolean | null
          lastUpdatedAt?: string | null
          lastUpdatedBy?: string | null
          lastVerifiedOn?: string | null
          notes?: string | null
        }
        Update: {
          addressId?: string
          addressRelationId?: string
          addressType?: Database["golden"]["Enums"]["addressType"]
          contactId?: string | null
          createdAt?: string | null
          createdBy?: string | null
          createdByUserId?: string | null
          deletedAt?: string | null
          deletedBy?: string | null
          effectiveEndDate?: string | null
          effectiveStartDate?: string | null
          entityName?: Database["golden"]["Enums"]["entityType"]
          isPrimary?: boolean | null
          isVerified?: boolean | null
          lastUpdatedAt?: string | null
          lastUpdatedBy?: string | null
          lastVerifiedOn?: string | null
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addressRelation_addressId_fkey"
            columns: ["addressId"]
            isOneToOne: false
            referencedRelation: "addressMaster"
            referencedColumns: ["addressId"]
          },
        ]
      }
      allTables: {
        Row: {
          complianceTag: Database["public"]["Enums"]["complianceType"] | null
          containsPii: boolean
          createdAt: string
          createdBy: string
          dataRetentionDays: number | null
          deletedAt: string | null
          deletedBy: string | null
          encryptionRequired: boolean
          foreignKeys: Json | null
          id: string
          includeInTenantSchema: boolean
          isTenantSpecific: boolean | null
          lastUpdatedBy: string | null
          module: string | null
          nullable: boolean
          parentTable: string | null
          purpose: string | null
          referenceTenantId: string | null
          schemaName: string
          tableName: string
          tableType: Database["public"]["Enums"]["tableType"] | null
          updatedAt: string | null
        }
        Insert: {
          complianceTag?: Database["public"]["Enums"]["complianceType"] | null
          containsPii?: boolean
          createdAt?: string
          createdBy: string
          dataRetentionDays?: number | null
          deletedAt?: string | null
          deletedBy?: string | null
          encryptionRequired?: boolean
          foreignKeys?: Json | null
          id?: string
          includeInTenantSchema?: boolean
          isTenantSpecific?: boolean | null
          lastUpdatedBy?: string | null
          module?: string | null
          nullable: boolean
          parentTable?: string | null
          purpose?: string | null
          referenceTenantId?: string | null
          schemaName: string
          tableName: string
          tableType?: Database["public"]["Enums"]["tableType"] | null
          updatedAt?: string | null
        }
        Update: {
          complianceTag?: Database["public"]["Enums"]["complianceType"] | null
          containsPii?: boolean
          createdAt?: string
          createdBy?: string
          dataRetentionDays?: number | null
          deletedAt?: string | null
          deletedBy?: string | null
          encryptionRequired?: boolean
          foreignKeys?: Json | null
          id?: string
          includeInTenantSchema?: boolean
          isTenantSpecific?: boolean | null
          lastUpdatedBy?: string | null
          module?: string | null
          nullable?: boolean
          parentTable?: string | null
          purpose?: string | null
          referenceTenantId?: string | null
          schemaName?: string
          tableName?: string
          tableType?: Database["public"]["Enums"]["tableType"] | null
          updatedAt?: string | null
        }
        Relationships: []
      }
      contactMaster: {
        Row: {
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          email: string | null
          emailSearch: string | null
          firstName: string
          firstNameSearch: string | null
          id: string
          lastName: string
          lastNameSearch: string | null
          lastUpdatedBy: string | null
          phone: string | null
          phoneSearch: string | null
          syncData: Json | null
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          email?: string | null
          emailSearch?: string | null
          firstName: string
          firstNameSearch?: string | null
          id?: string
          lastName: string
          lastNameSearch?: string | null
          lastUpdatedBy?: string | null
          phone?: string | null
          phoneSearch?: string | null
          syncData?: Json | null
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          email?: string | null
          emailSearch?: string | null
          firstName?: string
          firstNameSearch?: string | null
          id?: string
          lastName?: string
          lastNameSearch?: string | null
          lastUpdatedBy?: string | null
          phone?: string | null
          phoneSearch?: string | null
          syncData?: Json | null
          updatedAt?: string | null
        }
        Relationships: []
      }
      contactRelationships: {
        Row: {
          contactId: string
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          entityId: string
          entityType: string
          entityTypeSearch: string | null
          id: string
          lastUpdatedBy: string | null
          relationshipType: string | null
          relationshipTypeSearch: string | null
          syncData: Json | null
          updatedAt: string | null
        }
        Insert: {
          contactId: string
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          entityId: string
          entityType: string
          entityTypeSearch?: string | null
          id?: string
          lastUpdatedBy?: string | null
          relationshipType?: string | null
          relationshipTypeSearch?: string | null
          syncData?: Json | null
          updatedAt?: string | null
        }
        Update: {
          contactId?: string
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          entityId?: string
          entityType?: string
          entityTypeSearch?: string | null
          id?: string
          lastUpdatedBy?: string | null
          relationshipType?: string | null
          relationshipTypeSearch?: string | null
          syncData?: Json | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contactRelationships_contactId_fkey"
            columns: ["contactId"]
            isOneToOne: false
            referencedRelation: "contactMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          companyId: string
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          departmentCode: string
          description: string | null
          effectiveEndDate: string | null
          effectiveStartDate: string | null
          id: string
          isArchived: boolean
          lastUpdatedBy: string | null
          logo: string | null
          metadata: Json | null
          name: string
          status: Database["golden"]["Enums"]["departmentStatus"]
          supervisor: string | null
          syncToken: string | null
          updatedAt: string | null
          version: number
        }
        Insert: {
          companyId: string
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          departmentCode: string
          description?: string | null
          effectiveEndDate?: string | null
          effectiveStartDate?: string | null
          id?: string
          isArchived?: boolean
          lastUpdatedBy?: string | null
          logo?: string | null
          metadata?: Json | null
          name: string
          status?: Database["golden"]["Enums"]["departmentStatus"]
          supervisor?: string | null
          syncToken?: string | null
          updatedAt?: string | null
          version?: number
        }
        Update: {
          companyId?: string
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          departmentCode?: string
          description?: string | null
          effectiveEndDate?: string | null
          effectiveStartDate?: string | null
          id?: string
          isArchived?: boolean
          lastUpdatedBy?: string | null
          logo?: string | null
          metadata?: Json | null
          name?: string
          status?: Database["golden"]["Enums"]["departmentStatus"]
          supervisor?: string | null
          syncToken?: string | null
          updatedAt?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "departments_supervisor_fkey"
            columns: ["supervisor"]
            isOneToOne: false
            referencedRelation: "employeeMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      empAddresses: {
        Row: {
          addressType: Database["public"]["Enums"]["addressTypeEnum"]
          city: string
          country: string
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          employeeId: string
          id: string
          isDefault: boolean
          lastUpdatedBy: string | null
          postalCode: string
          state: string
          street: string
          syncData: Json | null
          updatedAt: string | null
        }
        Insert: {
          addressType: Database["public"]["Enums"]["addressTypeEnum"]
          city: string
          country: string
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          employeeId: string
          id?: string
          isDefault?: boolean
          lastUpdatedBy?: string | null
          postalCode: string
          state: string
          street: string
          syncData?: Json | null
          updatedAt?: string | null
        }
        Update: {
          addressType?: Database["public"]["Enums"]["addressTypeEnum"]
          city?: string
          country?: string
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          employeeId?: string
          id?: string
          isDefault?: boolean
          lastUpdatedBy?: string | null
          postalCode?: string
          state?: string
          street?: string
          syncData?: Json | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "empAddresses_employeeId_fkey"
            columns: ["employeeId"]
            isOneToOne: false
            referencedRelation: "employeeMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      empAttendance: {
        Row: {
          attendanceDate: string | null
          checkInTime: string | null
          checkOutTime: string | null
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          employeeId: string
          id: string
          lastUpdatedBy: string | null
          leaveEndDate: string | null
          leaveStartDate: string | null
          leaveStatus: Database["public"]["Enums"]["leaveStatus"] | null
          leaveType: Database["public"]["Enums"]["leaveType"] | null
          syncData: Json | null
          updatedAt: string | null
        }
        Insert: {
          attendanceDate?: string | null
          checkInTime?: string | null
          checkOutTime?: string | null
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          employeeId: string
          id?: string
          lastUpdatedBy?: string | null
          leaveEndDate?: string | null
          leaveStartDate?: string | null
          leaveStatus?: Database["public"]["Enums"]["leaveStatus"] | null
          leaveType?: Database["public"]["Enums"]["leaveType"] | null
          syncData?: Json | null
          updatedAt?: string | null
        }
        Update: {
          attendanceDate?: string | null
          checkInTime?: string | null
          checkOutTime?: string | null
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          employeeId?: string
          id?: string
          lastUpdatedBy?: string | null
          leaveEndDate?: string | null
          leaveStartDate?: string | null
          leaveStatus?: Database["public"]["Enums"]["leaveStatus"] | null
          leaveType?: Database["public"]["Enums"]["leaveType"] | null
          syncData?: Json | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "empAttendance_employeeId_fkey"
            columns: ["employeeId"]
            isOneToOne: false
            referencedRelation: "employeeMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      empComp: {
        Row: {
          allowances: string | null
          basicPay: string
          createdAt: string
          createdBy: string
          currency: string
          deductions: string | null
          deletedAt: string | null
          deletedBy: string | null
          effectiveDate: string
          employeeId: string
          id: string
          lastUpdatedBy: string | null
          payFrequency: string
          syncData: Json | null
          updatedAt: string | null
        }
        Insert: {
          allowances?: string | null
          basicPay: string
          createdAt?: string
          createdBy: string
          currency: string
          deductions?: string | null
          deletedAt?: string | null
          deletedBy?: string | null
          effectiveDate: string
          employeeId: string
          id?: string
          lastUpdatedBy?: string | null
          payFrequency: string
          syncData?: Json | null
          updatedAt?: string | null
        }
        Update: {
          allowances?: string | null
          basicPay?: string
          createdAt?: string
          createdBy?: string
          currency?: string
          deductions?: string | null
          deletedAt?: string | null
          deletedBy?: string | null
          effectiveDate?: string
          employeeId?: string
          id?: string
          lastUpdatedBy?: string | null
          payFrequency?: string
          syncData?: Json | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "empComp_employeeId_fkey"
            columns: ["employeeId"]
            isOneToOne: false
            referencedRelation: "employeeMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      employeeMaster: {
        Row: {
          companyId: string
          createdAt: string
          createdBy: string
          dateOfBirth: string | null
          deletedAt: string | null
          deletedBy: string | null
          email: string | null
          employeeTypeId: string
          employmentStatus: string
          firstName: string
          gender: string | null
          hireDate: string
          id: string
          lastName: string
          lastUpdatedBy: string | null
          maritalStatus: string | null
          middleName: string | null
          nationality: string | null
          phoneNumber: string | null
          primaryCompanyId: string | null
          syncData: Json | null
          terminationDate: string | null
          updatedAt: string | null
        }
        Insert: {
          companyId: string
          createdAt?: string
          createdBy: string
          dateOfBirth?: string | null
          deletedAt?: string | null
          deletedBy?: string | null
          email?: string | null
          employeeTypeId: string
          employmentStatus: string
          firstName: string
          gender?: string | null
          hireDate: string
          id?: string
          lastName: string
          lastUpdatedBy?: string | null
          maritalStatus?: string | null
          middleName?: string | null
          nationality?: string | null
          phoneNumber?: string | null
          primaryCompanyId?: string | null
          syncData?: Json | null
          terminationDate?: string | null
          updatedAt?: string | null
        }
        Update: {
          companyId?: string
          createdAt?: string
          createdBy?: string
          dateOfBirth?: string | null
          deletedAt?: string | null
          deletedBy?: string | null
          email?: string | null
          employeeTypeId?: string
          employmentStatus?: string
          firstName?: string
          gender?: string | null
          hireDate?: string
          id?: string
          lastName?: string
          lastUpdatedBy?: string | null
          maritalStatus?: string | null
          middleName?: string | null
          nationality?: string | null
          phoneNumber?: string | null
          primaryCompanyId?: string | null
          syncData?: Json | null
          terminationDate?: string | null
          updatedAt?: string | null
        }
        Relationships: []
      }
      empMeta: {
        Row: {
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          disabilityStatus: string | null
          emergencyContact: string | null
          employeeId: string
          ethnicity: string | null
          id: string
          lastUpdatedBy: string | null
          personalEmail: string | null
          preferredLanguage: string | null
          preferredName: string | null
          profilePictureUrl: string | null
          socialSecurityNumber: string | null
          syncData: Json | null
          updatedAt: string | null
          veteranStatus: string | null
          workAuthorizationStatus: string | null
        }
        Insert: {
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          disabilityStatus?: string | null
          emergencyContact?: string | null
          employeeId: string
          ethnicity?: string | null
          id?: string
          lastUpdatedBy?: string | null
          personalEmail?: string | null
          preferredLanguage?: string | null
          preferredName?: string | null
          profilePictureUrl?: string | null
          socialSecurityNumber?: string | null
          syncData?: Json | null
          updatedAt?: string | null
          veteranStatus?: string | null
          workAuthorizationStatus?: string | null
        }
        Update: {
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          disabilityStatus?: string | null
          emergencyContact?: string | null
          employeeId?: string
          ethnicity?: string | null
          id?: string
          lastUpdatedBy?: string | null
          personalEmail?: string | null
          preferredLanguage?: string | null
          preferredName?: string | null
          profilePictureUrl?: string | null
          socialSecurityNumber?: string | null
          syncData?: Json | null
          updatedAt?: string | null
          veteranStatus?: string | null
          workAuthorizationStatus?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "empMeta_employeeId_fkey"
            columns: ["employeeId"]
            isOneToOne: false
            referencedRelation: "employeeMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      empOrgAssignment: {
        Row: {
          companyId: string
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          departmentId: string | null
          employeeId: string
          endDate: string | null
          id: string
          lastUpdatedBy: string | null
          locationId: string | null
          managerId: string | null
          positionId: string | null
          startDate: string
          syncData: Json | null
          updatedAt: string | null
        }
        Insert: {
          companyId: string
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          departmentId?: string | null
          employeeId: string
          endDate?: string | null
          id?: string
          lastUpdatedBy?: string | null
          locationId?: string | null
          managerId?: string | null
          positionId?: string | null
          startDate: string
          syncData?: Json | null
          updatedAt?: string | null
        }
        Update: {
          companyId?: string
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          departmentId?: string | null
          employeeId?: string
          endDate?: string | null
          id?: string
          lastUpdatedBy?: string | null
          locationId?: string | null
          managerId?: string | null
          positionId?: string | null
          startDate?: string
          syncData?: Json | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "empOrgAssignment_departmentId_fkey"
            columns: ["departmentId"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empOrgAssignment_employeeId_fkey"
            columns: ["employeeId"]
            isOneToOne: false
            referencedRelation: "employeeMaster"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empOrgAssignment_locationId_fkey"
            columns: ["locationId"]
            isOneToOne: false
            referencedRelation: "empAddresses"
            referencedColumns: ["id"]
          },
        ]
      }
      empSkillsQual: {
        Row: {
          certificationDate: string | null
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          employeeId: string
          expirationDate: string | null
          id: string
          lastUpdatedBy: string | null
          proficiencyLevel:
            | Database["public"]["Enums"]["proficiencyLevel"]
            | null
          skillName: string
          syncData: Json | null
          updatedAt: string | null
        }
        Insert: {
          certificationDate?: string | null
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          employeeId: string
          expirationDate?: string | null
          id?: string
          lastUpdatedBy?: string | null
          proficiencyLevel?:
            | Database["public"]["Enums"]["proficiencyLevel"]
            | null
          skillName: string
          syncData?: Json | null
          updatedAt?: string | null
        }
        Update: {
          certificationDate?: string | null
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          employeeId?: string
          expirationDate?: string | null
          id?: string
          lastUpdatedBy?: string | null
          proficiencyLevel?:
            | Database["public"]["Enums"]["proficiencyLevel"]
            | null
          skillName?: string
          syncData?: Json | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "empSkillsQual_employeeId_fkey"
            columns: ["employeeId"]
            isOneToOne: false
            referencedRelation: "employeeMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      integrationConnections: {
        Row: {
          category: string | null
          connectionLimit: number | null
          connector: string | null
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          description: string | null
          id: string
          lastUpdatedBy: string | null
          name: string
          status: string
          syncToken: string | null
          type: string | null
          updatedAt: string | null
        }
        Insert: {
          category?: string | null
          connectionLimit?: number | null
          connector?: string | null
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          description?: string | null
          id?: string
          lastUpdatedBy?: string | null
          name: string
          status: string
          syncToken?: string | null
          type?: string | null
          updatedAt?: string | null
        }
        Update: {
          category?: string | null
          connectionLimit?: number | null
          connector?: string | null
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          description?: string | null
          id?: string
          lastUpdatedBy?: string | null
          name?: string
          status?: string
          syncToken?: string | null
          type?: string | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "integrationConnections_category_fkey"
            columns: ["connector"]
            isOneToOne: false
            referencedRelation: "masterListValue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "integrationConnections_connector_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "masterListValue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "integrationConnections_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "masterListValue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "integrationConnections_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "masterListValue"
            referencedColumns: ["id"]
          },
        ]
      }
      integrationCreds: {
        Row: {
          authType: string
          createdAt: string
          createdBy: string
          credentials: Json
          deletedAt: string | null
          deletedBy: string | null
          id: string
          integrationId: string
          lastUpdatedBy: string | null
          lastUsedAt: string | null
          policy: Json | null
          tokenCache: Json | null
          updatedAt: string | null
          validFrom: string | null
          validTo: string | null
          versionId: string
        }
        Insert: {
          authType: string
          createdAt?: string
          createdBy: string
          credentials: Json
          deletedAt?: string | null
          deletedBy?: string | null
          id?: string
          integrationId: string
          lastUpdatedBy?: string | null
          lastUsedAt?: string | null
          policy?: Json | null
          tokenCache?: Json | null
          updatedAt?: string | null
          validFrom?: string | null
          validTo?: string | null
          versionId: string
        }
        Update: {
          authType?: string
          createdAt?: string
          createdBy?: string
          credentials?: Json
          deletedAt?: string | null
          deletedBy?: string | null
          id?: string
          integrationId?: string
          lastUpdatedBy?: string | null
          lastUsedAt?: string | null
          policy?: Json | null
          tokenCache?: Json | null
          updatedAt?: string | null
          validFrom?: string | null
          validTo?: string | null
          versionId?: string
        }
        Relationships: [
          {
            foreignKeyName: "integrationCreds_authType_fkey"
            columns: ["authType"]
            isOneToOne: false
            referencedRelation: "masterListValue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "integrationCreds_integrationId_fkey"
            columns: ["integrationId"]
            isOneToOne: false
            referencedRelation: "integrationConnections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "integrationCreds_versionId_fkey"
            columns: ["versionId"]
            isOneToOne: false
            referencedRelation: "integrationVersions"
            referencedColumns: ["id"]
          },
        ]
      }
      integrationLogs: {
        Row: {
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          details: string | null
          eventTime: string
          eventType: string
          id: string
          initiatedBy: string | null
          integrationId: string
          lastUpdatedBy: string | null
          requestPayload: Json | null
          responseCode: number | null
          responsePayload: Json | null
          status: string
          updatedAt: string | null
          versionId: string
        }
        Insert: {
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          details?: string | null
          eventTime?: string
          eventType: string
          id?: string
          initiatedBy?: string | null
          integrationId: string
          lastUpdatedBy?: string | null
          requestPayload?: Json | null
          responseCode?: number | null
          responsePayload?: Json | null
          status: string
          updatedAt?: string | null
          versionId: string
        }
        Update: {
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          details?: string | null
          eventTime?: string
          eventType?: string
          id?: string
          initiatedBy?: string | null
          integrationId?: string
          lastUpdatedBy?: string | null
          requestPayload?: Json | null
          responseCode?: number | null
          responsePayload?: Json | null
          status?: string
          updatedAt?: string | null
          versionId?: string
        }
        Relationships: [
          {
            foreignKeyName: "integrationLogs_eventType_fkey"
            columns: ["eventType"]
            isOneToOne: false
            referencedRelation: "masterListValue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "integrationLogs_integrationId_fkey"
            columns: ["integrationId"]
            isOneToOne: false
            referencedRelation: "integrationConnections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "integrationLogs_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "masterListValue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "integrationLogs_versionId_fkey"
            columns: ["versionId"]
            isOneToOne: false
            referencedRelation: "integrationVersions"
            referencedColumns: ["id"]
          },
        ]
      }
      integrationVersions: {
        Row: {
          config: Json | null
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          endpointURL: string
          environment: string
          id: string
          integrationId: string
          lastDeploymentAt: string | null
          lastUpdatedBy: string | null
          syncToken: string | null
          updatedAt: string | null
          version: string | null
          versionStatus: string
        }
        Insert: {
          config?: Json | null
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          endpointURL: string
          environment: string
          id?: string
          integrationId: string
          lastDeploymentAt?: string | null
          lastUpdatedBy?: string | null
          syncToken?: string | null
          updatedAt?: string | null
          version?: string | null
          versionStatus: string
        }
        Update: {
          config?: Json | null
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          endpointURL?: string
          environment?: string
          id?: string
          integrationId?: string
          lastDeploymentAt?: string | null
          lastUpdatedBy?: string | null
          syncToken?: string | null
          updatedAt?: string | null
          version?: string | null
          versionStatus?: string
        }
        Relationships: [
          {
            foreignKeyName: "integrationVersions_environment_fkey"
            columns: ["environment"]
            isOneToOne: false
            referencedRelation: "masterListValue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "integrationVersions_integrationId_fkey"
            columns: ["integrationId"]
            isOneToOne: false
            referencedRelation: "integrationConnections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "integrationVersions_versionStatus_fkey"
            columns: ["versionStatus"]
            isOneToOne: false
            referencedRelation: "masterListValue"
            referencedColumns: ["id"]
          },
        ]
      }
      masterList: {
        Row: {
          code: string | null
          createdAt: string | null
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          description: string | null
          id: string
          inactivatedAt: string | null
          inactivatedBy: string | null
          isActive: boolean
          lastUpdatedBy: string | null
          metadata: Json | null
          name: string
          purpose: string | null
          syncToken: string | null
          updatedAt: string | null
        }
        Insert: {
          code?: string | null
          createdAt?: string | null
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          description?: string | null
          id?: string
          inactivatedAt?: string | null
          inactivatedBy?: string | null
          isActive: boolean
          lastUpdatedBy?: string | null
          metadata?: Json | null
          name: string
          purpose?: string | null
          syncToken?: string | null
          updatedAt?: string | null
        }
        Update: {
          code?: string | null
          createdAt?: string | null
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          description?: string | null
          id?: string
          inactivatedAt?: string | null
          inactivatedBy?: string | null
          isActive?: boolean
          lastUpdatedBy?: string | null
          metadata?: Json | null
          name?: string
          purpose?: string | null
          syncToken?: string | null
          updatedAt?: string | null
        }
        Relationships: []
      }
      masterListValue: {
        Row: {
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          description: string | null
          displayName: string | null
          id: string
          isActive: boolean
          lastUpdatedBy: string | null
          masterListId: string
          sequence: number | null
          syncToken: string | null
          updatedAt: string | null
          value: string
        }
        Insert: {
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          description?: string | null
          displayName?: string | null
          id?: string
          isActive?: boolean
          lastUpdatedBy?: string | null
          masterListId: string
          sequence?: number | null
          syncToken?: string | null
          updatedAt?: string | null
          value: string
        }
        Update: {
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          description?: string | null
          displayName?: string | null
          id?: string
          isActive?: boolean
          lastUpdatedBy?: string | null
          masterListId?: string
          sequence?: number | null
          syncToken?: string | null
          updatedAt?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "masterListValue_masterListId_fkey"
            columns: ["masterListId"]
            isOneToOne: false
            referencedRelation: "masterList"
            referencedColumns: ["id"]
          },
        ]
      }
      notificationChannels: {
        Row: {
          channelType: string
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          fallbackChannel: string | null
          id: string
          isActive: boolean
          lastUpdatedBy: string | null
          notificationId: string
          primaryChannel: string
          syncToken: string | null
          templateId: string
          updatedAt: string | null
        }
        Insert: {
          channelType: string
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          fallbackChannel?: string | null
          id?: string
          isActive: boolean
          lastUpdatedBy?: string | null
          notificationId: string
          primaryChannel: string
          syncToken?: string | null
          templateId: string
          updatedAt?: string | null
        }
        Update: {
          channelType?: string
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          fallbackChannel?: string | null
          id?: string
          isActive?: boolean
          lastUpdatedBy?: string | null
          notificationId?: string
          primaryChannel?: string
          syncToken?: string | null
          templateId?: string
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notificationChannels_fallbackChannel_fkey"
            columns: ["fallbackChannel"]
            isOneToOne: false
            referencedRelation: "masterListValue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notificationChannels_notificationId_fkey"
            columns: ["notificationId"]
            isOneToOne: false
            referencedRelation: "notificationMaster"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notificationChannels_primaryChannel_fkey"
            columns: ["primaryChannel"]
            isOneToOne: false
            referencedRelation: "masterListValue"
            referencedColumns: ["id"]
          },
        ]
      }
      notificationEscalations: {
        Row: {
          channelId: string
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          doesSLAApply: boolean | null
          escalateToId: string
          escalateToType: string
          escalationLevel: number
          id: string
          lastUpdatedBy: string | null
          notificationId: string
          resolvedAt: string | null
          SLAId: string | null
          status: string
          syncToken: string | null
          triggerAfter: unknown
          updatedAt: string | null
        }
        Insert: {
          channelId: string
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          doesSLAApply?: boolean | null
          escalateToId: string
          escalateToType: string
          escalationLevel: number
          id?: string
          lastUpdatedBy?: string | null
          notificationId: string
          resolvedAt?: string | null
          SLAId?: string | null
          status: string
          syncToken?: string | null
          triggerAfter: unknown
          updatedAt?: string | null
        }
        Update: {
          channelId?: string
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          doesSLAApply?: boolean | null
          escalateToId?: string
          escalateToType?: string
          escalationLevel?: number
          id?: string
          lastUpdatedBy?: string | null
          notificationId?: string
          resolvedAt?: string | null
          SLAId?: string | null
          status?: string
          syncToken?: string | null
          triggerAfter?: unknown
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notificationEscalations_channelId_fkey"
            columns: ["channelId"]
            isOneToOne: false
            referencedRelation: "notificationChannels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notificationEscalations_notificationId_fkey"
            columns: ["notificationId"]
            isOneToOne: false
            referencedRelation: "notificationMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      notificationMaster: {
        Row: {
          companyId: string
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          description: string | null
          doesNotEnd: boolean | null
          endAfterOccurrences: number | null
          endBasedOnEvent: boolean | null
          endDate: string | null
          endTime: string | null
          frequency: string | null
          id: string
          isSilent: boolean | null
          lastUpdatedBy: string | null
          name: string
          priority: string
          purpose: string | null
          recurrence: string
          startDate: string
          startTime: string | null
          status: string
          syncToken: string | null
          updatedAt: string | null
        }
        Insert: {
          companyId: string
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          description?: string | null
          doesNotEnd?: boolean | null
          endAfterOccurrences?: number | null
          endBasedOnEvent?: boolean | null
          endDate?: string | null
          endTime?: string | null
          frequency?: string | null
          id?: string
          isSilent?: boolean | null
          lastUpdatedBy?: string | null
          name: string
          priority: string
          purpose?: string | null
          recurrence: string
          startDate: string
          startTime?: string | null
          status: string
          syncToken?: string | null
          updatedAt?: string | null
        }
        Update: {
          companyId?: string
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          description?: string | null
          doesNotEnd?: boolean | null
          endAfterOccurrences?: number | null
          endBasedOnEvent?: boolean | null
          endDate?: string | null
          endTime?: string | null
          frequency?: string | null
          id?: string
          isSilent?: boolean | null
          lastUpdatedBy?: string | null
          name?: string
          priority?: string
          purpose?: string | null
          recurrence?: string
          startDate?: string
          startTime?: string | null
          status?: string
          syncToken?: string | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notificationMaster_priority_fkey"
            columns: ["priority"]
            isOneToOne: false
            referencedRelation: "masterListValue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notificationMaster_purpose_fkey"
            columns: ["purpose"]
            isOneToOne: false
            referencedRelation: "masterListValue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notificationMaster_recurrence_fkey"
            columns: ["recurrence"]
            isOneToOne: false
            referencedRelation: "masterListValue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notificationMaster_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "masterListValue"
            referencedColumns: ["id"]
          },
        ]
      }
      notificationResponses: {
        Row: {
          channelId: string
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          deliveryTimestamp: string | null
          id: string
          lastUpdatedBy: string | null
          notificationId: string
          recipientId: string
          recipientType: string
          response: string | null
          responseTimestamp: string | null
          sharedWith: Json | null
          status: string
          syncToken: string | null
          updatedAt: string | null
        }
        Insert: {
          channelId: string
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          deliveryTimestamp?: string | null
          id?: string
          lastUpdatedBy?: string | null
          notificationId: string
          recipientId: string
          recipientType: string
          response?: string | null
          responseTimestamp?: string | null
          sharedWith?: Json | null
          status: string
          syncToken?: string | null
          updatedAt?: string | null
        }
        Update: {
          channelId?: string
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          deliveryTimestamp?: string | null
          id?: string
          lastUpdatedBy?: string | null
          notificationId?: string
          recipientId?: string
          recipientType?: string
          response?: string | null
          responseTimestamp?: string | null
          sharedWith?: Json | null
          status?: string
          syncToken?: string | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notificationResponses_channelId_fkey"
            columns: ["channelId"]
            isOneToOne: false
            referencedRelation: "notificationChannels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notificationResponses_notificationId_fkey"
            columns: ["notificationId"]
            isOneToOne: false
            referencedRelation: "notificationMaster"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notificationResponses_recipientType_fkey"
            columns: ["recipientType"]
            isOneToOne: false
            referencedRelation: "masterListValue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notificationResponses_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "masterListValue"
            referencedColumns: ["id"]
          },
        ]
      }
      notificationRules: {
        Row: {
          channelId: string
          condition: string | null
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          doesSLAApply: boolean | null
          duration: unknown | null
          escalated: boolean
          fallback: boolean | null
          id: string
          lastUpdatedBy: string | null
          notificationId: string
          SLAId: string | null
          syncToken: string | null
          updatedAt: string | null
        }
        Insert: {
          channelId: string
          condition?: string | null
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          doesSLAApply?: boolean | null
          duration?: unknown | null
          escalated: boolean
          fallback?: boolean | null
          id?: string
          lastUpdatedBy?: string | null
          notificationId: string
          SLAId?: string | null
          syncToken?: string | null
          updatedAt?: string | null
        }
        Update: {
          channelId?: string
          condition?: string | null
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          doesSLAApply?: boolean | null
          duration?: unknown | null
          escalated?: boolean
          fallback?: boolean | null
          id?: string
          lastUpdatedBy?: string | null
          notificationId?: string
          SLAId?: string | null
          syncToken?: string | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notificationRules_channelId_fkey"
            columns: ["channelId"]
            isOneToOne: false
            referencedRelation: "notificationChannels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notificationRules_notificationId_fkey"
            columns: ["notificationId"]
            isOneToOne: false
            referencedRelation: "notificationMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          companyId: string
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          description: string | null
          endDate: string | null
          id: string
          imageUrl: string | null
          isArchived: boolean
          lastUpdatedBy: string | null
          metadata: Json | null
          name: string
          parentTeamId: string | null
          startDate: string | null
          status: Database["golden"]["Enums"]["teamStatus"]
          syncToken: string | null
          teamCode: string
          teamLeaderId: string | null
          updatedAt: string | null
          userCount: number | null
          version: number
          visibility: Database["golden"]["Enums"]["teamVisibility"]
        }
        Insert: {
          companyId: string
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          description?: string | null
          endDate?: string | null
          id?: string
          imageUrl?: string | null
          isArchived?: boolean
          lastUpdatedBy?: string | null
          metadata?: Json | null
          name: string
          parentTeamId?: string | null
          startDate?: string | null
          status?: Database["golden"]["Enums"]["teamStatus"]
          syncToken?: string | null
          teamCode: string
          teamLeaderId?: string | null
          updatedAt?: string | null
          userCount?: number | null
          version?: number
          visibility?: Database["golden"]["Enums"]["teamVisibility"]
        }
        Update: {
          companyId?: string
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          description?: string | null
          endDate?: string | null
          id?: string
          imageUrl?: string | null
          isArchived?: boolean
          lastUpdatedBy?: string | null
          metadata?: Json | null
          name?: string
          parentTeamId?: string | null
          startDate?: string | null
          status?: Database["golden"]["Enums"]["teamStatus"]
          syncToken?: string | null
          teamCode?: string
          teamLeaderId?: string | null
          updatedAt?: string | null
          userCount?: number | null
          version?: number
          visibility?: Database["golden"]["Enums"]["teamVisibility"]
        }
        Relationships: [
          {
            foreignKeyName: "teams_parentTeamId_fkey"
            columns: ["parentTeamId"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teamUsers: {
        Row: {
          addedAt: string
          addedBy: string
          id: string
          isActive: boolean
          lastActivityAt: string | null
          notes: string | null
          removedAt: string | null
          removedBy: string | null
          role: Database["golden"]["Enums"]["teamUserRole"] | null
          syncToken: string | null
          teamId: string
          userId: string
        }
        Insert: {
          addedAt?: string
          addedBy: string
          id?: string
          isActive?: boolean
          lastActivityAt?: string | null
          notes?: string | null
          removedAt?: string | null
          removedBy?: string | null
          role?: Database["golden"]["Enums"]["teamUserRole"] | null
          syncToken?: string | null
          teamId: string
          userId: string
        }
        Update: {
          addedAt?: string
          addedBy?: string
          id?: string
          isActive?: boolean
          lastActivityAt?: string | null
          notes?: string | null
          removedAt?: string | null
          removedBy?: string | null
          role?: Database["golden"]["Enums"]["teamUserRole"] | null
          syncToken?: string | null
          teamId?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "teamUsers_teamId_fkey"
            columns: ["teamId"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      userprofile: {
        Row: {
          authuserid: string
          createdat: string
          deletedat: string | null
          deletedby: string | null
          id: string
          updatedat: string
        }
        Insert: {
          authuserid: string
          createdat?: string
          deletedat?: string | null
          deletedby?: string | null
          id?: string
          updatedat?: string
        }
        Update: {
          authuserid?: string
          createdat?: string
          deletedat?: string | null
          deletedby?: string | null
          id?: string
          updatedat?: string
        }
        Relationships: []
      }
    }
    Views: {
      vwActiveContactRelationships: {
        Row: {
          contactId: string | null
          createdAt: string | null
          createdBy: string | null
          email: string | null
          entityId: string | null
          entityType: string | null
          firstName: string | null
          id: string | null
          lastName: string | null
          lastUpdatedBy: string | null
          phone: string | null
          relationshipType: string | null
          syncData: Json | null
          updatedAt: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contactRelationships_contactId_fkey"
            columns: ["contactId"]
            isOneToOne: false
            referencedRelation: "contactMaster"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      encryptcontactdata: {
        Args: {
          pdata: string
        }
        Returns: string
      }
      getencryptionkey: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      addressType: "Billing" | "Shipping" | "Home" | "Work"
      departmentStatus: "Active" | "Inactive" | "Blocked"
      entityType: "Customer" | "Vendor"
      teamStatus: "Active" | "Inactive" | "Blocked"
      teamUserRole: "Member" | "Leader" | "Contributor"
      teamVisibility: "golden" | "Public" | "Private" | "Restricted"
      verificationStatus: "Verified" | "Unverified" | "Pending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      addressStructure: {
        Row: {
          addressField1: string | null
          addressField10: string | null
          addressField11: string | null
          addressField12: string | null
          addressField2: string | null
          addressField3: string | null
          addressField4: string | null
          addressField5: string | null
          addressField6: string | null
          addressField7: string | null
          addressField8: string | null
          addressField9: string | null
          contextId: number
          countryCode: number
          createdAt: string | null
          createdBy: string | null
          deletedAt: string | null
          deletedBy: string | null
          id: string
          lastUpdatedAt: string | null
          lastUpdatedBy: string | null
        }
        Insert: {
          addressField1?: string | null
          addressField10?: string | null
          addressField11?: string | null
          addressField12?: string | null
          addressField2?: string | null
          addressField3?: string | null
          addressField4?: string | null
          addressField5?: string | null
          addressField6?: string | null
          addressField7?: string | null
          addressField8?: string | null
          addressField9?: string | null
          contextId: number
          countryCode: number
          createdAt?: string | null
          createdBy?: string | null
          deletedAt?: string | null
          deletedBy?: string | null
          id?: string
          lastUpdatedAt?: string | null
          lastUpdatedBy?: string | null
        }
        Update: {
          addressField1?: string | null
          addressField10?: string | null
          addressField11?: string | null
          addressField12?: string | null
          addressField2?: string | null
          addressField3?: string | null
          addressField4?: string | null
          addressField5?: string | null
          addressField6?: string | null
          addressField7?: string | null
          addressField8?: string | null
          addressField9?: string | null
          contextId?: number
          countryCode?: number
          createdAt?: string | null
          createdBy?: string | null
          deletedAt?: string | null
          deletedBy?: string | null
          id?: string
          lastUpdatedAt?: string | null
          lastUpdatedBy?: string | null
        }
        Relationships: []
      }
      allColumns: {
        Row: {
          column_name: string
          created_at: string | null
          data_type: string
          id: number
          table_name: string
        }
        Insert: {
          column_name: string
          created_at?: string | null
          data_type: string
          id?: number
          table_name: string
        }
        Update: {
          column_name?: string
          created_at?: string | null
          data_type?: string
          id?: number
          table_name?: string
        }
        Relationships: []
      }
      allTables: {
        Row: {
          complianceTag: Database["public"]["Enums"]["complianceType"] | null
          containsPii: boolean
          createdAt: string
          createdBy: string
          dataRetentionDays: number | null
          deletedAt: string | null
          deletedBy: string | null
          encryptionRequired: boolean
          foreignKeys: Json | null
          id: string
          includeInTenantSchema: boolean
          isTenantSpecific: boolean | null
          lastUpdatedBy: string | null
          module: string | null
          nullable: boolean
          parentTable: string | null
          purpose: string | null
          referenceTenantId: string | null
          schemaName: string
          tableName: string
          tableType: Database["public"]["Enums"]["tableType"] | null
          updatedAt: string | null
        }
        Insert: {
          complianceTag?: Database["public"]["Enums"]["complianceType"] | null
          containsPii?: boolean
          createdAt?: string
          createdBy: string
          dataRetentionDays?: number | null
          deletedAt?: string | null
          deletedBy?: string | null
          encryptionRequired?: boolean
          foreignKeys?: Json | null
          id?: string
          includeInTenantSchema?: boolean
          isTenantSpecific?: boolean | null
          lastUpdatedBy?: string | null
          module?: string | null
          nullable: boolean
          parentTable?: string | null
          purpose?: string | null
          referenceTenantId?: string | null
          schemaName: string
          tableName: string
          tableType?: Database["public"]["Enums"]["tableType"] | null
          updatedAt?: string | null
        }
        Update: {
          complianceTag?: Database["public"]["Enums"]["complianceType"] | null
          containsPii?: boolean
          createdAt?: string
          createdBy?: string
          dataRetentionDays?: number | null
          deletedAt?: string | null
          deletedBy?: string | null
          encryptionRequired?: boolean
          foreignKeys?: Json | null
          id?: string
          includeInTenantSchema?: boolean
          isTenantSpecific?: boolean | null
          lastUpdatedBy?: string | null
          module?: string | null
          nullable?: boolean
          parentTable?: string | null
          purpose?: string | null
          referenceTenantId?: string | null
          schemaName?: string
          tableName?: string
          tableType?: Database["public"]["Enums"]["tableType"] | null
          updatedAt?: string | null
        }
        Relationships: []
      }
      companyMaster: {
        Row: {
          annualRevenue: number | null
          bbbNumber: string | null
          companyCode: string | null
          companyType: string | null
          createdAt: string | null
          createdBy: string | null
          currency: string | null
          deletedAt: string | null
          deletedBy: string | null
          description: string | null
          dnbNumber: string | null
          domainUrl: string | null
          effectivityEndDate: string | null
          effectivityStartDate: string | null
          email: string | null
          employeeCount: number | null
          fiscalYearEnd: string | null
          fiscalYearStart: string | null
          id: string
          industry: string | null
          isActive: boolean | null
          lastUpdatedBy: string | null
          name: string
          ownershipType: string | null
          parentCompanyId: string | null
          phoneNumber: string | null
          primaryContactId: string | null
          purpose: string | null
          registeredCountry: string | null
          registeredState: string | null
          registrationNumber: string | null
          status: Database["public"]["Enums"]["companyStatus"]
          taxId: string | null
          tenantId: string
          updatedAt: string | null
          website: string | null
        }
        Insert: {
          annualRevenue?: number | null
          bbbNumber?: string | null
          companyCode?: string | null
          companyType?: string | null
          createdAt?: string | null
          createdBy?: string | null
          currency?: string | null
          deletedAt?: string | null
          deletedBy?: string | null
          description?: string | null
          dnbNumber?: string | null
          domainUrl?: string | null
          effectivityEndDate?: string | null
          effectivityStartDate?: string | null
          email?: string | null
          employeeCount?: number | null
          fiscalYearEnd?: string | null
          fiscalYearStart?: string | null
          id?: string
          industry?: string | null
          isActive?: boolean | null
          lastUpdatedBy?: string | null
          name: string
          ownershipType?: string | null
          parentCompanyId?: string | null
          phoneNumber?: string | null
          primaryContactId?: string | null
          purpose?: string | null
          registeredCountry?: string | null
          registeredState?: string | null
          registrationNumber?: string | null
          status?: Database["public"]["Enums"]["companyStatus"]
          taxId?: string | null
          tenantId: string
          updatedAt?: string | null
          website?: string | null
        }
        Update: {
          annualRevenue?: number | null
          bbbNumber?: string | null
          companyCode?: string | null
          companyType?: string | null
          createdAt?: string | null
          createdBy?: string | null
          currency?: string | null
          deletedAt?: string | null
          deletedBy?: string | null
          description?: string | null
          dnbNumber?: string | null
          domainUrl?: string | null
          effectivityEndDate?: string | null
          effectivityStartDate?: string | null
          email?: string | null
          employeeCount?: number | null
          fiscalYearEnd?: string | null
          fiscalYearStart?: string | null
          id?: string
          industry?: string | null
          isActive?: boolean | null
          lastUpdatedBy?: string | null
          name?: string
          ownershipType?: string | null
          parentCompanyId?: string | null
          phoneNumber?: string | null
          primaryContactId?: string | null
          purpose?: string | null
          registeredCountry?: string | null
          registeredState?: string | null
          registrationNumber?: string | null
          status?: Database["public"]["Enums"]["companyStatus"]
          taxId?: string | null
          tenantId?: string
          updatedAt?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companyMaster_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companyMaster_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "companyMaster_deletedBy_fkey"
            columns: ["deletedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companyMaster_deletedBy_fkey"
            columns: ["deletedBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "companyMaster_lastUpdatedBy_fkey"
            columns: ["lastUpdatedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companyMaster_lastUpdatedBy_fkey"
            columns: ["lastUpdatedBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "companyMaster_parentCompanyId_fkey"
            columns: ["parentCompanyId"]
            isOneToOne: false
            referencedRelation: "companyMaster"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companyMaster_primaryContactId_fkey"
            columns: ["primaryContactId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companyMaster_primaryContactId_fkey"
            columns: ["primaryContactId"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "companyMaster_tenantId_fkey"
            columns: ["tenantId"]
            isOneToOne: false
            referencedRelation: "tenantMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      companyUsers: {
        Row: {
          companyId: string
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          departmentId: string
          endDate: string | null
          id: string
          lastUpdatedAt: string | null
          lastUpdatedBy: string | null
          roleInDepartment: string | null
          startDate: string | null
          userId: string
        }
        Insert: {
          companyId: string
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          departmentId: string
          endDate?: string | null
          id?: string
          lastUpdatedAt?: string | null
          lastUpdatedBy?: string | null
          roleInDepartment?: string | null
          startDate?: string | null
          userId: string
        }
        Update: {
          companyId?: string
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          departmentId?: string
          endDate?: string | null
          id?: string
          lastUpdatedAt?: string | null
          lastUpdatedBy?: string | null
          roleInDepartment?: string | null
          startDate?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "companyUsers_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companyMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      countryMaster: {
        Row: {
          countryName: string
          createdAt: string
          createdBy: string
          currencyCode: string
          deletedAt: string | null
          deletedBy: string | null
          dialingCode: string | null
          id: string
          lastUpdatedBy: string | null
          otherLanguages: Json | null
          primaryLanguage: string | null
          region: string | null
          subRegion: string | null
          syncData: Json | null
          threeCharCountryCode: string
          timeZone: string | null
          twoCharCountryCode: string
          updatedAt: string | null
        }
        Insert: {
          countryName: string
          createdAt?: string
          createdBy: string
          currencyCode: string
          deletedAt?: string | null
          deletedBy?: string | null
          dialingCode?: string | null
          id?: string
          lastUpdatedBy?: string | null
          otherLanguages?: Json | null
          primaryLanguage?: string | null
          region?: string | null
          subRegion?: string | null
          syncData?: Json | null
          threeCharCountryCode: string
          timeZone?: string | null
          twoCharCountryCode: string
          updatedAt?: string | null
        }
        Update: {
          countryName?: string
          createdAt?: string
          createdBy?: string
          currencyCode?: string
          deletedAt?: string | null
          deletedBy?: string | null
          dialingCode?: string | null
          id?: string
          lastUpdatedBy?: string | null
          otherLanguages?: Json | null
          primaryLanguage?: string | null
          region?: string | null
          subRegion?: string | null
          syncData?: Json | null
          threeCharCountryCode?: string
          timeZone?: string | null
          twoCharCountryCode?: string
          updatedAt?: string | null
        }
        Relationships: []
      }
      employeeJob: {
        Row: {
          companyId: string
          createdAt: string | null
          createdBy: string | null
          customFields: Json | null
          deletedAt: string | null
          deletedBy: string | null
          id: string
          lastUpdatedBy: string | null
          locationId: string | null
          managerId: string | null
          shiftId: string | null
          startDate: string | null
          title: string | null
          updatedAt: string | null
        }
        Insert: {
          companyId: string
          createdAt?: string | null
          createdBy?: string | null
          customFields?: Json | null
          deletedAt?: string | null
          deletedBy?: string | null
          id?: string
          lastUpdatedBy?: string | null
          locationId?: string | null
          managerId?: string | null
          shiftId?: string | null
          startDate?: string | null
          title?: string | null
          updatedAt?: string | null
        }
        Update: {
          companyId?: string
          createdAt?: string | null
          createdBy?: string | null
          customFields?: Json | null
          deletedAt?: string | null
          deletedBy?: string | null
          id?: string
          lastUpdatedBy?: string | null
          locationId?: string | null
          managerId?: string | null
          shiftId?: string | null
          startDate?: string | null
          title?: string | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employeeJob_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companyMaster"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employeeJob_id_fkey"
            columns: ["id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employeeJob_id_fkey"
            columns: ["id"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "employeeJob_lastUpdatedBy_fkey"
            columns: ["lastUpdatedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employeeJob_lastUpdatedBy_fkey"
            columns: ["lastUpdatedBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "employeeJob_locationId_fkey"
            columns: ["locationId"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employeeJob_managerId_fkey"
            columns: ["managerId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employeeJob_managerId_fkey"
            columns: ["managerId"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
        ]
      }
      employeeType: {
        Row: {
          companyId: string
          createdAt: string
          description: string | null
          disable: boolean
          effectiveDate: string | null
          id: string
          name: string
          protected: boolean
          type: Database["public"]["Enums"]["roleType"]
          updatedAt: string | null
        }
        Insert: {
          companyId: string
          createdAt?: string
          description?: string | null
          disable?: boolean
          effectiveDate?: string | null
          id?: string
          name: string
          protected?: boolean
          type?: Database["public"]["Enums"]["roleType"]
          updatedAt?: string | null
        }
        Update: {
          companyId?: string
          createdAt?: string
          description?: string | null
          disable?: boolean
          effectiveDate?: string | null
          id?: string
          name?: string
          protected?: boolean
          type?: Database["public"]["Enums"]["roleType"]
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employeeType_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companyMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      employeeTypePermission: {
        Row: {
          create: string[]
          createdAt: string
          delete: string[]
          employeeTypeId: string
          module: Database["public"]["Enums"]["module"]
          update: string[]
          updatedAt: string | null
          view: string[]
        }
        Insert: {
          create?: string[]
          createdAt?: string
          delete?: string[]
          employeeTypeId?: string
          module: Database["public"]["Enums"]["module"]
          update?: string[]
          updatedAt?: string | null
          view?: string[]
        }
        Update: {
          create?: string[]
          createdAt?: string
          delete?: string[]
          employeeTypeId?: string
          module?: Database["public"]["Enums"]["module"]
          update?: string[]
          updatedAt?: string | null
          view?: string[]
        }
        Relationships: []
      }
      fontFamilyMaster: {
        Row: {
          companyId: string
          createdAt: string
          createdBy: string
          defaultUsage: string | null
          deletedAt: string | null
          deletedBy: string | null
          description: string | null
          fontFamilyName: string
          fontSource: string | null
          fontType: boolean
          id: string
          isActive: boolean
          lastUpdatedBy: string | null
          licenseExpiryDate: string | null
          licenseType: string | null
          syncData: Json | null
          updatedAt: string | null
        }
        Insert: {
          companyId: string
          createdAt?: string
          createdBy: string
          defaultUsage?: string | null
          deletedAt?: string | null
          deletedBy?: string | null
          description?: string | null
          fontFamilyName: string
          fontSource?: string | null
          fontType: boolean
          id?: string
          isActive: boolean
          lastUpdatedBy?: string | null
          licenseExpiryDate?: string | null
          licenseType?: string | null
          syncData?: Json | null
          updatedAt?: string | null
        }
        Update: {
          companyId?: string
          createdAt?: string
          createdBy?: string
          defaultUsage?: string | null
          deletedAt?: string | null
          deletedBy?: string | null
          description?: string | null
          fontFamilyName?: string
          fontSource?: string | null
          fontType?: boolean
          id?: string
          isActive?: boolean
          lastUpdatedBy?: string | null
          licenseExpiryDate?: string | null
          licenseType?: string | null
          syncData?: Json | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fontFamilyMaster_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "fontFamilyMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      fontVariants: {
        Row: {
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          fileFormat: string
          filePath: string
          fontFamilyId: string
          fontPreviewUrl: string | null
          fontStyle: string | null
          fontWeight: number | null
          id: string
          isDefault: boolean
          isMonospace: boolean | null
          lastUpdatedBy: string | null
          syncData: Json | null
          unicodeSupportRange: Json | null
          updatedAt: string | null
          uploadedBy: string
          variantName: string
        }
        Insert: {
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          fileFormat: string
          filePath: string
          fontFamilyId: string
          fontPreviewUrl?: string | null
          fontStyle?: string | null
          fontWeight?: number | null
          id?: string
          isDefault: boolean
          isMonospace?: boolean | null
          lastUpdatedBy?: string | null
          syncData?: Json | null
          unicodeSupportRange?: Json | null
          updatedAt?: string | null
          uploadedBy: string
          variantName: string
        }
        Update: {
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          fileFormat?: string
          filePath?: string
          fontFamilyId?: string
          fontPreviewUrl?: string | null
          fontStyle?: string | null
          fontWeight?: number | null
          id?: string
          isDefault?: boolean
          isMonospace?: boolean | null
          lastUpdatedBy?: string | null
          syncData?: Json | null
          unicodeSupportRange?: Json | null
          updatedAt?: string | null
          uploadedBy?: string
          variantName?: string
        }
        Relationships: [
          {
            foreignKeyName: "fontVariants_fontFamilyId_fkey"
            columns: ["fontFamilyId"]
            isOneToOne: false
            referencedRelation: "fontFamilyMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      labelsReports: {
        Row: {
          category: string | null
          companyId: string
          configuration: Json | null
          createdAt: string
          createdBy: string
          customFields: Json | null
          deletedAt: string | null
          deletedBy: string | null
          height: number
          id: string
          isArchived: boolean
          isFavorite: boolean
          labelType: Database["public"]["Enums"]["labelType"]
          lastUpdatedBy: string | null
          name: string | null
          previewUrl: string | null
          size: string | null
          status: Database["public"]["Enums"]["labelStatusType"]
          updatedAt: string | null
          width: number
        }
        Insert: {
          category?: string | null
          companyId: string
          configuration?: Json | null
          createdAt?: string
          createdBy: string
          customFields?: Json | null
          deletedAt?: string | null
          deletedBy?: string | null
          height?: number
          id?: string
          isArchived?: boolean
          isFavorite?: boolean
          labelType?: Database["public"]["Enums"]["labelType"]
          lastUpdatedBy?: string | null
          name?: string | null
          previewUrl?: string | null
          size?: string | null
          status?: Database["public"]["Enums"]["labelStatusType"]
          updatedAt?: string | null
          width?: number
        }
        Update: {
          category?: string | null
          companyId?: string
          configuration?: Json | null
          createdAt?: string
          createdBy?: string
          customFields?: Json | null
          deletedAt?: string | null
          deletedBy?: string | null
          height?: number
          id?: string
          isArchived?: boolean
          isFavorite?: boolean
          labelType?: Database["public"]["Enums"]["labelType"]
          lastUpdatedBy?: string | null
          name?: string | null
          previewUrl?: string | null
          size?: string | null
          status?: Database["public"]["Enums"]["labelStatusType"]
          updatedAt?: string | null
          width?: number
        }
        Relationships: [
          {
            foreignKeyName: "labelsReports_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companyMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      labelsReportsComments: {
        Row: {
          commentBoxId: string
          companyId: string
          content: Json | null
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          id: string
          labelId: string
          lastUpdatedBy: string | null
          pinLocation: Json | null
          pinned: boolean | null
          resolved: boolean | null
          updatedAt: string | null
        }
        Insert: {
          commentBoxId: string
          companyId: string
          content?: Json | null
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          id?: string
          labelId: string
          lastUpdatedBy?: string | null
          pinLocation?: Json | null
          pinned?: boolean | null
          resolved?: boolean | null
          updatedAt?: string | null
        }
        Update: {
          commentBoxId?: string
          companyId?: string
          content?: Json | null
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          id?: string
          labelId?: string
          lastUpdatedBy?: string | null
          pinLocation?: Json | null
          pinned?: boolean | null
          resolved?: boolean | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "labelsReportsComments_commentBoxId_fkey"
            columns: ["commentBoxId"]
            isOneToOne: false
            referencedRelation: "labelsReportsCommentsCard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsComments_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companyMaster"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsComments_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsComments_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "labelsReportsComments_deletedBy_fkey"
            columns: ["deletedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsComments_deletedBy_fkey"
            columns: ["deletedBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "labelsReportsComments_labelId_fkey"
            columns: ["labelId"]
            isOneToOne: false
            referencedRelation: "labelsReports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsComments_lastUpdatedBy_fkey"
            columns: ["lastUpdatedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsComments_lastUpdatedBy_fkey"
            columns: ["lastUpdatedBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
        ]
      }
      labelsReportsCommentsCard: {
        Row: {
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          id: string
          isSubmitted: boolean | null
          labelId: string
          lastUpdatedBy: string | null
          pinLocation: Json | null
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          id?: string
          isSubmitted?: boolean | null
          labelId: string
          lastUpdatedBy?: string | null
          pinLocation?: Json | null
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          id?: string
          isSubmitted?: boolean | null
          labelId?: string
          lastUpdatedBy?: string | null
          pinLocation?: Json | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "labelsReportsCommentsCard_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsCommentsCard_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "labelsReportsCommentsCard_deletedBy_fkey"
            columns: ["deletedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsCommentsCard_deletedBy_fkey"
            columns: ["deletedBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "labelsReportsCommentsCard_labelId_fkey"
            columns: ["labelId"]
            isOneToOne: false
            referencedRelation: "labelsReports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsCommentsCard_lastUpdatedBy_fkey"
            columns: ["lastUpdatedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsCommentsCard_lastUpdatedBy_fkey"
            columns: ["lastUpdatedBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
        ]
      }
      labelsReportsCommentsReplies: {
        Row: {
          commentId: string
          companyId: string
          content: Json | null
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          id: string
          lastUpdatedBy: string | null
          updatedAt: string | null
        }
        Insert: {
          commentId: string
          companyId: string
          content?: Json | null
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          id?: string
          lastUpdatedBy?: string | null
          updatedAt?: string | null
        }
        Update: {
          commentId?: string
          companyId?: string
          content?: Json | null
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          id?: string
          lastUpdatedBy?: string | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "labelsReportsCommentsReplies_commentId_fkey"
            columns: ["commentId"]
            isOneToOne: false
            referencedRelation: "labelsReportsComments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsCommentsReplies_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companyMaster"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsCommentsReplies_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsCommentsReplies_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "labelsReportsCommentsReplies_deletedBy_fkey"
            columns: ["deletedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsCommentsReplies_deletedBy_fkey"
            columns: ["deletedBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "labelsReportsCommentsReplies_lastUpdatedBy_fkey"
            columns: ["lastUpdatedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsCommentsReplies_lastUpdatedBy_fkey"
            columns: ["lastUpdatedBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
        ]
      }
      labelsReportsCommentsTags: {
        Row: {
          commentId: string
          companyId: string
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          id: string
          lastUpdatedBy: string | null
          updatedAt: string | null
          userId: string
        }
        Insert: {
          commentId: string
          companyId: string
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          id?: string
          lastUpdatedBy?: string | null
          updatedAt?: string | null
          userId: string
        }
        Update: {
          commentId?: string
          companyId?: string
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          id?: string
          lastUpdatedBy?: string | null
          updatedAt?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "labelsReportsCommentsReplies_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsCommentsReplies_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "labelsReportsCommentsReplies_deletedBy_fkey"
            columns: ["deletedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsCommentsReplies_deletedBy_fkey"
            columns: ["deletedBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "labelsReportsCommentsReplies_lastUpdatedBy_fkey"
            columns: ["lastUpdatedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsCommentsReplies_lastUpdatedBy_fkey"
            columns: ["lastUpdatedBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "labelsReportsCommentsTags_commentId_fkey"
            columns: ["commentId"]
            isOneToOne: false
            referencedRelation: "labelsReportsComments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsCommentsTags_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companyMaster"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsCommentsTags_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labelsReportsCommentsTags_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
        ]
      }
      location: {
        Row: {
          addressLine1: string
          addressLine2: string | null
          city: string
          companyId: string
          countryCode: string | null
          createdAt: string
          createdBy: string
          customFields: Json | null
          id: string
          lastUpdatedBy: string | null
          latitude: number | null
          longitude: number | null
          name: string
          postalCode: string
          state: string
          timezone: string
          updatedAt: string | null
        }
        Insert: {
          addressLine1: string
          addressLine2?: string | null
          city: string
          companyId: string
          countryCode?: string | null
          createdAt?: string
          createdBy: string
          customFields?: Json | null
          id?: string
          lastUpdatedBy?: string | null
          latitude?: number | null
          longitude?: number | null
          name: string
          postalCode: string
          state: string
          timezone: string
          updatedAt?: string | null
        }
        Update: {
          addressLine1?: string
          addressLine2?: string | null
          city?: string
          companyId?: string
          countryCode?: string | null
          createdAt?: string
          createdBy?: string
          customFields?: Json | null
          id?: string
          lastUpdatedBy?: string | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          postalCode?: string
          state?: string
          timezone?: string
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "location_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companyMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      masterList: {
        Row: {
          code: string | null
          createdAt: string | null
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          description: string | null
          id: string
          inactivatedAt: string | null
          inactivatedBy: string | null
          isActive: boolean
          lastUpdatedBy: string | null
          metadata: Json | null
          name: string
          purpose: string | null
          syncToken: string | null
          updatedAt: string | null
        }
        Insert: {
          code?: string | null
          createdAt?: string | null
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          description?: string | null
          id?: string
          inactivatedAt?: string | null
          inactivatedBy?: string | null
          isActive: boolean
          lastUpdatedBy?: string | null
          metadata?: Json | null
          name: string
          purpose?: string | null
          syncToken?: string | null
          updatedAt?: string | null
        }
        Update: {
          code?: string | null
          createdAt?: string | null
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          description?: string | null
          id?: string
          inactivatedAt?: string | null
          inactivatedBy?: string | null
          isActive?: boolean
          lastUpdatedBy?: string | null
          metadata?: Json | null
          name?: string
          purpose?: string | null
          syncToken?: string | null
          updatedAt?: string | null
        }
        Relationships: []
      }
      moduleConfiguration: {
        Row: {
          configuration: Json | null
          createdOn: string
          id: number
          name: string | null
          updatedOn: string | null
        }
        Insert: {
          configuration?: Json | null
          createdOn?: string
          id?: number
          name?: string | null
          updatedOn?: string | null
        }
        Update: {
          configuration?: Json | null
          createdOn?: string
          id?: number
          name?: string | null
          updatedOn?: string | null
        }
        Relationships: []
      }
      ruleActions: {
        Row: {
          actionDetails: Json
          actionId: string
          actionTarget: string
          actionType: Database["public"]["Enums"]["ruleActionType"]
          createdAt: string
          ruleId: string
          updatedAt: string | null
        }
        Insert: {
          actionDetails: Json
          actionId?: string
          actionTarget: string
          actionType: Database["public"]["Enums"]["ruleActionType"]
          createdAt?: string
          ruleId: string
          updatedAt?: string | null
        }
        Update: {
          actionDetails?: Json
          actionId?: string
          actionTarget?: string
          actionType?: Database["public"]["Enums"]["ruleActionType"]
          createdAt?: string
          ruleId?: string
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ruleActions_ruleId_fkey"
            columns: ["ruleId"]
            isOneToOne: false
            referencedRelation: "rules"
            referencedColumns: ["ruleId"]
          },
        ]
      }
      ruleConditions: {
        Row: {
          conditionId: string
          createdAt: string
          fieldName: string
          logicalGroup: number
          operator: Database["public"]["Enums"]["ruleOperatorType"]
          ruleId: string
          updatedAt: string | null
          value: string
        }
        Insert: {
          conditionId?: string
          createdAt?: string
          fieldName: string
          logicalGroup?: number
          operator: Database["public"]["Enums"]["ruleOperatorType"]
          ruleId: string
          updatedAt?: string | null
          value: string
        }
        Update: {
          conditionId?: string
          createdAt?: string
          fieldName?: string
          logicalGroup?: number
          operator?: Database["public"]["Enums"]["ruleOperatorType"]
          ruleId?: string
          updatedAt?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "ruleConditions_ruleId_fkey"
            columns: ["ruleId"]
            isOneToOne: false
            referencedRelation: "rules"
            referencedColumns: ["ruleId"]
          },
        ]
      }
      ruleExecutionLogs: {
        Row: {
          actionId: string | null
          errorDetails: string | null
          executionTime: string
          logDetails: Json | null
          logId: string
          ruleId: string
          status: Database["public"]["Enums"]["ruleExecutionStatus"]
          triggerId: string | null
        }
        Insert: {
          actionId?: string | null
          errorDetails?: string | null
          executionTime?: string
          logDetails?: Json | null
          logId?: string
          ruleId: string
          status: Database["public"]["Enums"]["ruleExecutionStatus"]
          triggerId?: string | null
        }
        Update: {
          actionId?: string | null
          errorDetails?: string | null
          executionTime?: string
          logDetails?: Json | null
          logId?: string
          ruleId?: string
          status?: Database["public"]["Enums"]["ruleExecutionStatus"]
          triggerId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ruleExecutionLogs_actionId_fkey"
            columns: ["actionId"]
            isOneToOne: false
            referencedRelation: "ruleActions"
            referencedColumns: ["actionId"]
          },
          {
            foreignKeyName: "ruleExecutionLogs_ruleId_fkey"
            columns: ["ruleId"]
            isOneToOne: false
            referencedRelation: "rules"
            referencedColumns: ["ruleId"]
          },
          {
            foreignKeyName: "ruleExecutionLogs_triggerId_fkey"
            columns: ["triggerId"]
            isOneToOne: false
            referencedRelation: "ruleTriggers"
            referencedColumns: ["triggerId"]
          },
        ]
      }
      rules: {
        Row: {
          createdAt: string
          createdBy: string
          description: string | null
          isglobal: boolean
          name: string
          priority: number
          ruleId: string
          status: Database["public"]["Enums"]["ruleStatus"]
          type: Database["public"]["Enums"]["ruleType"]
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          createdBy: string
          description?: string | null
          isglobal?: boolean
          name: string
          priority?: number
          ruleId?: string
          status?: Database["public"]["Enums"]["ruleStatus"]
          type: Database["public"]["Enums"]["ruleType"]
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          createdBy?: string
          description?: string | null
          isglobal?: boolean
          name?: string
          priority?: number
          ruleId?: string
          status?: Database["public"]["Enums"]["ruleStatus"]
          type?: Database["public"]["Enums"]["ruleType"]
          updatedAt?: string | null
        }
        Relationships: []
      }
      ruleTriggers: {
        Row: {
          createdAt: string
          eventType: Database["public"]["Enums"]["ruleEventType"]
          ruleId: string
          sourceSystem: string
          triggerId: string
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          eventType: Database["public"]["Enums"]["ruleEventType"]
          ruleId: string
          sourceSystem: string
          triggerId?: string
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          eventType?: Database["public"]["Enums"]["ruleEventType"]
          ruleId?: string
          sourceSystem?: string
          triggerId?: string
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ruleTriggers_ruleId_fkey"
            columns: ["ruleId"]
            isOneToOne: false
            referencedRelation: "rules"
            referencedColumns: ["ruleId"]
          },
        ]
      }
      tenantDomains: {
        Row: {
          createdAt: string
          createdBy: string
          deletedAt: string | null
          deletedBy: string | null
          domain: string
          id: string
          isVerified: boolean
          lastUpdatedAt: string | null
          lastUpdatedBy: string | null
          subdomain: string
          tenantId: string
          verificationCode: number | null
        }
        Insert: {
          createdAt?: string
          createdBy: string
          deletedAt?: string | null
          deletedBy?: string | null
          domain: string
          id?: string
          isVerified?: boolean
          lastUpdatedAt?: string | null
          lastUpdatedBy?: string | null
          subdomain: string
          tenantId: string
          verificationCode?: number | null
        }
        Update: {
          createdAt?: string
          createdBy?: string
          deletedAt?: string | null
          deletedBy?: string | null
          domain?: string
          id?: string
          isVerified?: boolean
          lastUpdatedAt?: string | null
          lastUpdatedBy?: string | null
          subdomain?: string
          tenantId?: string
          verificationCode?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tenantDomains_tenantId_fkey"
            columns: ["tenantId"]
            isOneToOne: false
            referencedRelation: "tenantMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      tenantMaster: {
        Row: {
          createdAt: string
          createdBy: string
          dataRetentionDays: number | null
          defaultLanguage: Database["public"]["Enums"]["defaultLanguage"] | null
          deletedAt: string | null
          deletedBy: string | null
          domainId: string | null
          hostingRegion: string | null
          id: string
          lastUpdatedAt: string | null
          lastUpdatedBy: string | null
          metadata: Json | null
          name: string
          notes: string | null
          planId: string | null
          primaryContactId: string | null
          status: Database["public"]["Enums"]["tenantStatus"]
        }
        Insert: {
          createdAt?: string
          createdBy: string
          dataRetentionDays?: number | null
          defaultLanguage?:
            | Database["public"]["Enums"]["defaultLanguage"]
            | null
          deletedAt?: string | null
          deletedBy?: string | null
          domainId?: string | null
          hostingRegion?: string | null
          id?: string
          lastUpdatedAt?: string | null
          lastUpdatedBy?: string | null
          metadata?: Json | null
          name: string
          notes?: string | null
          planId?: string | null
          primaryContactId?: string | null
          status: Database["public"]["Enums"]["tenantStatus"]
        }
        Update: {
          createdAt?: string
          createdBy?: string
          dataRetentionDays?: number | null
          defaultLanguage?:
            | Database["public"]["Enums"]["defaultLanguage"]
            | null
          deletedAt?: string | null
          deletedBy?: string | null
          domainId?: string | null
          hostingRegion?: string | null
          id?: string
          lastUpdatedAt?: string | null
          lastUpdatedBy?: string | null
          metadata?: Json | null
          name?: string
          notes?: string | null
          planId?: string | null
          primaryContactId?: string | null
          status?: Database["public"]["Enums"]["tenantStatus"]
        }
        Relationships: []
      }
      tenantSubscription: {
        Row: {
          amount: number
          billingEndDate: string
          billingFrequency: Database["public"]["Enums"]["billingFrequency"]
          billingStartDate: string
          billingTerms: Database["public"]["Enums"]["billingTerms"] | null
          createdAt: string
          createdBy: string
          currency: string
          deletedAt: string | null
          deletedBy: string | null
          id: string
          isActive: boolean
          lastUpdatedAt: string | null
          lastUpdatedBy: string | null
          planId: string
          renewalDate: string | null
          supportSlaAvailability: string | null
          supportSlaEscalation:
            | Database["public"]["Enums"]["supportEscalation"]
            | null
          supportSlaHours: Database["public"]["Enums"]["supportHours"] | null
          supportSlaResponse: string | null
          supportTier: Database["public"]["Enums"]["supportTier"] | null
          tenantId: string
          trialEndDate: string | null
        }
        Insert: {
          amount: number
          billingEndDate: string
          billingFrequency: Database["public"]["Enums"]["billingFrequency"]
          billingStartDate: string
          billingTerms?: Database["public"]["Enums"]["billingTerms"] | null
          createdAt?: string
          createdBy: string
          currency: string
          deletedAt?: string | null
          deletedBy?: string | null
          id?: string
          isActive?: boolean
          lastUpdatedAt?: string | null
          lastUpdatedBy?: string | null
          planId: string
          renewalDate?: string | null
          supportSlaAvailability?: string | null
          supportSlaEscalation?:
            | Database["public"]["Enums"]["supportEscalation"]
            | null
          supportSlaHours?: Database["public"]["Enums"]["supportHours"] | null
          supportSlaResponse?: string | null
          supportTier?: Database["public"]["Enums"]["supportTier"] | null
          tenantId: string
          trialEndDate?: string | null
        }
        Update: {
          amount?: number
          billingEndDate?: string
          billingFrequency?: Database["public"]["Enums"]["billingFrequency"]
          billingStartDate?: string
          billingTerms?: Database["public"]["Enums"]["billingTerms"] | null
          createdAt?: string
          createdBy?: string
          currency?: string
          deletedAt?: string | null
          deletedBy?: string | null
          id?: string
          isActive?: boolean
          lastUpdatedAt?: string | null
          lastUpdatedBy?: string | null
          planId?: string
          renewalDate?: string | null
          supportSlaAvailability?: string | null
          supportSlaEscalation?:
            | Database["public"]["Enums"]["supportEscalation"]
            | null
          supportSlaHours?: Database["public"]["Enums"]["supportHours"] | null
          supportSlaResponse?: string | null
          supportTier?: Database["public"]["Enums"]["supportTier"] | null
          tenantId?: string
          trialEndDate?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenantSubscription_tenantId_fkey"
            columns: ["tenantId"]
            isOneToOne: false
            referencedRelation: "tenantMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      triggerCategories: {
        Row: {
          background: string | null
          category: string
          categoryDesc: string | null
          clientId: string | null
          clientSecret: string | null
          companyId: string | null
          createdAt: string
          createdBy: string
          deletedBy: string | null
          deletedOn: string | null
          description: string | null
          id: string
          logoImage: string | null
          metadata: Json | null
          modifiedBy: string | null
          modifiedOn: string | null
          name: string
          resourceUrl: string | null
          scope: string
          tenantId: string
        }
        Insert: {
          background?: string | null
          category: string
          categoryDesc?: string | null
          clientId?: string | null
          clientSecret?: string | null
          companyId?: string | null
          createdAt?: string
          createdBy: string
          deletedBy?: string | null
          deletedOn?: string | null
          description?: string | null
          id?: string
          logoImage?: string | null
          metadata?: Json | null
          modifiedBy?: string | null
          modifiedOn?: string | null
          name: string
          resourceUrl?: string | null
          scope: string
          tenantId: string
        }
        Update: {
          background?: string | null
          category?: string
          categoryDesc?: string | null
          clientId?: string | null
          clientSecret?: string | null
          companyId?: string | null
          createdAt?: string
          createdBy?: string
          deletedBy?: string | null
          deletedOn?: string | null
          description?: string | null
          id?: string
          logoImage?: string | null
          metadata?: Json | null
          modifiedBy?: string | null
          modifiedOn?: string | null
          name?: string
          resourceUrl?: string | null
          scope?: string
          tenantId?: string
        }
        Relationships: [
          {
            foreignKeyName: "triggerCategories_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companyMaster"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "triggerCategories_tenantId_fkey"
            columns: ["tenantId"]
            isOneToOne: false
            referencedRelation: "tenantMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      triggerEvents: {
        Row: {
          categoryId: string
          companyId: string | null
          createdAt: string
          createdBy: string
          deletedBy: string | null
          deletedOn: string | null
          description: string | null
          eventConditions: Json | null
          id: string
          isSystemDefined: boolean | null
          metadata: Json | null
          modifiedBy: string | null
          modifiedOn: string | null
          name: string
          scheduleExpression: string | null
          scope: string
          status: Database["public"]["Enums"]["triggerStatus"] | null
          tenantId: string
          type: Database["public"]["Enums"]["triggerType"] | null
        }
        Insert: {
          categoryId: string
          companyId?: string | null
          createdAt?: string
          createdBy: string
          deletedBy?: string | null
          deletedOn?: string | null
          description?: string | null
          eventConditions?: Json | null
          id?: string
          isSystemDefined?: boolean | null
          metadata?: Json | null
          modifiedBy?: string | null
          modifiedOn?: string | null
          name: string
          scheduleExpression?: string | null
          scope: string
          status?: Database["public"]["Enums"]["triggerStatus"] | null
          tenantId: string
          type?: Database["public"]["Enums"]["triggerType"] | null
        }
        Update: {
          categoryId?: string
          companyId?: string | null
          createdAt?: string
          createdBy?: string
          deletedBy?: string | null
          deletedOn?: string | null
          description?: string | null
          eventConditions?: Json | null
          id?: string
          isSystemDefined?: boolean | null
          metadata?: Json | null
          modifiedBy?: string | null
          modifiedOn?: string | null
          name?: string
          scheduleExpression?: string | null
          scope?: string
          status?: Database["public"]["Enums"]["triggerStatus"] | null
          tenantId?: string
          type?: Database["public"]["Enums"]["triggerType"] | null
        }
        Relationships: [
          {
            foreignKeyName: "triggerEvents_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "triggerCategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "triggerEvents_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companyMaster"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "triggerEvents_tenantId_fkey"
            columns: ["tenantId"]
            isOneToOne: false
            referencedRelation: "tenantMaster"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          "2FAEnabled": boolean | null
          about: string
          active: boolean | null
          address1: string
          address2: string
          avatarUrl: string | null
          birthday: string | null
          city: string
          country: string
          createdAt: string
          email: string
          firstName: string
          fullName: string | null
          id: string
          lastName: string
          permissions: Json | null
          phno: string
          state: string
          updatedAt: string | null
          zipCode: string
        }
        Insert: {
          "2FAEnabled"?: boolean | null
          about?: string
          active?: boolean | null
          address1?: string
          address2?: string
          avatarUrl?: string | null
          birthday?: string | null
          city?: string
          country?: string
          createdAt?: string
          email: string
          firstName: string
          fullName?: string | null
          id: string
          lastName: string
          permissions?: Json | null
          phno?: string
          state?: string
          updatedAt?: string | null
          zipCode?: string
        }
        Update: {
          "2FAEnabled"?: boolean | null
          about?: string
          active?: boolean | null
          address1?: string
          address2?: string
          avatarUrl?: string | null
          birthday?: string | null
          city?: string
          country?: string
          createdAt?: string
          email?: string
          firstName?: string
          fullName?: string | null
          id?: string
          lastName?: string
          permissions?: Json | null
          phno?: string
          state?: string
          updatedAt?: string | null
          zipCode?: string
        }
        Relationships: []
      }
      userSession: {
        Row: {
          createdBy: string
          createdOn: string
          deletedBy: string | null
          deletedOn: string | null
          device: Json
          endedOn: string | null
          id: string
          ipAddress: string
          lastUpdatedBy: string | null
          lastUpdatedOn: string | null
          location: Json
          metadata: Json
          sessionActivity: Database["public"]["Enums"]["activityStatus"]
          status: Database["public"]["Enums"]["loginStatus"]
          userId: string | null
        }
        Insert: {
          createdBy: string
          createdOn?: string
          deletedBy?: string | null
          deletedOn?: string | null
          device: Json
          endedOn?: string | null
          id?: string
          ipAddress: string
          lastUpdatedBy?: string | null
          lastUpdatedOn?: string | null
          location: Json
          metadata: Json
          sessionActivity: Database["public"]["Enums"]["activityStatus"]
          status: Database["public"]["Enums"]["loginStatus"]
          userId?: string | null
        }
        Update: {
          createdBy?: string
          createdOn?: string
          deletedBy?: string | null
          deletedOn?: string | null
          device?: Json
          endedOn?: string | null
          id?: string
          ipAddress?: string
          lastUpdatedBy?: string | null
          lastUpdatedOn?: string | null
          location?: Json
          metadata?: Json
          sessionActivity?: Database["public"]["Enums"]["activityStatus"]
          status?: Database["public"]["Enums"]["loginStatus"]
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "userSession_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "userSession_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "userSession_deletedBy_fkey"
            columns: ["deletedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "userSession_deletedBy_fkey"
            columns: ["deletedBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "userSession_modifiedBy_fkey"
            columns: ["lastUpdatedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "userSession_modifiedBy_fkey"
            columns: ["lastUpdatedBy"]
            isOneToOne: false
            referencedRelation: "userDefaults"
            referencedColumns: ["userId"]
          },
        ]
      }
      workflowDataProcessed: {
        Row: {
          companyId: string
          createdAt: string
          createdBy: string
          eventId: string
          id: string
          isSystemDefined: boolean | null
          metadata: Json | null
          processedAt: string
          processedData: Json
          status: string
          workflowId: string
        }
        Insert: {
          companyId: string
          createdAt?: string
          createdBy: string
          eventId: string
          id?: string
          isSystemDefined?: boolean | null
          metadata?: Json | null
          processedAt?: string
          processedData: Json
          status: string
          workflowId: string
        }
        Update: {
          companyId?: string
          createdAt?: string
          createdBy?: string
          eventId?: string
          id?: string
          isSystemDefined?: boolean | null
          metadata?: Json | null
          processedAt?: string
          processedData?: Json
          status?: string
          workflowId?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflowDataProcessed_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companyMaster"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflowDataProcessed_eventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "triggerEvents"
            referencedColumns: ["id"]
          },
        ]
      }
      zeakColumnMeta: {
        Row: {
          calculatedField: boolean
          columnId: string
          columnLabel: string
          columnName: string
          columnType: Database["public"]["Enums"]["columnTypeEnum"]
          createdAt: string
          dataType: string
          dataValidation: boolean
          defaultValue: string | null
          description: string | null
          display: boolean
          formulaForCalculatedFields: string | null
          isInTableFilter: boolean
          lengthRestriction: boolean | null
          nullable: boolean
          numberOfDecimals: number | null
          requiredField: boolean
          toolTip: string | null
          uniqueValue: boolean
          updatedAt: string
        }
        Insert: {
          calculatedField?: boolean
          columnId?: string
          columnLabel: string
          columnName: string
          columnType: Database["public"]["Enums"]["columnTypeEnum"]
          createdAt?: string
          dataType: string
          dataValidation?: boolean
          defaultValue?: string | null
          description?: string | null
          display?: boolean
          formulaForCalculatedFields?: string | null
          isInTableFilter?: boolean
          lengthRestriction?: boolean | null
          nullable: boolean
          numberOfDecimals?: number | null
          requiredField?: boolean
          toolTip?: string | null
          uniqueValue?: boolean
          updatedAt?: string
        }
        Update: {
          calculatedField?: boolean
          columnId?: string
          columnLabel?: string
          columnName?: string
          columnType?: Database["public"]["Enums"]["columnTypeEnum"]
          createdAt?: string
          dataType?: string
          dataValidation?: boolean
          defaultValue?: string | null
          description?: string | null
          display?: boolean
          formulaForCalculatedFields?: string | null
          isInTableFilter?: boolean
          lengthRestriction?: boolean | null
          nullable?: boolean
          numberOfDecimals?: number | null
          requiredField?: boolean
          toolTip?: string | null
          uniqueValue?: boolean
          updatedAt?: string
        }
        Relationships: []
      }
    }
    Views: {
      modules: {
        Row: {
          name: Database["public"]["Enums"]["module"] | null
        }
        Relationships: []
      }
      userDefaults: {
        Row: {
          companyId: string | null
          locationId: string | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employeeJob_locationId_fkey"
            columns: ["locationId"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "location_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companyMaster"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      _xid_machine_id: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      clone_schema_tables: {
        Args: {
          new_schema_name: string
        }
        Returns: undefined
      }
      create_table_with_columns: {
        Args: {
          table_name: string
          column_definitions: Database["public"]["CompositeTypes"]["column_definition"][]
        }
        Returns: undefined
      }
      decryptContactData: {
        Args: {
          pencrypteddata: string
        }
        Returns: string
      }
      decryptdata: {
        Args: {
          pencrypteddata: string
        }
        Returns: string
      }
      decryptjsondata: {
        Args: {
          pencrypteddata: string
        }
        Returns: Json
      }
      encryptdata: {
        Args: {
          pdata: string
        }
        Returns: string
      }
      encryptjsondata: {
        Args: {
          pdata: Json
        }
        Returns: string
      }
      generate_user_defined_column_name: {
        Args: {
          prefix: string
        }
        Returns: string
      }
      get_claims: {
        Args: {
          uid: string
        }
        Returns: Json
      }
      get_column_properties: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
          column_name: string
          is_nullable: boolean
          module: string
          foreign_key_info: Json
        }[]
      }
      get_company_id_from_foreign_key: {
        Args: {
          foreign_key: string
          tbl: string
        }
        Returns: string
      }
      get_my_claim: {
        Args: {
          claim: string
        }
        Returns: Json
      }
      get_my_permission: {
        Args: {
          claim: string
        }
        Returns: Json
      }
      get_permission_companies: {
        Args: {
          claim: string
        }
        Returns: string[]
      }
      get_schema_info: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
          column_name: string
          column_description: string
          data_type: string
          character_maximum_length: number
          numeric_precision: number
          numeric_scale: number
          is_nullable: boolean
          column_default: string
          is_identity: boolean
          is_updatable: boolean
          is_unique: boolean
          foreign_key_info: Json
        }[]
      }
      has_any_company_permission: {
        Args: {
          claim: string
        }
        Returns: boolean
      }
      has_company_permission:
        | {
            Args: {
              claim: string
              company: string
            }
            Returns: boolean
          }
        | {
            Args: {
              claim: string
              company: string
            }
            Returns: boolean
          }
      has_role: {
        Args: {
          role: string
        }
        Returns: boolean
      }
      is_claims_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      jsonb_to_text_array: {
        Args: {
          "": Json
        }
        Returns: string[]
      }
      populate_column_metadata: {
        Args: {
          schema_name: string
          table_name: string
        }
        Returns: undefined
      }
      xid: {
        Args: {
          _at?: string
        }
        Returns: unknown
      }
      xid_counter: {
        Args: {
          _xid: unknown
        }
        Returns: number
      }
      xid_decode: {
        Args: {
          _xid: unknown
        }
        Returns: number[]
      }
      xid_encode: {
        Args: {
          _id: number[]
        }
        Returns: unknown
      }
      xid_machine: {
        Args: {
          _xid: unknown
        }
        Returns: number[]
      }
      xid_pid: {
        Args: {
          _xid: unknown
        }
        Returns: number
      }
      xid_time: {
        Args: {
          _xid: unknown
        }
        Returns: string
      }
    }
    Enums: {
      activityStatus: "Active" | "Inactive"
      addressTypeEnum: "PERMANENT" | "MAILING" | "TEMPORARY"
      billingFrequency: "Monthly" | "Quarterly" | "Annually"
      billingTerms: "Prepaid" | "Net30" | "Net60"
      columnTypeEnum: "System" | "User Defined"
      companyStatus: "Active" | "Inactive"
      complianceType: "GDPR" | "HIPAA" | "PCI-DSS"
      defaultLanguage: "en-US" | "fr-FR"
      employeeTypes: "FULL-TIME" | "PART-TIME" | "CONTRACTOR"
      employmentStatus: "ACTIVE" | "INACTIVE" | "TERMINATED"
      ethnicity:
        | "HISPANIC_OR_LATINO"
        | "NOT_HISPANIC_OR_LATINO"
        | "PREFER_NOT_TO_SAY"
        | "ASIAN"
      gender: "Male" | "Female" | "Other"
      labelStatusType:
        | "Draft"
        | "Submitted"
        | "Approved"
        | "Not Approved"
        | "Hold"
      labelType: "Label" | "Document"
      leaveStatus: "APPROVED" | "PENDING" | "REJECTED"
      leaveType: "Sick" | "Vacation" | "Unpaid"
      loginStatus: "Logged In" | "Logged Out"
      maritalStatus: "SINGLE" | "MARRIED" | "DIVORCED"
      module:
        | "Accounting"
        | "Documents"
        | "Invoicing"
        | "Inventory"
        | "Jobs"
        | "Messaging"
        | "Parts"
        | "Purchasing"
        | "Resources"
        | "Sales"
        | "Settings"
        | "Scheduling"
        | "Timecards"
        | "Users"
        | "LabelsReports"
      payFrequency: "Monthly" | "Bi-weekly"
      proficiencyLevel: "Beginner" | "Intermediate" | "Expert"
      roleType: "Default" | "Custom"
      ruleActionType: "SendNotification" | "TransformData" | "APICall"
      ruleEventType: "FormSubmission" | "APICall"
      ruleExecutionStatus: "Success" | "Failure"
      ruleOperatorType: "Equal" | "NotEqual" | "GreaterThan" | "And" | "Or"
      ruleStatus: "Active" | "Inactive" | "Draft"
      ruleType: "Validation" | "Substitution" | "Custom"
      supportEscalation: "Level1" | "Level2" | "Level3"
      supportHours: "24/7" | "BusinessHours"
      supportTier: "Standard" | "Premium" | "Enterprise"
      tableType: "System" | "Application" | "Temp" | "Tenant"
      tenantStatus: "Active" | "Suspended" | "Trial" | "Inactive"
      triggerStatus: "ACTIVE" | "INACTIVE" | "PAUSED" | "ERROR"
      triggerType:
        | "DATA_CHANGE"
        | "SYSTEM_EVENT"
        | "USER_ACTION"
        | "CRON"
        | "TIME_BASED"
      workAuthStatus: "CITIZEN" | "PERMANENT_RESIDENT" | "WORK_VISA" | "OTHER"
    }
    CompositeTypes: {
      column_definition: {
        name: string | null
        type: string | null
        default_value: string | null
      }
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

