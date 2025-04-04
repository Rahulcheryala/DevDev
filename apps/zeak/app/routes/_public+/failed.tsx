import { Button } from "@zeak/react";
import { Link } from "@remix-run/react";
import { IoMdCloseCircle } from "react-icons/io";
import { path } from "~/utils/path";

export default function FailedScreen() {
  return (
    <div className="grow">
      <div className="max-w-[600px] mx-auto">
        <div className="text-center">
          <IoMdCloseCircle size={63} className="text-accent-red" />
        </div>
        <div className="mt-[44px]">
          <h2 className="text-3xl font-semibold">
            Your account has been locked
          </h2>
          <p className="text-accent text-base mt-4">
            Your account has been locked after too many failed attempts. You
            will receive an email with a link to unlock it.
          </p>
          <div className="pt-[60px] tracking-[0.5px]">
            <Button
              variant="primary"
              className="w-full tracking-[0.5px] p-4 h-auto rounded-sm"
            >
              <Link to={path.to.login}>Go to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
