/** @format */

import {
  ActionFunctionArgs,
  ActionFunction,
  json,
  LoaderFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { getPrismaInstance } from "~/utils/prisma.server";

// GET - Fetch all values for a master list
export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const { id } = params;

  if (!id) {
    return json({ message: "Master list id is required" }, { status: 400 });
  }

  const prisma = await getPrismaInstance(request);
  const masterListValues = await prisma.masterListValue.findMany({
    where: { masterListId: id },
  });

  return json({
    message: "Master list values fetched successfully",
    values: masterListValues,
  });
};

// POST/PUT/DELETE - Handle create, update and delete operations
export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
  const { id } = params;
  if (!id) {
    return json({ message: "Master list id is required" }, { status: 400 });
  }

  const prisma = await getPrismaInstance(request);
  const method = request.method.toLowerCase();

  try {
    // CREATE
    if (method === "post") {
      const { displayName, meaning, value, setDefault, userId, isActive, editable, isDefault } = await request.json();

      // Get max sequence number
      const maxSequence = await prisma.masterListValue.findFirst({
        where: { masterListId: id },
        orderBy: { sequence: 'desc' },
        select: { sequence: true }
      });

      const newValue = await prisma.masterListValue.create({
        data: {
          displayName,
          value,
          isActive,
          editable,
          meaning,
          isDefault,
          createdBy: userId,
          masterListId: id,
          sequence: (maxSequence?.sequence || 0) + 1,
        }
      });

      return json({ message: "Value created successfully", data: newValue });
    }

    // UPDATE 
    if (method === "put") {
      const { valueId, displayName, meaning, value, setDefault } = await request.json();

      const updatedValue = await prisma.masterListValue.update({
        where: { id: valueId },
        data: {
          displayName,
          value,
          updatedAt: new Date()
        }
      });

      return json({ message: "Value updated successfully", data: updatedValue });
    }

    // DELETE
    if (method === "delete") {
      const { valueId } = await request.json();

      await prisma.masterListValue.delete({
        where: { id: valueId }
      });

      return json({ message: "Value deleted successfully" });
    }

    return json({ message: "Invalid method" }, { status: 400 });

  } catch (error) {
    console.error("Error in masterlist values action:", error);
    return json({
      message: "Operation failed",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
};
