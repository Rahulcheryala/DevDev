import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { getPrismaInstance } from "~/utils/prisma.server";
export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const prisma = await getPrismaInstance(request);
  const masterList = await prisma.masterList.findMany({});

  return json({
    message: "Master list fetched successfully",
    data: masterList,
  });
};
