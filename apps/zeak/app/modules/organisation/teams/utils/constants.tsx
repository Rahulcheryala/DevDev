import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Avatar, Button, MenuItem, toast, useDisclosure } from "@zeak/react";
import { companyStatusMap } from "~/modules/access-settings";

export const tabsLinks = [
  {
    id: 1,
    title: "Dashboard",
    value: "dashboard",
    content: "Dashboard",
  },
  {
    id: 2,
    title: "All Teams",
    value: "allTeams",
    content: "All Teams",
  },

];


export const companiesTableColumns: ColumnDef<any>[] = [
  {
    accessorKey: "logo",
    cell: (item) => (
      <Avatar
        src={item.getValue() as string}
        name={item?.row?.original?.name as string}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Team Name",
    cell: (item) => item.getValue(),
  },
  {
    accessorKey: "companyCode",
    header: "Team Code",
    cell: (item) => item.getValue(),
  },
  {
    accessorKey: "domainUrl",
    header: "URL",
    cell: (item) => item.getValue(),
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: {
      getCellContext: (context: any) => {
        return {
          className:
            context.getValue() === companyStatusMap.ACTIVE
              ? `bg-[rgba(4,_167,_119,_0.2)] text-center text-[#04A777]`
              : `bg-[rgba(0,_0,_0,_0.06)] text-center text-[#5E626D]`,
        };
      },
    },
  },
];

//   return [
//     {
//       accessorKey: "logo",
//       cell: (item) => (
//         <Avatar
//           src={item.getValue() as string}
//           name={item?.row?.original?.name as string}
//         />
//       ),
//     },
//     {
//       accessorKey: "name",
//       header: "Company Name",
//       cell: (item) => item.getValue(),
//     },
//     {
//       accessorKey: "companyCode",
//       header: "Company Code",
//       cell: (item) => item.getValue(),
//     },
//     {
//       accessorKey: "domainUrl",
//       header: "URL",
//       cell: (item) => item.getValue(),
//     },
//     {
//       accessorKey: "status",
//       header: "Status",
//       meta: {
//         getCellContext: (context: any) => {
//           return {
//             className:
//               context.getValue() === companyStatusMap.ACTIVE
//                 ? `bg-[rgba(4,_167,_119,_0.2)] text-center text-[#04A777]`
//                 : `bg-[rgba(0,_0,_0,_0.06)] text-center text-[#5E626D]`,
//           };
//         },
//       },
//     },
//   ];
// }, []);
