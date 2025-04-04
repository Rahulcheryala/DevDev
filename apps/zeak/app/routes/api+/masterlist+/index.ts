/** @format */

import { json } from "@remix-run/node";
import { getPrismaInstance } from "~/utils/prisma.server";

export async function action({ request }: { request: Request }) {
  const prisma = await getPrismaInstance(request);
  const { name, isActive, createdBy, purpose, code, companies, startDate, endDate } = await request.json();
  if (request.method === "POST") {
    const masterlist = await prisma.masterList.create({
      data: { name, isActive, createdBy, purpose, code, companies, startDate, endDate },
    });
    if (!masterlist) {
      return json(
        { message: "Failed to create masterlist", success: false },
        { status: 400 },
      );
    }
    return json(
      { message: "Masterlist created successfully", masterlist, success: true },
      { status: 201 },
    );
  }
  if (request.method === "GET") {
    const masterlist = await prisma.masterList.findMany(
      {
        where: {
          deletedAt: null,
        },
      }
    );
    return json({ masterlist });
  }
}
