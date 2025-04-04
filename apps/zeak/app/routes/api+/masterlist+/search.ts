import { getPrismaInstance } from "~/utils/prisma.server";
import { json, LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
    const prisma = await getPrismaInstance(request);
    const url = new URL(request.url);
    const name = url.searchParams.get("name");
    const sort = url.searchParams.get("sort");

    if (!name) {
        const masterlist = await prisma.masterList.findMany({
            where: { deletedAt: null },
            orderBy: { name: sort === "none" ? undefined : sort === "asc" ? "asc" : "desc" },
        });
        return json({ masterlist });
    }

    const masterlist = await prisma.masterList.findMany({
        where: { name: { contains: name } },
        orderBy: { name: sort === "none" ? undefined : sort === "asc" ? "asc" : "desc" },
    });
    return json({ masterlist });
}