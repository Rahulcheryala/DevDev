import { IDepartmentModel } from "../models/department.model";

export const exportDepartmentData = <T,>(departmentData: IDepartmentModel, ) => {
  // Create CSV with column names in first row
  const columnNames = [
    "ID",
    "Name",
    "Department Code",
    "Description",
    "Status",
    "Effective Start Date",
    "Effective End Date",
    "Company ID",
    "Created At",
    "Created By",
    "Updated At",
    "Last Updated By",
    "Deleted At",
    "Deleted By",
    "Version",
    "Is Archived",
    "Sync Token",
    "Logo",
    "Supervisor",
    "Created On",
    "Modified By",
    "Modified On",
    "Deleted On",
    "Supervisor Email",
    "No Of Users"
  ];

  const userColumns = Array.from({ length: departmentData.noOfUsers || 0 }, (_, index) => `User ${index + 1}`);
    const finalColumnNames = [...columnNames, ...userColumns];

  // Prepare row data for the CSV
  const rowData = [
    departmentData.id,
    departmentData.name,
    departmentData.departmentCode,
    departmentData.description,
    departmentData.status,
    departmentData.effectiveStartDate,
    departmentData.effectiveEndDate,
    departmentData.companyId,
    departmentData.createdAt,
    departmentData.createdBy,
    departmentData.updatedAt,
    departmentData.lastUpdatedBy,
    departmentData.deletedAt,
    departmentData.deletedBy,
    departmentData.version,
    departmentData.isArchived,
    departmentData.syncToken,
    departmentData.logo,
    departmentData.supervisor,
    departmentData.createdOn,
    departmentData.modifiedBy,
    departmentData.modifiedOn,
    departmentData.deletedOn,
    departmentData.supervisorEmail,
    departmentData.noOfUsers
  ];

  departmentData.empOrgAssignment.forEach((entry) => rowData.push(entry.employeeDetails.firstName || '' + entry.employeeDetails.lastName || ''));

  // Combine column names and property rows
  const csv = [finalColumnNames, rowData].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${departmentData.departmentCode}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};