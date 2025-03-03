import { Button } from "@zeak/react";
import { Link } from "@remix-run/react";
import { CheckFiledCircle } from "@zeak/icons";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { path } from "~/utils/path";

const InvitationLink = () => {
  const [isLinkValid] = useState(false);
  return (
    <div className="grow">
      <div className="max-w-[600px] mx-auto">
        {isLinkValid ? (
          <>
            <div className="text-center">
              <CheckFiledCircle size={63} color="hsl(var(--accent-green))" />
            </div>
            <div className="mt-[44px]">
              <h2 className="text-3xl font-semibold text-accent-dark">
                Invitation Accepted
              </h2>
              <p className="text-accent text-base mt-4">
                You have already accepted this invitation and completed your
                account setup.
              </p>
              <p className="mt-4 text-accent flex items-center">
                <img src="/images/clock.svg" alt="time-remaining" />{" "}
                <span className="ms-2">
                  Redirecting to sign in page in 15(s).
                </span>
              </p>
              <div className="pt-[60px] tracking-[0.5px]">
                <Button
                  variant="primary"
                  className="w-full tracking-[0.5px] p-4 h-auto rounded-sm"
                >
                  <Link to={path.to.authenticatedRoot}>Go to Homepage</Link>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <IoCloseCircleSharp size={63} color="hsl(var(--accent-red))" />
            </div>
            <div className="mt-9">
              <h2 className="text-3xl font-semibold text-accent-dark">
                Invitation Link Expired
              </h2>
              <p className="text-accent text-base mt-4">
                The invitation link you clicked has expired. Please contact your
                system administrator to request a new invitation link.
              </p>
              <div className="pt-[60px] tracking-[0.5px]">
                <Button
                  variant="primary"
                  className="w-full tracking-[0.5px] p-4 h-auto rounded-sm"
                >
                  <Link to={path.to.authenticatedRoot}>Go to Homepage</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InvitationLink;
