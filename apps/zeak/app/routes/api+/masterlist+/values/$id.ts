import { json, LoaderFunction } from "@remix-run/node";
import { getPrismaInstance } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  const prisma = await getPrismaInstance(request);
  const masterlist = await prisma.masterListValue.findMany({
    where: {
      masterListId: id,
    },
  });
  return json(masterlist);
};

export async function action({ request, params }: { request: Request; params: any }) {
  const prisma = await getPrismaInstance(request);
  const { id } = params;

  if (request.method === "PUT") {
    const { value, isActive } = await request.json();
    const updatedValue = await prisma.masterListValue.update({
      where: { id },
      data: {
        value,
        isActive,
        updatedAt: new Date(),
      },
    });
    return json({
      message: "Value updated successfully",
      value: updatedValue,
      success: true
    });
  }


  return json({ message: "Method not allowed", success: false }, { status: 405 });
}
