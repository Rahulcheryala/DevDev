import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Comment } from "../../../../types";
import Draggable from "react-draggable";
import { ProfileIcon } from "./CommentProfile";
import { ExpandedPreview } from "./CommentPreview";
import CommentReplyLayout from "./ReplyLayout";

type CommentInputLayoutProps = {
  commentServices: any;
  comments: Comment;
};

const ExistingCommentLayout: React.FC<CommentInputLayoutProps> = ({
  commentServices,
  comments,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsExpanded(false);
      setIsHovered(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleExpandClick = useCallback(() => {
    setIsExpanded((prev) => !prev);
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isExpanded) {
      setIsHovered(true);
    }
  }, [isExpanded]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const displayContent = useMemo(() => {
    if (isExpanded) {
      return (
        <CommentReplyLayout
          user={comments.createdBy}
          handleExpandClick={handleExpandClick}
          submittedComment={comments}
          commentServices={commentServices}
        />
      );
    }
    if (isHovered) {
      return (
        <div className="w-[270px]">
          <ExpandedPreview
            onClick={handleExpandClick}
            submittedComment={comments}
            user={comments.createdBy}
          />
        </div>
      );
    }
    return <ProfileIcon isIcon={true} user={comments.createdBy} />;
  }, [isExpanded, isHovered, comments, commentServices, handleExpandClick]);

  return (
    <div ref={inputRef}>
      <Draggable>
        <section
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {displayContent}
        </section>
      </Draggable>
    </div>
  );
};

export default React.memo(ExistingCommentLayout);
