import { Button, cn, getValidChildren } from "@zeak/react";
import type { LinkProps } from "@remix-run/react";
import { Link } from "@remix-run/react";
import type { ComponentProps } from "react";
import { cloneElement, forwardRef } from "react";
import { ChevronRight } from "lucide-react";
const Breadcrumbs = forwardRef<
  HTMLElement,
  ComponentProps<"nav"> & {
    useReactRouter?: boolean;
    separator?: "chevron" | "slash"
  }
>(({ className, children, useReactRouter = true, separator = "slash", ...props }, ref) => {
  const validChildren = getValidChildren(children);
  const count = validChildren.length;
  const clones = validChildren.map((child, index) =>
    cloneElement(child, {
      isFirstChild: index === 0,
      isLastChild: index === count - 1,
      separator: separator
    }),
  );
  return (
    <nav
      aria-label="Breadcrumb"
      ref={ref}
      className={cn("reset flex bg-transparent", className)}
      {...props}
    >
      <ol className="inline-flex items-center ">{clones}</ol>
    </nav>
  );
});
Breadcrumbs.displayName = "Breadcrumbs";

const BreadcrumbItem = forwardRef<
  HTMLLIElement,
  ComponentProps<"li"> & {
    isFirstChild?: boolean;
    isLastChild?: boolean;
    separator?: "chevron" | "slash"
  }
>(({ className, children, isFirstChild, isLastChild, separator = "slash", ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center", className)}
    {...props}
  >
    {!isFirstChild && <span className="text-muted-foreground">{separator === "slash" ? "/" : <ChevronRight className="h-4 w-4" />}</span>}
    {children}
  </li>
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  LinkProps & {
    isCurrentPage?: boolean;
    icon?: React.ReactNode;
  }
>(({ className, children, isCurrentPage, icon, ...props }, ref) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "px-2 outline-none focus-visible:ring-transparent gap-1 hover:bg-gray-200 rounded-[4px] ",
        className,{
        "text-[#475467]": !isCurrentPage,}
      )}
      asChild
    >
      {isCurrentPage ? (
        <span aria-current="page" ref={ref} {...props}>
          {icon}
          {children}
        </span>
      ) : (
        <Link ref={ref} {...props} prefetch="intent">
          {icon}
          {children}
        </Link>
      )}
    </Button>
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

export { BreadcrumbItem, BreadcrumbLink, Breadcrumbs };
