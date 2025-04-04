import { json, LoaderFunction } from "@remix-run/node";
import { getPrismaInstance } from "~/utils/prisma.server";
import { requireAuthSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  const prisma = await getPrismaInstance(request);
  const masterlist = await prisma.masterList.findUnique({
    where: {
      id: id,
    },
    include: {
      masterListMappings: true,
    }
  });
  return json(masterlist);
};

export async function action({ request, params }: { request: Request; params: any }) {
  const prisma = await getPrismaInstance(request);
  const { id } = params;
  const { userId } = await requireAuthSession(request);

  if (request.method === "DELETE") {

    const deletedMasterlist = await prisma.masterList.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: new Date(),
        deletedBy: userId,
      },
    });
    return json({ message: "Masterlist deleted successfully", success: true });
  }

  if (request.method === "PUT") {
    const { name, isActive, purpose, startDate, endDate, lastUpdatedBy } = await request.json();
    const updatedMasterlist = await prisma.masterList.update({
      where: { id },
      data: {
        name,
        isActive,
        purpose,
        startDate,
        endDate,
        updatedAt: new Date(),
        lastUpdatedBy,
      },
    });
    return json({
      message: "Masterlist updated successfully",
      masterlist: updatedMasterlist,
      success: true
    });
  }



  return json({ message: "Method not allowed", success: false }, { status: 405 });
}
