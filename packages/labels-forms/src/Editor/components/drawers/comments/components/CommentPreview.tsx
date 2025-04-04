import React from "react";
import { ProfileIcon } from "./CommentProfile";
import { Comment } from "../../../../types";
import { formatCommentTime } from "../../../../utils/shared/Comments";

type ExpandPreviewProps = {
  onClick: () => void;
  submittedComment: Comment;
  user: any;
};

export const ExpandedPreview: React.FC<ExpandPreviewProps> = ({
  onClick,
  submittedComment,
  user,
}) => {
  return (
    <div
      onClick={onClick}
      className="expanded-preview cursor-pointer bg-white p-2 border rounded-t-[15px] rounded-br-[15px] shadow-lg"
      style={{ width: "100%" }}
    >
      <div className="comment flex gap-2">
        <ProfileIcon isIcon={false} user={user} />
        <div className="flex flex-col">
          <div className="flex  gap-3 pt-2 items-start mb-3">
            <span className="profile-name  text-sm">{user.firstName}</span>
            <span className="comments-time text-gray-400 text-sm">
              {formatCommentTime(submittedComment?.createdOn)}
            </span>
          </div>
          <p className="text-sm">{submittedComment?.content}</p>
        </div>
      </div>
    </div>
  );
};
