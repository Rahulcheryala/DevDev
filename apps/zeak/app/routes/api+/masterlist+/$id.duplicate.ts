import { json } from "@remix-run/node";
import { getPrismaInstance } from "~/utils/prisma.server";

export async function action({ request, params }: { request: Request; params: any }) {
    const prisma = await getPrismaInstance(request);
    const { id } = params;

    if (request.method === "POST") {
        const { userId } = await request.json();

        // Get the original masterlist
        const originalMasterlist = await prisma.masterList.findUnique({
            where: { id },
        });

        if (!originalMasterlist) {
            return json({ message: "Masterlist not found", success: false }, { status: 404 });
        }

        // Create new masterlist with copied data
        const duplicatedMasterlist = await prisma.masterList.create({
            data: {
                name: `Copy of ${originalMasterlist.name}`,
                code: `${originalMasterlist.code}`,
                purpose: originalMasterlist.purpose,
                isActive: originalMasterlist.isActive,
                createdBy: userId,
            },
        });

        return json({
            message: "Masterlist duplicated successfully",
            masterlist: duplicatedMasterlist,
            success: true
        });
    }

    return json({ message: "Method not allowed", success: false }, { status: 405 });
}
