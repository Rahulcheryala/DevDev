import { useMount } from "@zeak/react";
import { useFetcher } from "@remix-run/react";
import { useMemo } from "react";
import { path } from "~/utils/path";
import type { ComboboxProps } from "~/components/Combobox";
import type { getEmployees } from "~/modules/users";
import UserCombobox from "~/components/Selectors/UserSelect/components/UserCombobox";

type EmployeeSearchInputProps = Omit<ComboboxProps, "options"> & {
  search?: string;
  existingMembers: any[];
};

const EmployeeViewSearchInput = ({
  search,
  existingMembers,
  ...props
}: EmployeeSearchInputProps) => {
  const options = useServices(search, existingMembers);

  return <UserCombobox options={options} {...props} />;
};

EmployeeViewSearchInput.displayName = "EmployeeViewSearchInput";

export default EmployeeViewSearchInput;

export const useServices = (search?: string, existingMembers?: any[]) => {
  const servicesFetcher =
    useFetcher<Awaited<ReturnType<typeof getEmployees>>>();

  useMount(() => {
    const typeQueryParams = search ? `search=${search}` : "";
    servicesFetcher.load(
      `${path.to.api.employeesSimpleList}?${typeQueryParams}`,
    );
  });

  const options = useMemo(
    () =>
      servicesFetcher.data?.data
        ? servicesFetcher.data?.data?.map((s) => ({
            value: `${s.id}`,
            label: `${s.name}`,
            avatarUrl: s.avatarUrl || "",
            email: `${s.email}`,
          }))
        : [],
    [servicesFetcher.data?.data],
  );

  return options.filter(
    (o) => !existingMembers?.some((member) => o.value === member.userId.id),
  );
};
