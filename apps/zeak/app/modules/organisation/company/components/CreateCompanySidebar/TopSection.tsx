import { Link } from "@remix-run/react";
import { RxSlash } from "react-icons/rx";
export default function TopSection() {
  return (
    <div className="bg-white rounded-t-zeak">
      <div className="py-[15px] px-[22px]">
        <div className={`h-full w-full`}>
          <div className=" bg-white w-full mb-2 rounded-md">
            {/* New Breadcumbs */}
            <ul className="grid grid-flow-col auto-cols-max gap-1 text-[#475467]">
              <li>
                <Link
                  to={"/"}
                  className="text-textLink text-sm leading-[20px] tracking-wider text-[#475467]"
                >
                  Organisation
                </Link>
              </li>
              <li>
                <span className="text-[#475467] text-base leading-[20px] h-[24px] flex items-center justify-center">
                  <RxSlash />
                </span>
              </li>
              <li>
                <span className=" text-sm leading-[20px] tracking-wider text-[#475467]">
                  New Company
                </span>
              </li>
            </ul>
            {/* New Breadcumbs */}
            <h1 className="text-[22px] font-[400]  text-secondary">
              Create New Company
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
