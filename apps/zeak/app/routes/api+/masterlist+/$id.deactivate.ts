import { json } from "@remix-run/node";
import { getPrismaInstance } from "~/utils/prisma.server";

export async function action({ request, params }: { request: Request; params: any }) {
    const prisma = await getPrismaInstance(request);
    const { id } = params;

    if (request.method === "PUT") {
        // Get the original masterlist
        const originalMasterlist = await prisma.masterList.findUnique({
            where: { id },
        });

        if (!originalMasterlist) {
            return json({ message: "Masterlist not found", success: false }, { status: 404 });
        }

        // Toggle isActive status
        const updatedMasterlist = await prisma.masterList.update({
            where: { id },
            data: {
                isActive: !originalMasterlist.isActive,
                updatedAt: new Date()
            },
        });

        return json({
            message: `Masterlist ${updatedMasterlist.isActive ? 'activated' : 'deactivated'} successfully`,
            masterlist: updatedMasterlist,
            success: true
        });
    }

    return json({ message: "Method not allowed", success: false }, { status: 405 });
}
