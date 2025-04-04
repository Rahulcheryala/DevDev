import type { Database } from "@zeak/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { EmployeeType, User } from "../users";

export async function upsertView(client: SupabaseClient<Database>, view: any) {
  if (view.id) {
    return client.from("view").update(view).eq("id", view.id).select();
  }

  return client.from("view").insert(view).select();
}

export async function upsertViewDetails(
  client: SupabaseClient<Database>,
  viewDetail: any,
) {
  if (viewDetail.id) {
    return client
      .from("viewDetail")
      .update(viewDetail)
      .eq("id", viewDetail.id)
      .select();
  }

  return client.from("viewDetail").insert(viewDetail).select();
}

export async function upsertViewShare(
  client: SupabaseClient<Database>,
  viewShare: any,
) {
  if (viewShare.id) {
    return client
      .from("viewShare")
      .update(viewShare)
      .eq("id", viewShare.id)
      .select();
  }

  return client.from("viewShare").insert(viewShare).select();
}

export async function getViews(
  client: SupabaseClient<Database>,
  companyId: string,
  userId: string,
  table: string,
  viewType: string,
) {
  let query = client
    .from("view")
    .select("id, name, privacy, viewDetail(params, tableConf)")
    .eq("companyId", companyId)
    .eq("entity", table)
    .order("createdOn", { ascending: false })
    .is("deletedOn", null);

  if (viewType === "sharedWithMe") {
    const { data: sharedViews, error: sharedViewsError } = await client
      .from("viewShare")
      .select("viewId")
      .eq("sharedWith", userId)
      .is("deletedOn", null);

    if (sharedViewsError) {
      console.error(sharedViewsError);
      return [];
    }

    const sharedViewIds = sharedViews.map((viewShare) => viewShare.viewId);
    query = query.in("id", sharedViewIds).eq("privacy", "Private");
  } else if (viewType === "public") {
    query = query.eq("privacy", "Public");
  } else {
    query = query.eq("createdBy", userId);
  }

  const { data: views, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  if (views.length === 0) {
    return views;
  }

  const viewIds = views.map((view) => view.id);
  const { data: viewShares, error: viewShareError } = await client
    .from("viewShare")
    .select("viewId, sharedWith")
    .in("viewId", viewIds)
    .is("deletedOn", null);

  if (viewShareError) {
    console.error(viewShareError);
    return views;
  }

  const userIds = viewShares.map((viewShare) => viewShare.sharedWith);
  const uniqueUserIds = [...new Set(userIds)];

  if (uniqueUserIds.length > 0) {
    const { data: users, error: usersError } = await client
      .from("user")
      .select("*")
      .in("id", uniqueUserIds);

    if (usersError) {
      console.error(usersError);
      return views;
    }

    // Map user details to their IDs for quick lookup
    const usersMap = users.reduce(
      (acc: { [key: string]: User }, user: User) => {
        acc[user.id] = user;
        return acc;
      },
      {},
    );

    // Add user details to each view's sharedWith field
    const viewsWithUserDetails = views.map((view) => ({
      ...view,
      sharedWith: viewShares
        .filter((viewShare) => viewShare.viewId === view.id)
        .map((viewShare) => usersMap[viewShare.sharedWith])
        .filter(Boolean),
    }));

    return viewsWithUserDetails;
  }

  return views;
}

export async function deleteView(
  client: SupabaseClient<Database>,
  companyId: string,
  userId: string,
  viewId: string,
) {
  const { data: view, error: viewError } = await client
    .from("view")
    .select("id, createdBy")
    .eq("id", viewId)
    .eq("companyId", companyId)
    .single();

  if (viewError || !view) {
    console.error(
      `View not found or access denied: ${
        viewError?.message || "No view found"
      }`,
    );
    return {
      data: null,
      error: `View not found or access denied`,
    };
  }

  if (view.createdBy !== userId) {
    console.error(`User does not have permission to delete this view.`);
    return {
      data: null,
      error: `User does not have permission to delete this view.`,
    };
  }

  const { data, error } = await client
    .from("view")
    .update({
      deletedOn: new Date().toISOString(),
      deletedBy: userId,
    })
    .eq("id", viewId)
    .eq("companyId", companyId)
    .select();

  if (error) {
    console.error(`Failed to delete the view: ${error.message}`);
    return {
      data: null,
      error: `Failed to delete the view`,
    };
  }

  return {
    data,
    error: null,
  };
}

export const deleteSharedMemberFromViewShare = async (
  client: SupabaseClient<Database>,
  viewId: string,
  userId: string,
) => {
  return client
    .from("viewShare")
    .update({
      deletedBy: userId,
      deletedOn: new Date().toISOString(),
    })
    .eq("viewId", viewId)
    .select();
};

export async function updateViewColumns(
  client: SupabaseClient<Database>,
  viewId: string,
  updates: { [key: string]: any },
  companyId: string,
  userId: string,
) {
  const { data: view, error: viewError } = await client
    .from("view")
    .select("id, createdBy")
    .eq("id", viewId)
    .eq("companyId", companyId)
    .single();

  if (viewError) {
    console.error(`View not found or access denied: ${viewError.message}`);
    return {
      data: null,
      error: `View not found or access denied`,
    };
  }

  if (view.createdBy !== userId) {
    console.error(`User does not have permission to update this view.`);
    return {
      data: null,
      error: `User does not have permission to update this view.`,
    };
  }

  const { data, error } = await client
    .from("view")
    .update({
      ...updates,
      modifiedOn: new Date().toISOString(),
      modifiedBy: userId,
    })
    .eq("id", viewId)
    .eq("companyId", companyId)
    .select();

  if (error) {
    console.error(`Failed to update the view: ${error.message}`);
    return {
      data: null,
      error: `Failed to update the view`,
    };
  }

  return {
    data,
    error: null,
  };
}

export async function getViewById(
  client: SupabaseClient<Database>,
  viewId: string,
  companyId: string,
  userId: string,
) {
  const { data: view, error: viewError } = await client
    .from("view")
    .select("*")
    .eq("id", viewId)
    .eq("companyId", companyId)
    .single();

  if (viewError) {
    console.error(viewError);
    return {
      data: null,
      error: `Failed to fetch view with ID: ${viewId}`,
    };
  }

  const { data: viewShares, error: viewShareError } = await client
    .from("viewShare")
    .select("sharedWith")
    .eq("viewId", viewId)
    .is("deletedOn", null);

  if (viewShareError) {
    console.error(viewShareError);
    return {
      data: view,
      error: `Failed to fetch shared users for view with ID: ${viewId}`,
    };
  }

  const sharedUserIds = viewShares.flatMap((viewShare) => viewShare.sharedWith);

  if (sharedUserIds.length === 0) {
    return { data: view, error: null };
  }

  const { data: users, error: usersError } = await client
    .from("user")
    .select("*")
    .in("id", sharedUserIds);

  if (usersError) {
    console.error(usersError);
    return {
      data: view,
      error: `Failed to fetch users for view with ID: ${viewId}`,
    };
  }

  const { data: employees, error: employeesError } = await client
    .from("employee")
    .select("*")
    .in("id", sharedUserIds);

  if (employeesError) {
    console.error(employeesError);
    return {
      data: view,
      error: `Failed to fetch employees for view with ID: ${viewId}`,
    };
  }

  const employeeTypeIds = employees
    .map((employee) => employee.employeeTypeId)
    .filter(Boolean);
  const { data: employeeTypes, error: employeeTypesError } = await client
    .from("employeeType")
    .select("*")
    .in("id", employeeTypeIds);

  if (employeeTypesError) {
    console.error(employeeTypesError);
    return {
      data: view,
      error: `Failed to fetch employee types for view with ID: ${viewId}`,
    };
  }

  const usersMap = users.reduce((acc: { [key: string]: User }, user: User) => {
    acc[user.id] = user;
    return acc;
  }, {});

  const employeeTypesMap = employeeTypes.reduce(
    (acc: { [key: string]: EmployeeType }, type: EmployeeType) => {
      acc[type.id] = type;
      return acc;
    },
    {},
  );

  const populatedView = {
    ...view,
    sharedWith: employees.map((employee) => ({
      ...employee,
      ...usersMap[employee.id],
      employeeType: employeeTypesMap[employee.employeeTypeId || ""],
    })),
  };

  return { data: populatedView, error: null };
}
