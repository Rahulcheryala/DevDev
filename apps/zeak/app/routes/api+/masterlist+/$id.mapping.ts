import { json } from "@remix-run/node";
import { getPrismaInstance } from "~/utils/prisma.server";
import type { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request, params }: ActionFunctionArgs) {
    if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, { status: 405 });
    }

    const { id } = params;
    const prisma = await getPrismaInstance(request);
    const { data } = await request.json();
    const { masterListId, companyId, status, userId } = data;
    const mapping = await prisma.masterListMapping.create({
        data: {
            masterListId,
            status,
            company: companyId,
            createdBy: userId,
        }
    });
    return json({ mapping });
}
