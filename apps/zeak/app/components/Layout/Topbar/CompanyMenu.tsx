import {
  Avatar,
  HStack,
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
} from "@zeak/react";
import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import { useRouteData } from "~/hooks";
import type { Company } from "~/modules/settings";
import { path } from "~/utils/path";

const CompanyMenu = () => {
  const fetcher = useFetcher();
  const routeData = useRouteData<{ company: Company; companies: Company[] }>(
    path.to.authenticatedRoot,
  );

  const options =
    routeData?.companies.map((c) => ({
      label: c.name,
      value: c.id,
      logo: c.logo,
    })) ?? [];

  const [value, setValue] = useState(routeData?.company?.id);
  const handleValueChange = (companyId: string) => {
    setValue(companyId);
    fetcher.submit(null, {
      method: "post",
      action: path.to.companySwitch(companyId),
    });
  };
  return (
    value && (
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[160px] h-[40px] bg-white pl-[16px] border-0">
          <div className="flex flex-col text-left">
            <span className="block font-semibold text-[8px] text-[#0E77D3] leading-[10px]">
              COMPANY
            </span>
            {/* <img src={data[value].imgUrl} className="w-[20px] h-[20px]" alt="" /> */}
            <span className="text-sm leading-[15px] tracking-wider text-accent">
              {routeData?.company?.name}
            </span>
          </div>
        </SelectTrigger>
        <SelectContent position="popper" align="end">
          {options.map((c, index) => {
            return (
              <div key={c.value}>
                {index !== 0 && <SelectSeparator />}
                <SelectItem
                  key={c.value}
                  className="min-w-[300px] py-4 rounded-none pl-3"
                  style={{ margin: "-4px" }}
                  value={c.value as string}
                >
                  <>
                    <HStack>
                      <Avatar
                        size="xs"
                        className="mr-2"
                        name={c.label ?? undefined}
                        src={c.logo ?? undefined}
                      />
                      <p className="text-sm ml-0 font-normal tracking-0.5px]">
                        {c.label}
                      </p>
                    </HStack>
                  </>
                </SelectItem>
              </div>
            );
          })}
        </SelectContent>
      </Select>
    )
  );
};

export default CompanyMenu;
