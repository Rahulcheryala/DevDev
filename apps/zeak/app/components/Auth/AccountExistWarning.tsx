import { Link } from "@remix-run/react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";

export default function AccountExistWarning() {
  return (
    <div className="rounded-[12px] p-6 w-full flex items-center justify-center mb-10 bg-yellow-50">
      <div className="flex items-center gap-2 mr-1">
        <HiOutlineQuestionMarkCircle className="text-accent-yellow" size={24} />
        <p>An account with this email already exists. </p>
      </div>
      <Link to="/v3/login">
        <span className="text-accent-primary ">Click here to sign in.</span>
      </Link>
    </div>
  );
}
