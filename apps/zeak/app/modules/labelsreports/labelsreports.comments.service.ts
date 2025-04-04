import logger from "~/lib/logger";
import type {
  CommentReply,
  CommentTag,
  CreateComment,
  CreateCommentCard,
  UpdateComment,
  UpdateCommentCard,
} from "./types";
import axios from "axios";
import { path } from "~/utils/path";

const getFormData = (functionName: string, args: any) => {
  const formData = new FormData();
  formData.append("functionName", functionName);
  formData.append(
    "args",
    typeof args === "string" ? args : JSON.stringify(args),
  );
  return formData;
};

export async function createCommentCard(
  newCommentCard: CreateCommentCard,
): Promise<CreateCommentCard | null> {
  if (newCommentCard) {
    const formData = getFormData("createCommentCard", { ...newCommentCard });

    const {
      data: { data, error },
    } = await axios({
      method: "post",
      url: path.to.api.labelComment,
      data: formData,
    });

    if (error) {
      logger.error("Error creating comment card:", error);
      throw error;
    }

    return data;
  } else {
    logger.error("Error creating comment card: No data provided.");
    return null;
  }
}

export async function updateCommentCard(updatedCommentCard: UpdateCommentCard) {
  const formData = getFormData("updateCommentCard", updatedCommentCard);

  const {
    data: { data, error },
  } = await axios({
    method: "post",
    url: path.to.api.labelComment,
    data: formData,
  });

  if (error) {
    logger.error("Error updating comment card:", error);
    throw error;
  }

  return data;
}

export async function createComment(newComment: CreateComment) {
  if (newComment) {
    const formData = getFormData("createComment", newComment);

    const {
      data: { data, error },
    } = await axios({
      method: "post",
      url: path.to.api.labelComment,
      data: formData,
    });

    if (error) {
      logger.error("Error creating comment:", error);
      throw error;
    }

    return data;
  } else {
    logger.error("Error creating comment: No data provided.");
    return null;
  }
}

export async function getComments(labelId: string) {
  const formData = getFormData("getComments", labelId);
  const {
    data: { data, error },
  } = await axios({
    method: "post",
    url: path.to.api.labelComment,
    data: formData,
  });

  if (error) {
    logger.error("Error fetching comments:", error);
    throw error;
  }

  return data || [];
}

export async function getResolvedComments(labelId: string): Promise<Comment[]> {
  const formData = getFormData("getResolvedComments", labelId);
  const {
    data: { data, error },
  } = await axios({
    method: "post",
    url: path.to.api.labelComment,
    data: formData,
  });

  if (error) {
    logger.error("Error fetching resolved comments:", error);
    throw error;
  }

  // TODO remove any
  return (data || []) as any;
}

export async function getLabelComments(labelId: string) {
  const formData = getFormData("getLabelComments", labelId);
  const {
    data: { data, error },
  } = await axios({
    method: "post",
    url: path.to.api.labelComment,
    data: formData,
  });

  if (error) {
    logger.error("Error fetching label comments:", error);
    throw error;
  }

  return data;
}

export async function getCommentReplies(commentId: string) {
  const formData = getFormData("getCommentReplies", commentId);
  const {
    data: { data, error },
  } = await axios({
    method: "post",
    url: path.to.api.labelComment,
    data: formData,
  });

  if (error) {
    logger.error("Error fetching comment replies:", error);
    throw error;
  }

  return data;
}

export async function getCommentTags(commentId: string) {
  const formData = getFormData("getCommentTags", commentId);
  const {
    data: { data, error },
  } = await axios({
    method: "post",
    url: path.to.api.labelComment,
    data: formData,
  });

  if (error) {
    logger.error("Error fetching comment tags:", error);
    throw error;
  }

  return data;
}

export async function createCommentReply(newReply: CommentReply) {
  const formData = getFormData("createCommentReply", newReply);
  const {
    data: { data, error },
  } = await axios({
    method: "post",
    url: path.to.api.labelComment,
    data: formData,
  });

  if (error) {
    logger.error("Error creating comment reply:", error);
    throw error;
  }

  return data;
}

export async function createCommentTag(newTag: CommentTag) {
  const formData = getFormData("createCommentTag", newTag);
  const {
    data: { data, error },
  } = await axios({
    method: "post",
    url: path.to.api.labelComment,
    data: formData,
  });
  if (error) {
    logger.error("Error creating comment tag:", error);
    throw error;
  }

  return data;
}

export async function updateComment(
  commentId: string,
  updatedComment: UpdateComment,
) {
  const formData = getFormData("updateComment", { commentId, updatedComment });
  const {
    data: { data, error },
  } = await axios({
    method: "post",
    url: path.to.api.labelComment,
    data: formData,
  });

  if (error) {
    logger.error("Error updating comment:", error);
    throw error;
  }

  return data;
}

export async function deleteComment(commentId: string, deletedBy: string) {
  const formData = getFormData("deleteComment", { commentId, deletedBy });
  const {
    data: { data, error },
  } = await axios({
    method: "post",
    url: path.to.api.labelComment,
    data: formData,
  });

  if (error) {
    logger.error("Error deleting comment:", error);
    throw error;
  }

  return data;
}

export async function resolvedComment(commentId: string, resolved: boolean) {
  const formData = getFormData("resolvedComment", { commentId, resolved });
  const {
    data: { data, error },
  } = await axios({
    method: "post",
    url: path.to.api.labelComment,
    data: formData,
  });

  if (error) {
    logger.error("Error resolving comment:", error);
    throw error;
  }

  return data;
}

export const commentService = {
  getComments,
  getLabelComments,
  getCommentReplies,
  getCommentTags,
  createComment,
  createCommentReply,
  createCommentTag,
  updateComment,
  deleteComment,
  resolvedComment,
  createCommentCard,
  updateCommentCard,
  getResolvedComments,
};
