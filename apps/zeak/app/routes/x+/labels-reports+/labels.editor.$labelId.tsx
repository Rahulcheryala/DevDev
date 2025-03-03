import { Suspense, lazy, useEffect, useState } from "react";
import { json, redirect, useFetcher, useLoaderData } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
// import * as EditorCss from "xcelpros-ui-lib/dist/editor.esm.css";
import { requirePermissions } from "~/services/auth/auth.server";
import { assertIsPost, notFound } from "~/utils/http";
import type { LabelsReports } from "~/modules/labelsreports";
import {
  editLabelValidator,
  getLabel,
  upsertLabel,
} from "~/modules/labelsreports";
import { path } from "~/utils/path";
import { flash } from "~/services/session.server";
import { error, success } from "~/utils/result";
import { validationError, validator } from "@zeak/remix-validated-form";
import { getAccount } from "~/modules/account";
import { commentService } from "~/modules/labelsreports/labelsreports.comments.service";
let LazyImported = lazy(() => import("~/modules/labelsreports/ui/Editor"));

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { client } = await requirePermissions(request, {
    create: "labelsreports",
    update: "labelsreports",
    view: "labelsreports",
  });

  const { labelId } = params;
  if (!labelId) throw notFound("Invalid labelId");

  const label = await getLabel(client, labelId);
  if (label.error) {
    return redirect(
      path.to.labelsreportsHome(),
      await flash(request, error(label.error, "Failed to fetch label details")),
    );
  }

  const lastUser = await getAccount(
    client,
    label.data.modifiedBy || label.data.createdBy,
  );
  if (lastUser.error) {
    return redirect(
      path.to.labelsreportsHome(),
      await flash(
        request,
        error(lastUser.error, "Failed to fetch user details"),
      ),
    );
  }
  return json({ label: label.data, user: lastUser.data });
}

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);
  const { client, userId } = await requirePermissions(request, {
    update: "labelsreports",
  });

  const formData = await request.formData();

  const validation = await validator(editLabelValidator).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  const {
    id,
    name,
    width,
    height,
    size,
    configuration,
    previewUrl,
    flashSuccessMsg,
    isFavorite,
    status,
  } = validation.data;

  const updateLabel = await upsertLabel(client, {
    id,
    ...(name && { name }),
    ...(width && { width }),
    ...(height && { height }),
    ...(size && { size }),
    ...(configuration && { configuration }),
    ...(previewUrl && { previewUrl }),
    ...(isFavorite && { isFavorite: isFavorite === "true" }),
    ...(status && { status }),
    modifiedBy: userId,
    modifiedOn: new Date().toISOString(),
  });

  if (updateLabel.error) {
    return json(
      previewUrl && configuration ? { saveLabel: false } : updateLabel,
      await flash(
        request,
        error(updateLabel.error, "Failed to update label detail."),
      ),
    );
  }

  return json(
    previewUrl && configuration ? { saveLabel: true } : null,
    await flash(request, success(flashSuccessMsg || "Label updated")),
  );
}

export default function LabelsViewRoute() {
  const { label, user } = useLoaderData<typeof loader>();
  const [labelDetails, setLabelDetails] = useState<LabelsReports>(label);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      setLabelDetails({
        ...labelDetails,
        ...fetcher.data,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.data]);

  const updateLabel = (value: { [key: string]: string }) => {
    const formData = new FormData();
    Object.keys(value).forEach((keyName) => {
      formData.append(keyName, value[keyName]);
    });
    formData.append("flashSuccessMsg", "Label updated");
    fetcher.submit(formData, { method: "post" });
  };

  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <LazyImported
          user={user}
          {...labelDetails}
          commentService={commentService}
          updateLabel={updateLabel}
        />
      </Suspense>
    </div>
  );
}

// export function links() {
//   return [{ rel: "stylesheet", href: EditorCss }];
// }
