import type { Database } from "@zeak/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import logger from "~/lib/logger";
import type {
  CommentReply,
  CommentTag,
  CreateComment,
  UpdateComment,
  UpdateCommentCard,
} from "./types";

async function createCommentCard(
  client: SupabaseClient<Database>,
  newCommentCard: Database["public"]["Tables"]["labelsReportsCommentsCard"]["Insert"],
) {
  if (newCommentCard) {
    return client
      .from("labelsReportsCommentsCard")
      .insert(newCommentCard)
      .single();
  } else {
    logger.error("Error creating comment card: No data provided.");
    return null;
  }
}

async function updateCommentCard(
  client: SupabaseClient<Database>,
  updatedCommentCard: UpdateCommentCard,
) {
  return (
    client
      .from("labelsReportsCommentsCard")
      // TODO remove any
      .update(updatedCommentCard as any)
      .eq("id", updatedCommentCard.id)
      .single()
  );
}

async function createComment(
  client: SupabaseClient<Database>,
  newComment: CreateComment,
) {
  if (newComment) {
    return client.from("labelsReportsComments").insert(newComment).single();
  } else {
    logger.error("Error creating comment: No data provided.");
    return null;
  }
}

async function getComments(client: SupabaseClient<Database>, labelId: string) {
  return client
    .from("labelsReportsComments")
    .select(
      `
      id,
      labelId,
      content,
      pinLocation,
      pinned,
      resolved,
      companyId,
      createdBy(id, fullName, firstName),
      createdOn,
      modifiedBy,
      modifiedOn,
      deletedBy,
      deletedOn,
      commentBoxId
      `,
    )
    .is("deletedBy", null)
    .is("resolved", null)
    .eq("labelId", labelId);
}

async function getResolvedComments(
  client: SupabaseClient<Database>,
  labelId: string,
) {
  return client
    .from("labelsReportsComments")
    .select(
      `
      id,
      labelId,
      content,
      pinLocation,
      pinned,
      resolved,
      companyId,
      createdBy(id, fullName, firstName),
      createdOn,
      modifiedBy,
      modifiedOn,
      deletedBy,
      deletedOn,
      commentBoxId
      `,
    )
    .is("deletedBy", null)
    .is("resolved", true)
    .eq("labelId", labelId);
}

async function getLabelComments(
  client: SupabaseClient<Database>,
  labelId: string,
) {
  return client
    .from("labelsReportsComments")
    .select(
      `
      id,
      labelId,
      content,
      pinLocation,
      pinned,
      resolved,
      companyId,
      createdBy(id, fullName, firstName),
      createdOn,
      modifiedBy,
      modifiedOn,
      deletedBy,
      deletedOn,
      commentBoxId
      `,
    )
    .is("deletedBy", null)
    .eq("labelId", labelId);
}

async function getCommentReplies(
  client: SupabaseClient<Database>,
  commentId: string,
) {
  return await client
    .from("labelsReportsCommentsReplies")
    .select("*")
    .eq("commentId", commentId);
}

async function getCommentTags(
  client: SupabaseClient<Database>,
  commentId: string,
) {
  return client
    .from("labelsReportsCommentsTags")
    .select("*")
    .eq("commentId", commentId);
}

async function createCommentReply(
  client: SupabaseClient<Database>,
  newReply: CommentReply,
) {
  return client.from("labelsReportsCommentsReplies").insert(newReply).single();
}

async function createCommentTag(
  client: SupabaseClient<Database>,
  newTag: CommentTag,
) {
  const { data, error } = await client
    .from("labelsReportsCommentsTags")
    .insert(newTag)
    .single();

  if (error) {
    logger.error("Error creating comment tag:", error);
    throw error;
  }

  return data;
}

async function updateComment(
  client: SupabaseClient<Database>,
  {
    commentId,
    updatedComment,
  }: {
    commentId: string;
    updatedComment: UpdateComment;
  },
) {
  return (
    client
      .from("labelsReportsComments")
      // TODO remove any
      .update(updatedComment as any)
      .eq("id", commentId)
      .single()
  );
}

async function deleteComment(
  client: SupabaseClient<Database>,
  {
    commentId,
    deletedBy,
  }: {
    commentId: string;
    deletedBy: string;
  },
) {
  return client
    .from("labelsReportsComments")
    .update({ deletedBy })
    .eq("id", commentId)
    .select();
}

async function resolvedComment(
  client: SupabaseClient<Database>,
  {
    commentId,
    resolved,
  }: {
    commentId: string;
    resolved: boolean;
  },
) {
  return client
    .from("labelsReportsComments")
    .update({ resolved })
    .eq("id", commentId)
    .select();
}

export const commentServerService = {
  createCommentCard,
  updateCommentCard,
  createComment,
  getComments,
  getResolvedComments,
  getLabelComments,
  getCommentReplies,
  getCommentTags,
  createCommentReply,
  createCommentTag,
  updateComment,
  deleteComment,
  resolvedComment,
};
