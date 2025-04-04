import { json, LoaderFunction } from "@remix-run/node";
import { getPrismaInstance } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ request, params }) => {

  const prisma = await getPrismaInstance(request);
  const masterlist = await prisma.masterListValues.findMany({})
  return json(masterlist);
};
