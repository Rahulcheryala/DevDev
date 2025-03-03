import { useMount } from "@zeak/react";
import { useFetcher } from "@remix-run/react";
import { memo, useEffect, useMemo, useState } from "react";
import { path } from "~/utils/path";
import type { getEmployeesSimpleList } from "~/modules/users";
import { type DropdownCustomOption } from "~/modules/shared";
import { CustomSearchDropdown } from "~/modules/shared/ui/CustomSearchDropdown";

type DropdownEmployee = {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
};

type EmployeeDepartmentSearchInputProps = {
  existingMembers: Array<DropdownEmployee>;
  onSubmit: (members: Array<DropdownEmployee>) => void;
};

const useServices = (
  search?: string,
  existingMembers?: Array<DropdownEmployee>,
) => {
  const servicesFetcher =
    useFetcher<Awaited<ReturnType<typeof getEmployeesSimpleList>>>();

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
            value: s,
            labelHeading: s?.name || "",
            labelSubheading: s?.email || "",
            avatarName: s?.name || "",
            avatarUrl: s.avatarUrl || "",
          }))
        : [],
    [servicesFetcher.data?.data],
  );

  return options
    .filter(
      (o) => !existingMembers?.some((member) => o?.value?.id === member?.id),
    )
    .map((item: Omit<DropdownCustomOption, "isChecked">) => ({
      ...item,
      isChecked: !!existingMembers?.some(
        (member) => member.id === item?.value?.id,
      ),
    }));
};

const EmployeeDepartmentSearchInput = memo(
  ({
    existingMembers,
    onSubmit,
    ...props
  }: EmployeeDepartmentSearchInputProps) => {
    const [members, setMembers] = useState<Array<DropdownEmployee>>([]);

    useEffect(() => setMembers(existingMembers), [existingMembers]);

    const allOptions = useServices("", members);

    const handleSubmit = (selectedMembes: Array<DropdownCustomOption>) => {
      onSubmit(selectedMembes.map((m) => m.value));
    };

    return (
      <CustomSearchDropdown allOptions={allOptions} onSubmit={handleSubmit} />
    );
  },
  (props, nextProps) => {
    return props.existingMembers === nextProps.existingMembers;
  },
);

EmployeeDepartmentSearchInput.displayName = "EmployeeDepartmentSearchInput";

export default EmployeeDepartmentSearchInput;
