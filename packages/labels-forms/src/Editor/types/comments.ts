import { Position } from "./shared";

export type Comment = {
  companyId: string;
  content: string;
  createdOn: string;
  createdBy: string;
  deletedOn: string | null;
  deletedBy: string | null;
  id: string;
  labelId: string;
  pinLocation: CommentPosition;
  pinned: boolean | null;
  resolved: boolean | null;
  modifiedOn: string | null;
  modifiedBy: string | null;
  commentBoxId: string;
};

export type CreateCommentCard = {
  id: string;
  createdOn: string;
  createdBy: string;
  labelId: string;
  pinLocation: CommentPosition;
  isSubmitted: boolean;
};

export type UpdateCommentCard = {
  id: string;
  createdOn: string;
  createdBy: string;
  labelId: string;
  pinLocation?: CommentPosition;
  isSubmitted?: boolean;
};

export type CreateComment = {
  companyId: string;
  content?: any;
  createdOn?: string;
  createdBy: string;
  deletedOn?: string | null;
  deletedBy?: string | null;
  id?: string;
  labelId: string;
  pinLocation?: any;
  pinned?: boolean | null;
  resolved?: boolean | null;
  modifiedOn?: string | null;
  modifiedBy?: string | null;
  commentBoxId?: string | null;
};

export type CommentReply = {
  commentId: string;
  companyId: string;
  content: string;
  createdOn: string;
  createdBy: string;
  deletedOn: string | null;
  deletedBy: string | null;
  id: string;
  modifiedOn: string | null;
  modifiedBy: string | null;
};

export type CommentTag = {
  commentId: string;
  companyId: string;
  createdOn: string;
  id: string;
  userId: string;
};

export type CommentPosition = {
  x: number;
  y: number;
};

export type InsertComment = {
  companyId: string;
  content?: string;
  createdOn?: string;
  createdBy: string;
  deletedOn?: string | null;
  deletedBy?: string | null;
  id?: string;
  labelId: string;
  pinLocation?: Position;
  pinned?: boolean | null;
  resolved?: boolean | null;
  modifiedOn?: string | null;
  modifiedBy?: string | null;
  commentBoxId?: string | null;
};

// Separate type for updating comments
export type UpdateComment = Partial<InsertComment> & { id: string };
