/** @format */

import {
  ActionFunctionArgs,
  ActionFunction,
  json,
  LoaderFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { getPrismaInstance } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const { id } = params;

  if (!id) {
    return json({
      message: "Master list id is required",
    });
  }
  const prisma = await getPrismaInstance(request);
  const masterListValues = await prisma.masterListValue.findMany({
    where: {
      masterListId: id,
    },
  });

  return json({
    message: "Master list values fetched successfully",
    id: id,
    values: masterListValues,
  });
};
