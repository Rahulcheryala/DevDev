/** @format */

import { json, LoaderFunction } from "@remix-run/node";
import { getPrismaInstance } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  const prisma = await getPrismaInstance(request);
  const masterlist = await prisma.masterList.findUnique({
    where: {
      id: id,
    },
  });
  return json(masterlist);
};
