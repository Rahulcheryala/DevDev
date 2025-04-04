import { json } from "@remix-run/node"
import { getPrismaInstance } from "~/utils/prisma.server";


export async function loader({ request, params }: { request: Request; params: any }) {
    const prisma = await getPrismaInstance(request);
    const mappings = await prisma.masterListMapping.findMany({

    });
    return json({
        mappings
    });
}
