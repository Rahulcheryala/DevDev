import { Button } from "@zeak/react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { CheckFiledCircle } from "@zeak/icons";
import { useState, useEffect } from "react";
import { SuccessPageNameMap } from "~/services/auth";
import { path } from "~/utils/path";

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  const source = url.searchParams.get("source");

  return json({
    email,
    source: source ?? SuccessPageNameMap.FORGOT_PASSWORD,
  });
}

export default function SuccessScreen() {
  const { email, source } = useLoaderData<typeof loader>();
  const [count, setCount] = useState<number>(15);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (count === 0) {
      navigate(
        source === SuccessPageNameMap.FORGOT_PASSWORD
          ? path.to.login
          : path.to.authenticatedRoot,
      );
    }
  }, [count, navigate, source]);

  return (
    <div className="grow">
      <div className="max-w-[600px] mx-auto">
        <div className="text-center">
          <CheckFiledCircle size={63} color="hsl(var(--accent-green))" />
        </div>
        {!source ? null : source === SuccessPageNameMap.FORGOT_PASSWORD ? (
          <div className="mt-[44px]">
            <h2 className="text-3xl font-semibold">
              Password reset link sent!
            </h2>
            <p className="text-accent text-base mt-4">
              Password reset instructions have been sent to
              <span className="text-tertiary"> {email}</span>. Please review
              your email and follow the provided steps.
            </p>
            <p className="mt-4 text-accent flex items-center">
              <img src="/images/clock.svg" alt="time-remaining" />{" "}
              <span className="ms-2">
                Redirecting to sign in page in {count}(s).
              </span>
            </p>
            <div className="pt-[60px] tracking-[0.5px]">
              <Button
                variant="primary"
                className="w-full tracking-[0.5px] p-4 h-auto rounded-sm"
              >
                <Link to={path.to.login}>Sign in</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-9">
            <h2 className="text-3xl font-semibold">
              Password Reset Successful!
            </h2>
            <p className="mt-4 flex items-center">
              <img src="/images/clock.svg" alt="time-remaining" />{" "}
              <span className="ms-2">
                Redirecting to sign in page in {count}(s).
              </span>
            </p>
            <div className="pt-[60px] tracking-[0.5px]">
              <Button
                variant="primary"
                className="w-full text-sm tracking-[0.5px] p-4 h-auto rounded-full"
              >
                <Link to={path.to.authenticatedRoot}>Go to Homepage</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
