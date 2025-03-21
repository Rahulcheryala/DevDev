import { Button, cn, getValidChildren } from "@zeak/react";
import type { LinkProps } from "@remix-run/react";
import { Link } from "@remix-run/react";
import type { ComponentProps } from "react";
import { cloneElement, forwardRef } from "react";

const Breadcrumb = forwardRef<
  HTMLElement,
  ComponentProps<"nav"> & {
    useReactRouter?: boolean;
  }
>(({ className, children, useReactRouter = true, ...props }, ref) => {
  const validChildren = getValidChildren(children);
  const count = validChildren.length;
  const clones = validChildren.map((child, index) =>
    cloneElement(child, {
      isFirstChild: index === 0,
      isLastChild: index === count - 1,
    }),
  );
  return (
    <nav
      aria-label="Breadcrumb"
      ref={ref}
      className={cn("reset flex", className)}
      {...props}
    >
      <ol className="inline-flex items-center">{clones}</ol>
    </nav>
  );
});
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbItem = forwardRef<
  HTMLLIElement,
  ComponentProps<"li"> & {
    isFirstChild?: boolean;
    isLastChild?: boolean;
  }
>(({ className, children, isFirstChild, isLastChild, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center", className)}
    {...props}
  >
    {!isFirstChild && <span className="text-secondary">/</span>}
    {children}
  </li>
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  LinkProps & {
    isCurrentPage?: boolean;
  }
>(({ className, children, isCurrentPage, ...props }, ref) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "px-2 outline-none focus-visible:ring-transparent",
        className,
      )}
      asChild
    >
      {isCurrentPage ? (
        <span
          aria-current="page"
          ref={ref}
          {...props}
          className="text-primary text-sm leading-[20px] tracking-wider font-normal h-auto"
        >
          {children}
        </span>
      ) : (
        <Link
          ref={ref}
          {...props}
          prefetch="intent"
          className="text-secondary text-sm leading-[20px] tracking-wider font-normal h-auto"
        >
          {children}
        </Link>
      )}
    </Button>
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

export { BreadcrumbItem, BreadcrumbLink, Breadcrumb };
