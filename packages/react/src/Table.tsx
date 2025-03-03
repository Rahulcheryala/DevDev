import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "./utils/cn";

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm !z-[1]", className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

const Thead = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("border-stroke", className)} {...props} />
));
Thead.displayName = "Thead";

const Tbody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("", className)} {...props} />
));
Tbody.displayName = "Tbody";

const Tfoot = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-muted font-medium text-foreground", className)}
    {...props}
  />
));
Tfoot.displayName = "Tfoot";

const Tr = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "transition-colors data-[state=selected]:bg-muted h-14 last:!border-b-0",
        className ? className : "",
      )}
      {...props}
    />
  ),
);
Tr.displayName = "Tr";

const Th = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "px-1 border-b border-b-stroke border-r last:border-r-0 text-left align-middle bg-accent-gray capitalize font-medium text-sm tracking-wider text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className ? className : "",
    )}
    {...props}
  />
));
Th.displayName = "Th";

const Td = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "text-secondary border-r last:border-r-0 border-stroke px-4 align-middle [&:has([role=checkbox])]:pr-0",
      className ? className : "",
    )}
    {...props}
  />
));
Td.displayName = "Td";

const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export { Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr };
