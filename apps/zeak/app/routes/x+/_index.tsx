import { Heading, cn } from "@zeak/react";
import { getLocalTimeZone } from "@internationalized/date";
import { Link } from "@remix-run/react";
import type { ComponentProps } from "react";
import { useModules } from "~/components/Layout/Navigation/useModules";
import { useUser } from "~/hooks";
import type { Authenticated, NavItem } from "~/types";

const formatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
  timeZone: getLocalTimeZone(),
});

export default function AppIndexRoute() {
  const user = useUser();
  const modules = useModules();
  const date = new Date();
  return (
    <div className="p-8 w-full bg-white rounded-tl-[10px]">
      <Heading size="h3">Hello, {user.firstName}</Heading>
      <Subheading>{formatter.format(date)}</Subheading>
      <Hr />
      <Subheading className="mb-8">Modules</Subheading>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {modules.map((module) => (
          // @ts-ignore
          <ModuleCard key={module?.name} module={module} />
        ))}
      </div>
    </div>
  );
}

const Hr = () => (
  <hr className="h-px my-8 bg-black/10 border-0 dark:bg-white/10" />
);

const Subheading = ({ children, className }: ComponentProps<"p">) => (
  <p className={cn("text-muted-foreground text-base font-light", className)}>
    {children}
  </p>
);

const ModuleCard = ({ module }: { module: Authenticated<NavItem> }) => (
  <Link
    to={module.to}
    prefetch="intent"
    className="flex flex-col gap-6 items-center justify-center py-8 bg-gradient-to-bl from-card to-background rounded-lg shadow text-center group ring-2 ring-transparent hover:ring-white/10 group cursor-pointer"
  >
    <module.icon className="text-3xl" />
    <span className="text-sm py-1 px-4 border border-border rounded-full group-hover:bg-accent group-hover:text-white">
      {module.name}
    </span>
  </Link>
);
