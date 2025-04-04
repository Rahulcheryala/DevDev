import React, { useState, useEffect, useCallback } from "react";
import { Comment } from "../../../../types";
import { MoreOutlined } from "@ant-design/icons";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { GoCheckCircleFill } from "react-icons/go";
import { SportsIcons } from "../../icons";
import {
  formatCommentTime,
  getInitials,
} from "../../../../utils/shared/Comments";
import { Dropdown, Menu, Button } from "antd";
import { useComments } from "../../../../context/CommentContext";

type CommentsTrayProps = {
  commentsTrayData: Comment[];
  user: any;
  commentServices: any;
};

const CommentsTray: React.FC<CommentsTrayProps> = ({
  commentsTrayData,
  user,
  commentServices,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [markedComments, setMarkedComments] = useState<Set<string>>(new Set());
  const [isMarked, setIsMarked] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { replyCountMap } = useComments();

  useEffect(() => {
    if (commentsTrayData && user) {
      const sortedComments = [...commentsTrayData].sort(
        (a, b) =>
          new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime(),
      );
      setComments(sortedComments);
      setIsLoading(false);
    }
  }, [commentsTrayData, user]);

  const handleDeleteComment = useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure you want to delete this comment?")) {
        try {
          await commentServices.deleteComment(id, user.id);
          // Remove the comment from the local state
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== id),
          );
          setIsDeleted(true);
        } catch (error) {
          console.error("Error deleting comment:", error);
        }
      }
    },
    [user, commentServices],
  );

  const handleResolvedComment = useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure you want to resolve this comment?")) {
        try {
          await commentServices.resolvedComment(id, true);
          // Update the comment state to mark it as resolved
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment.id === id ? { ...comment, resolved: true } : comment,
            ),
          );
          setMarkedComments((prev) => new Set(prev).add(id));
        } catch (error) {
          console.error("Error resolving comment:", error);
        }
      }
    },
    [commentServices],
  );

  const toggleMark = useCallback(() => setIsMarked((prev) => !prev), []);

  const dropAction = useCallback(
    (key: React.Key, commentId: string) => {
      switch (key) {
        case "new":
          setIsMarked(false);
          break;
        case "delete":
          if (commentId) {
            handleDeleteComment(commentId);
          } else {
            console.error("Cannot delete comment: commentId is undefined");
          }
          break;
      }
    },
    [handleDeleteComment],
  );

  if (isLoading || !comments || !user || isDeleted || isMarked) {
    return null;
  }

  return (
    <React.Fragment>
      {comments.length > 0 && (
        <div className="main-tray divide-y">
          {comments.map((commentsData, key) => {
            const commentContent = commentsData?.content || "No content";
            const commentTime = commentsData?.createdOn
              ? formatCommentTime(commentsData.createdOn)
              : "No time available";
            const isMarked = markedComments.has(commentsData.id);

            const menu = (
              <Menu onClick={({ key }) => dropAction(key, commentsData.id)}>
                <Menu.Item key="new">Mark as unread</Menu.Item>
                <Menu.Item key="copy">Copy link</Menu.Item>
                <Menu.Item key="delete">Delete thread</Menu.Item>
              </Menu>
            );

            return (
              <div
                key={key}
                className="tray-container py-5 flex flex-col items-start"
              >
                <div className="tray-header w-full flex mb-3 justify-between items-center">
                  <span
                    className={`bg-red-800 w-8 h-8 text-[10px] flex justify-center items-center text-white rounded-full`}
                  >
                    {getInitials(user?.fullName || "X")}
                  </span>
                  <div className="right-action">
                    <div className="flex items-center gap-3">
                      <Dropdown overlay={menu} trigger={["click"]}>
                        <Button
                          className="border-none"
                          type="text"
                          icon={<MoreOutlined />}
                        />
                      </Dropdown>
                      <div onClick={toggleMark}>
                        {isMarked ? (
                          <GoCheckCircleFill
                            className="w-[23px] h-[23px]"
                            color="green"
                          />
                        ) : (
                          <IoIosCheckmarkCircleOutline
                            className="w-[23px] h-[23px] cursor-pointer"
                            onClick={() =>
                              handleResolvedComment(commentsData.id)
                            }
                          />
                        )}
                      </div>
                      <SportsIcons />
                    </div>
                  </div>
                </div>
                <div className="profile-name-container flex">
                  <span className="profile-name mr-2 text-sm">
                    {user?.firstName || "Unknown"}
                  </span>
                  <span className="comments-time text-gray-400 text-sm">
                    {commentTime}
                  </span>
                </div>
                <p className="break-all text-sm my-3">{commentContent}</p>
                <span className="text-blue-500">
                  {replyCountMap[commentsData?.id] || 0} Reply
                </span>
              </div>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

export default CommentsTray;
