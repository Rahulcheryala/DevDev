import { Link, Outlet, useLocation } from "@remix-run/react";
import { Toaster, cn } from "@zeak/ui";

import { components, microComponents } from "./renderer";


export default function UIComponentsRendererLayout() {
    const location = useLocation();

    return (
        <div className="flex h-screen">
            <Toaster />
            {/* Sidebar */}
            <div className="w-64 bg-[#0D0844] text-white h-full overflow-y-auto">
                <div className="p-4 border-b border-gray-700">
                    <h2 className="text-xl font-semibold">Core Components</h2>
                </div>
                <div className="py-2">
                    {components.map((comp) => (
                        <Link
                            key={comp.label}
                            to={comp.path}
                            className={cn(
                                "block w-full text-left px-4 py-3 hover:bg-[#1a1660] transition-colors",
                                location.pathname === comp.path
                                    ? "bg-[#1a1660] border-l-4 border-[#66d4CF]"
                                    : ""
                            )}
                        >
                            {comp.label}
                        </Link>
                    ))}
                </div>
                <div className="p-4 border-b border-gray-700">
                    <h2 className="text-xl font-semibold">Micro Components</h2>
                </div>
                <div className="py-2">
                    {microComponents.map((comp) => (
                        <Link
                            key={comp.label}
                            to={comp.path}
                            className={cn(
                                "block w-full text-left px-4 py-3 hover:bg-[#1a1660] transition-colors",
                                location.pathname === comp.path
                                    ? "bg-[#1a1660] border-l-4 border-[#66d4CF]"
                                    : ""
                            )}
                        >
                            {comp.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-auto px-4">
                <Outlet />
            </div>
        </div>
    );
}

