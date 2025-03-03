import { useMount } from "@zeak/react";
import { useFetcher } from "@remix-run/react";
import { useMemo } from "react";
import type { ComboboxProps } from "~/components/Combobox";
import UserMultiselect from "~/components/Selectors/UserSelect/components/UserMultiselect";
import { useUser } from "~/hooks";
import type { getEmployees } from "~/modules/users";
import { path } from "~/utils/path";

type UserMultiSelectSearchInputProps = Omit<ComboboxProps, "options"> & {
  search?: string;
  existingMembers: any[];
  onChange: (selected: string[]) => void;
};

const UserMultiSelectSearchInput = ({
  search,
  existingMembers,
  ...props
}: UserMultiSelectSearchInputProps) => {
  const options = useServices(search, existingMembers);

  return (
    <UserMultiselect
      options={options}
      existingMembers={existingMembers}
      onChange={props.onChange}
    />
  );
};

UserMultiSelectSearchInput.displayName = "UserMultiSelectSearchInput";

export default UserMultiSelectSearchInput;

export const useServices = (search?: string, existingMembers?: any[]) => {
  const servicesFetcher =
    useFetcher<Awaited<ReturnType<typeof getEmployees>>>();
  const user = useUser();

  useMount(() => {
    const typeQueryParams = search ? `search=${search}` : "";
    servicesFetcher.load(
      `${path.to.api.employeesSimpleList}?${typeQueryParams}`,
    );
  });

  const options = useMemo(
    () =>
      servicesFetcher.data?.data
        ? servicesFetcher.data?.data.map((s) => ({
            value: `${s.id}`,
            label: `${s.name}`,
            avatarUrl: s.avatarUrl || "",
            email: `${s.email}`,
          }))
        : [],
    [servicesFetcher.data?.data],
  );

  return options.filter(
    (o) =>
      o.value !== user.id &&
      !existingMembers?.some((member) => o.value === member.id),
  );
};
