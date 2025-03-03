import React, { useCallback } from "react";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import { Comment, CommentReply } from "../../../../types";
import {
  formatCommentTime,
  getInitials,
} from "../../../../utils/shared/Comments";

type CommentProps = {
  comments: Comment;
  replies: CommentReply[];
  commentServices: any;
  user: any;
  onDeleteReply: (replyId: string) => void;
};

const CommentCard: React.FC<{
  commentItem: Comment | CommentReply;
  isReply?: boolean;
  commentServices: any;
  user: any;
  onDelete: (id: string) => void;
}> = ({ commentItem, isReply, commentServices, user, onDelete }) => {
  const handleDeleteComment = useCallback(async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await commentServices.deleteComment(commentItem.id, user.id);
        onDelete(commentItem.id);
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  }, [commentItem.id, user.id, commentServices, onDelete]);

  const menu = (
    <Menu>
      <Menu.Item key="delete" onClick={handleDeleteComment}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={`comment-card ${isReply ? "mt-2 py-5" : "mb-5"} px-3`}>
      <div className="top-profile flex items-center justify-between w-full mb-5">
        <div className="profile-info flex items-center">
          <span
            className={`bg-${
              isReply ? "black" : "red-800"
            } w-8 h-8 flex text-[10px] justify-center items-center text-white rounded-full`}
          >
            {getInitials(user.fullName || "X")}
          </span>
          <span className="profile-name mx-2 text-sm">{user.firstName}</span>
          <span className="comments-time text-gray-400 text-sm">
            {formatCommentTime(commentItem.createdOn)}
          </span>
        </div>
        <div className="action-item">
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button className="border-none" icon={<MoreOutlined />} />
          </Dropdown>
        </div>
      </div>
      <div className="profile-comments">
        <p className="break-all text-sm">{commentItem.content}</p>
      </div>
    </div>
  );
};

const CommentProfileLayout: React.FC<CommentProps> = ({
  comments,
  replies,
  commentServices,
  user,
  onDeleteReply,
}) => {
  const handleDeleteComment = useCallback(() => {
    // You might want to update the parent component's state here
  }, []);

  const handleDeleteReply = useCallback(
    (id: string) => {
      onDeleteReply(id);
    },
    [onDeleteReply],
  );

  return (
    <React.Fragment>
      <CommentCard
        commentServices={commentServices}
        commentItem={comments}
        user={user}
        onDelete={handleDeleteComment}
      />
      {replies &&
        replies
          .filter((reply) => reply.commentId === comments.id)
          .map((reply) => (
            <CommentCard
              key={reply.id}
              commentServices={commentServices}
              commentItem={reply}
              user={user}
              isReply={true}
              onDelete={handleDeleteReply}
            />
          ))}
    </React.Fragment>
  );
};

export default CommentProfileLayout;
