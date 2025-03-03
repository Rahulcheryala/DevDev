import { Outlet } from "@remix-run/react";
import { useState } from "react";
import PricingLayout from "~/components/LayoutTypes/PricingLayout";
import ProjectXLayout from "~/components/LayoutTypes/ProjectXLayout";
import SignUpLayout from "~/components/LayoutTypes/SignUpLayout";

export default function PublicRoute() {
  const [signUpLayout] = useState(false);
  const [isPricingLayout] = useState(false);
  const [isBasicLayout] = useState(true);
  return (
    // <div className="flex min-h-screen min-w-screen">
    //   <VStack
    //     spacing={8}
    //     className="items-center mx-auto max-w-lg pt-24 px-6 z-[3]"
    //   >
    //     <Outlet />
    //   </VStack>
    //   <Background />
    // </div>

    // To run auth screens
    <>
      {/* <Outlet /> */}
      {isPricingLayout && <PricingLayout innerView={<Outlet />} />}
      {isBasicLayout && <ProjectXLayout innerView={<Outlet />} />}
      {signUpLayout && <SignUpLayout innerView={<Outlet />} />}
    </>
  );
}
