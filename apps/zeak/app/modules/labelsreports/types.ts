import type { labelStatusType, labelType } from "./labelsreports.model";

import type { getLabelsReports } from "./labelsreports.service";

export type LabelsReports = NonNullable<
  Awaited<ReturnType<typeof getLabelsReports>>["data"]
>[number] & { previewSignedUrl?: string };

export type LabelStatusType = (typeof labelStatusType)[number];

export type LabelType = (typeof labelType)[number];

export type LabelModuleConfigType = {
  defaultTemplateList: Array<LabelsReports>;
};

export type Comment = {
  companyId: string;
  content: string;
  createdOn: string;
  createdBy: string;
  deletedOn: string | null;
  deletedBy: string | null;
  id: string;
  labelId: string;
  pinLocation: Position;
  pinned: boolean | null;
  resolved: boolean | null;
  updatedAt: string | null;
  updatedBy: string | null;
  commentBoxId: string;
};

export type CreateCommentCard = {
  id: string;
  createdOn: string;
  createdBy: string;
  labelId: string;
  pinLocation: Position;
  isSubmitted: boolean;
};

export type UpdateCommentCard = {
  id: string;
  createdOn: string;
  createdBy: string;
  labelId: string;
  pinLocation?: Position;
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
  updatedAt?: string | null;
  updatedBy?: string | null;
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
  updatedAt: string | null;
  updatedBy: string | null;
};

export type CommentTag = {
  commentId: string;
  companyId: string;
  createdOn: string;
  id: string;
  userId: string;
};

export type Position = {
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
  updatedAt?: string | null;
  updatedBy?: string | null;
  commentBoxId?: string | null;
};

// Separate type for updating comments
export type UpdateComment = Partial<InsertComment> & { id: string };
