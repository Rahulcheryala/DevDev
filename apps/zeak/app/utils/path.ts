import { generatePath } from "@remix-run/react";
import { SUPABASE_API_URL } from "~/config/env";

const x = "/x"; // from ~/routes/x+ folder
const api = "/api"; // from ~/routes/api+ folder
const file = "/file"; // from ~/routes/file+ folder
const onboarding = "/onboarding"; // from ~/routes/onboarding+ folder

export const path = {
  to: {
    api: {
      employeeTypes: `${api}/users/employee-types`,
      emptyPermissions: `${api}/users/empty-permissions`,
      locations: `${api}/resources/locations`,
      rollback: (table: string, id: string) =>
        generatePath(
          `${api}/settings/sequence/rollback?table=${table}&currentSequence=${id}`,
        ),
      sidebarMenu: `${api}/sidebar/menu`,
      tableConf: `${api}/table/conf`,
      s3Upload: `${api}/s3/upload`,
      getSignedUrlFromS3: `${api}/s3/get-signed-url`,
      editLabel: `${api}/labels-reports/edit-label`,
      upsertView: `${api}/view/save`,
      getViews: `${api}/view/get`,
      deleteView: (id: string) => generatePath(`${api}/view/delete?id=${id}`),
      getViewById: (id: string) => generatePath(`${api}/view/getById?id=${id}`),
      updateView: (id: string) => generatePath(`${api}/view/update?id=${id}`),
      createDuplicateRoleById: `${api}/employee-types/create-duplicate-role`,
      disableRoleById: `${api}/employee-types/disable-role`,
      addUserToTeam: `${api}/access-settings/team-member/add`,
      removeUserFromTeam: `${api}/access-settings/team-member/remove`,
      changeStatusTeam: `${api}/access-settings/team-member/change-status`,
      createDuplicateTeamById: `${api}/access-settings/team-member/create-duplicate-team`,
      employeesSimpleList: `${api}/employees-simple-list`,
      addUserToDepartment: `${api}/access-settings/department-member/add`,
      removeUserFromDepartment: `${api}/access-settings/department-member/remove`,
      changeStatusDepartment: `${api}/access-settings/department-member/change-status`,
      createDuplicateDepartment: `${api}/access-settings/department-member/create-duplicate-department`,
      changeStatusCompany: `${api}/access-settings/companies/change-status`,
      deleteFont: `${api}/access-settings/font-manager/delete`,
      labelComment: `${api}/labels-reports/comments`,
      checkDuplicateDepartmentCode: `${api}/access-settings/department/check-department-code`,
      checkDuplicateDepartmentName: `${api}/access-settings/department/check-department-name`,
      createDepartment: `${api}/access-settings/department/create`,
      createNotification: `${api}/access-settings/notification/create`,
      salesOrderCreate: `${api}/sales-orders/fetch/create`,
      salesOrderDelete: `${api}/sales-orders/fetch/delete`,
      dynamicsIntegrationStatus: "/api/dynamics-integration-status",
      salesOrderFetchCreateUserStory3: `${api}/user-story-3/fetch/create`,
      saveColumnMapping: `${api}/save-column-mapping`,
      checkScheduleStatus: (taskId: string) =>
        generatePath(`${api}/check-schedule-status?taskId=${taskId}`),
      notificationCreate: `${api}/notification/create`,
      notificationTrigger: `${api}/notification/trigger`,
      scheduleUserStory3: (taskId: string) =>
        generatePath(`${api}/schedule/userStory3?taskId=${taskId}`),
      salesOrderUpdate: `${api}/sales-order-update/activate`,
      checkCompanyCode: `${api}/access-settings/companies/check-company-code`,
      checkCompanyName: `${api}/access-settings/companies/check-company-name`,
      generateCompanyCode: `${api}/access-settings/companies/generate-company-code`,
      departmentList: `${api}/departments/list`,
      departmentCreate: `${api}/departments/create`,
      departmentEdit: `${api}/departments/update`,
      employeeList: `${api}/employee/get`,
      deptEmployeeMap: `${api}/departments/members/update`,
      deptEmployeeMapManage: `${api}/departments/members/manage`,
      fetchCompany: `${api}/fetch/company`,

      teamList: `${api}/teams/list`,
      teamCreate: `${api}/teams/create`,
      teamEdit: `${api}/teams/update`,
      teamMembersMap: `${api}/teams/members/update`,
    },
    file: {
      previewImage: (bucket: string, path: string) =>
        generatePath(`${file}/preview/image?file=${bucket}/${path}`),
      previewFile: (path: string) => generatePath(`${file}/preview/${path}`),
      purchaseOrder: (id: string) =>
        generatePath(`${file}/purchase-order/${id}.pdf`),
      // salesOrder: (id: string) => generatePath(`${file}/sales-order/${id}.pdf`),
    },
    // TODO remove company, location, theme, user route
    onboarding: {
      company: `${onboarding}/company`,
      location: `${onboarding}/location`,
      root: `/v2${onboarding}`,
      theme: `${onboarding}/theme`,
      user: `${onboarding}/user`,
    },
    vendorOnboarding: "/x/vendor-onboarding",
    chooseSubscription: "/choose-subscription",
    authenticatedRoot: x,
    account: `${x}/account`,
    accountPassword: `${x}/account/password`,
    bulkEditPermissions: `${x}/users/bulk-edit-permissions`,
    company: `${x}/settings/company`,
    companySwitch: (companyId: string) =>
      generatePath(`${x}/settings/company/switch/${companyId}`),
    deactivateUsers: `${x}/users/deactivate`,
    rolesPermissions: `${x}/access-settings/roles-permissions`,
    rolesPermissionsNew: `${x}/access-settings/roles-permissions/new`,
    rolesPermissionsEdit: (id: string) =>
      generatePath(`${x}/access-settings/roles-permissions/${id}`),
    profile: `${x}/access-settings/profile`,
    companySettings: `${x}/access-settings/companies`,
    companyNew: `${x}/access-settings/companies/new`,
    companyCreate: `${x}/access-settings/companies/create`,
    companyEdit: (id: string) =>
      generatePath(`${x}/access-settings/companies/${id}`),
    CompanyDelete: (id: string) =>
      generatePath(`${x}/access-settings/companies/delete/${id}`),
    teams: `${x}/access-settings/teams`,
    // reactflowHome: (tabName?: string) =>
    //   `${x}/react-flow/home${tabName ? "?tab=" + tabName : ""}`,
    teamsNew: (tabName?: string) => `${x}/access-settings/teams/new${tabName ? "?tab=" + tabName : ""}`,
    teamsEdit: (id: string) => generatePath(`${x}/access-settings/teams/${id}`),
    teamsDelete: (id: string) =>
      generatePath(`${x}/access-settings/teams/delete/${id}`),
    departments: `${x}/access-settings/departments`,
    departmentsNew: `${x}/access-settings/departments/new`,
    notificationsNew: `${x}/access-settings/notifications/new`,
    departmentsEdit: (id: string) =>
      generatePath(`${x}/access-settings/departments/${id}`),
    departmentsDelete: (id: string) =>
      generatePath(`${x}/access-settings/departments/delete/${id}`),
    departmentUsers: (id: string) =>
      generatePath(`${x}/access-settings/departments/${id}/users`),
    departmentAddUsers: (id: string) =>
      generatePath(`${x}/access-settings/departments/${id}/users/add`),
    fontManagerApplicationFonts: `${x}/access-settings/font-manager/application-fonts`,
    fontManagerUploadedFonts: `${x}/access-settings/font-manager/uploaded-fonts`,
    deleteLocation: (id: string) =>
      generatePath(`${x}/resources/locations/delete/${id}`),
    document: (id: string) => generatePath(`${x}/documents/search/${id}`),
    employeeAccount: (id: string) => generatePath(`${x}/users/employees/${id}`),
    employeeAccounts: `${x}/users/employees`,
    employeeType: (id: string) =>
      generatePath(`${x}/users/employee-types/${id}`),
    employeeTypes: `${x}/users/employee-types`,
    equipment: `${x}/resources/equipment`,
    forgotPassword: "/forgot-password",
    forgotPasswordV2: "/v2/forgot-password",
    indivisualOnboarding: "/v2/indivisual-onboarding",
    jobs: `${x}/jobs`,
    location: (id: string) => generatePath(`${x}/resources/locations/${id}`),
    locations: `${x}/resources/locations`,
    login: "/v2/login",
    dynamicsLogin: "/auth/integrations/erp/dynamics/login",
    signup: "/v2/signup",
    mfa: "/v2/mfa",
    // setuppassword: "/v2/setup-password",
    success: (email: string, source: string) =>
      `/success?email=${email}&source=${source}`,
    logout: "/logout",
    messaging: `${x}/messaging`,
    newChartOfAccount: `${x}/accounting/charts/new`,
    newEmployee: `${x}/users/employees/new`,
    newEmployeeType: `${x}/users/employee-types/new`,
    newLocation: `${x}/resources/locations/new`,
    newPaymentTerm: `${x}/accounting/payment-terms/new`,
    refreshSession: "/refresh-session",
    resendInvite: `${x}/users/resend-invite`,
    resetPassword: "/reset-password",
    resetPasswordV2: "/v2/reset-password",
    resources: `${x}/resources`,
    reactflow: `${x}/react-flow`,
    reactflowHomeTab: `${x}/react-flow/home`,
    reactflowHome: (tabName?: string) =>
      `${x}/react-flow/home${tabName ? "?tab=" + tabName : ""}`,
    labelsreports: `${x}/labels-reports`,
    labelsreportsHome: (tabName?: string) =>
      `${x}/labels-reports/home${tabName ? "?tab=" + tabName : ""}`,
    labelsreportsLabelList: `${x}/labels-reports/labels`,
    labelsreportsLabelNew: `${x}/labels-reports/labels/new`,
    labelsreportsLabelEdit: (id: string) =>
      generatePath(`${x}/labels-reports/labels/${id}`),
    labelsreportsLabelDelete: `${x}/labels-reports/labels/delete`,
    labelsreportsLabelView: (id: string) =>
      generatePath(`${x}/labels-reports/labels/editor/${id}`),
    root: "/",
    sales: `${x}/sales`,
    salesInvoices: `${x}/invoicing/sales`,
    scheduling: `${x}/scheduling`,
    theme: `${x}/account/theme`,
    timecards: `${x}/timecards`,
    users: `${x}/users`,
    workflows: `${x}/workflows/home`,
    workflowsHome: (tabName?: string) =>
      `${x}/workflows/home${tabName ? "?tab=" + tabName : ""}`,
    notificationList: `${x}/notifications`,
    notificationCreate: `${x}/notifications/new`,
    notificationEditRecurrence: (id: string) =>
      generatePath(`${x}/notifications/edit/${id}/recurrence`),
    notificationEditDetails: (id: string) =>
      generatePath(`${x}/notifications/edit/${id}/details`),
    notificationEditAudience: (id: string) =>
      generatePath(`${x}/notifications/edit/${id}/audience`),
    notificationEditDelivery: (id: string) =>
      generatePath(`${x}/notifications/edit/${id}/delivery`),
    workflowTask: (taskId: string) => `/x/workflows/task/${taskId}`,
    integrations: `${x}/access-settings/integrations`,
    // integrationsNew: `${x}/access-settings/integrations/new`,
    // integrationsEdit: (id: string) =>
    //   generatePath(`${x}/access-settings/integrations/${id}`),
    // integrationConnections: (id: string) =>
    //   generatePath(`${x}/access-settings/integrations/connections/${id}`),
    // integrationsDelete: (id: string) =>
    //   generatePath(`${x}/access-settings/integrations/delete/${id}`),
  },
} as const;

// TODO remove these constants
export const onboardingSequence = [
  // path.to.onboarding.theme,
  // path.to.onboarding.user,
  // path.to.onboarding.company,
] as const;

export const getStoragePath = (bucket: string, path: string) => {
  return `${SUPABASE_API_URL}/storage/v1/object/public/${bucket}/${path}`;
};

export const requestReferrer = (request: Request) => {
  return request.headers.get("referer");
};

export const getParams = (request: Request) => {
  const url = new URL(requestReferrer(request) ?? "");
  const searchParams = new URLSearchParams(url.search);
  return searchParams.toString();
};
