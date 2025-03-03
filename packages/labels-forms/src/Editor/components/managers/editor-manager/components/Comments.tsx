import React, { useCallback, useEffect, useState } from "react";
import {
  CommentsProvider,
  useComments,
} from "../../../../context/CommentContext";
import InputLayout from "../../../drawers/comments/components/InputLayout";
import ExistingCommentLayout from "../../../drawers/comments/components/ExistingComment";
import { CommentBox } from "../../../../types";
import { toolBarItems } from "../../../../consts";
import { useEditor } from "../../../../context/EditorContext";

const Comments = ({
  labelComments,
  labelId,
  companyID,
  userDetails,
  commentBoxes,
  commentBoxPosition,
  setCommentBoxes,
}: {
  labelComments: any;
  labelId: string;
  companyID: string;
  userDetails: any;
  commentBoxes: CommentBox[];
  commentBoxPosition: { x: number; y: number } | null;
  setCommentBoxPosition: (position: { x: number; y: number } | null) => void;
  setCommentBoxes: React.Dispatch<React.SetStateAction<CommentBox[]>>;
}) => {
  const { selectedTool } = useEditor();
  const { addComment, getComments, comments } = useComments();
  const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedTool !== toolBarItems.COMMENTS) {
      setCommentBoxes((prevBoxes) =>
        prevBoxes.filter((box) => box.isSubmitted),
      );
    }
  }, [selectedTool]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setCommentBoxes((prevBoxes) =>
        prevBoxes.filter((box) => box.isSubmitted),
      );
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (labelId && comments) {
      const data = getComments(labelId);
      addComment(data);
      // Set up real-time updates
      const updateInterval = setInterval(() => {
        getComments(labelId);
      }, 30000); // Poll every 30 seconds

      return () => clearInterval(updateInterval);
    }
  }, [getComments, labelId]);

  const handleCommentSubmit = (id: string) => {
    setCommentBoxes((prevBoxes) => {
      const updatedBoxes = prevBoxes.map((box) =>
        box.id === id ? { ...box, isSubmitted: true } : box,
      );
      const data = getComments(labelId);
      addComment(data);
      return updatedBoxes;
    });
  };

  return (
    <CommentsProvider labelComments={labelComments}>
      <div style={{ position: "relative" }}>
        {labelComments &&
          commentBoxPosition &&
          selectedTool === toolBarItems.COMMENTS &&
          commentBoxes.map((box) => (
            <div key={box.id}>
              <InputLayout
                commentBoxId={box.id}
                position={commentBoxPosition}
                onSubmit={() => handleCommentSubmit(box.id)}
                labelId={labelId}
                companyId={companyID || ""}
                user={userDetails}
                // isVisible={true}
                commentServices={labelComments}
              />
            </div>
          ))}
        {labelComments &&
          comments
            .filter((item) => item?.labelId === labelId && item?.commentBoxId)
            .map((comment) =>
              comment ? (
                <div
                  key={comment.id}
                  onMouseEnter={() => setHoveredCommentId(comment.id)}
                  onMouseLeave={() => setHoveredCommentId(null)}
                  className="comment-box"
                  style={{
                    width: "270px",
                    position: "absolute",
                    top: comment.pinLocation?.y,
                    left: comment.pinLocation?.x,
                    zIndex: hoveredCommentId === comment.id ? 99999 : 99,
                  }}
                >
                  <ExistingCommentLayout
                    commentServices={labelComments}
                    comments={comment}
                  />
                </div>
              ) : null,
            )}
      </div>
    </CommentsProvider>
  );
};

export default Comments;
