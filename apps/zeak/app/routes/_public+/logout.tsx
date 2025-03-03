import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import {
  destroyAuthSession,
  removeLoginSession,
} from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { path } from "~/utils/path";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);

  await removeLoginSession(request);

  return destroyAuthSession(request);
}

export async function loader() {
  throw redirect(path.to.root);
}
