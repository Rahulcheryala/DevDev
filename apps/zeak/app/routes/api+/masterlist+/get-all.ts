import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { getPrismaInstance } from "~/utils/prisma.server";
export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const prisma = await getPrismaInstance(request);
  const url = new URL(request.url);
  const sort = url.searchParams.get("sort");
  const masterList = await prisma.masterList.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      name: sort === "none" ? undefined : sort === "asc" ? "asc" : "desc",
    },
  });

  return json({
    message: "Master list fetched successfully",
    data: masterList,
  });
};
