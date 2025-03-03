# Zeal Database Schema Approach and Methodology

## <span style="color: #8AC4FF">Numbering Scheme for Migration Files</span>

To maintain clarity and continuity, each migration file is prefixed with a numeric code. This code denotes when and where the migration fits into the larger schema-building process. The naming convention orders the files by the category they belong to as well as the sequence they are applied to the database.

**Migration Steps**
- Step 1: Prepare the database
- Step 2: Create the master template schema
- Step 3: Create the modules
- Step 4: Apply the global functions


## <span style="color: #8AC4FF">File Naming Conventions</span>
- **6-digit prefix:** Numeric code indicating the sequence and category (e.g., `000100`, `100500`, `800000`).
- **Descriptive name:** Short, meaningful name that describes the purpose of the migration (e.g., `preSetup`, `tenant`, `company`, `globalFunctions`).

**Examples:**
- `000100_preSetup.sql`: Perform initial database setup tasks like enabling extensions.
- `100100_create_tenant_schema.sql`: Script to clone the `goldentenant` schema structure for a new tenant.
- `000103_add_schema_relationships.sql`: Add relationships between the `goldentenant` schema and individual tenant schemas.

## <span style="color: #8AC4FF">Table and Function Naming Conventions</span>

**Naming Conventions for Database Objects**

- **Table Names**: Use camelCase formatting. For example, `employeeRecords` or `userProfiles`. 
- **Function Names**: Use snake_case formatting. For example, `calculate_total`, `get_user_by_id`. (This might need to move to camelCase, will need to check with Yash/Anupam here.)

This approach ensures visual distinction between different object types and provides consistency across the database schema. 



### Reserved Ranges

**<span style="color: #4CAF50">000000-099999: Pre-Setup and System Preparation</span>**  
Used for initial tasks such as enabling extensions, creating core database structures, and system users.

**Example:**  
- `000100_preSetup.sql`: Enables required extensions and sets up initial permissions.

---

**<span style="color: #4CAF50">100000-199999: Master Template Schema (`goldentenant`)</span>**  
Used for defining the schema and data structures of the master template. This includes tables, views, functions, and relationships that all tenants inherit.

**Examples:**  
- `100100_tenant.sql`: Sets up the base tenant schema structure within `goldentenant`. 
- `100400_userProfile.sql`: Adds a `userProfile` table to the `goldentenant` schema.
- `100500_company.sql`: Adds a `company` table to the `goldentenant` schema.
- `100600_department.sql`: Adds a `department` table to the `goldentenant` schema.
- `100700_teams.sql`: Adds a `teams` table to the `goldentenant` schema.
- `100800_tenantSoftDeletesIndexing.sql`: Adds indexing for soft delets on the tenant companies, departments, teams.
- `100900_buckets`: Adds a `buckets` table to the `goldentenant` schema.

---

**<span style="color: #295135">200000-299999: Expansion Set</span>**  
Reserved for future expansion.

---

**<span style="color: #295135">300000-399999: Expansion Set</span>**  
Reserved for future expansion.

---

**<span style="color: #295135">400000-499999: Expansion Set</span>**  
Reserved for future expansion.

---

**<span style="color: #4CAF50">500000-599999: Modules</span>**

- <span style="color: #FF5D73">500000-549999: Public Schema Tables for Modules</span>
- <span style="color: #FF5D73">550000-599999: Tenant Schema Tables for Modules</span>

Contains schemas and data for modules. Examples include notification modules, label modules, or automation frameworks, as well as any module that might need to become its own microservice. This is broken in to 2 parts for the migrations. The first part needs to define how the 

**Example:**  
- `510100_notifications.sql`: Sets up a notifications module in the `public` schema.
- `550200_notifications_tenant.sql`: Would sets up a notifications module in the `tenant` schema.

---

**<span style="color: #295135">600000-699999: Expansion Set</span>**  
Reserved for future expansion.

---

**<span style="color: #295135">700000-799999: Expansion Set</span>**  
Reserved for future expansion.

---

**<span style="color: #4CAF50">800000-899999: Global Functions</span>**  
Used for functions, stored procedures, and general logic that apply across all tenants and are placed in the `public` schema or a global schema.

**Examples:**  
- `800000_globalFunctions.sql`: Defines functions that can be reused by all tenants.  
- `800100_getTypes.sql`: Retrieves a global list of data types.

---

**<span style="color: #295135">900000-999999: Expansion Set</span>**  
Reserved for future needs or large-scale refactoring.

---
