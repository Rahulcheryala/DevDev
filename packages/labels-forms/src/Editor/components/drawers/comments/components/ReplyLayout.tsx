import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useReducer,
} from "react";
import {
  ExportIcons,
  DarkExportIcons,
  MentionIcon,
  GalleryIcon,
  EmojiIcon,
  SportsIcons,
} from "../../icons";
import { Input, Button, Dropdown, Menu } from "antd";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { RxCross2 } from "react-icons/rx";
import {
  GoCheckCircleFill,
  GoChevronLeft,
  GoChevronRight,
} from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { ProfileIcon } from "./CommentProfile";
import { useComments } from "../../../../context/CommentContext";
import CommentProfileLayout from "./CommentsProfileLayout";
import { Comment, CommentReply } from "../../../../types";

const { TextArea } = Input;

type CommentReplyLayoutProps = {
  submittedComment: Comment;
  handleExpandClick: () => void;
  user: any;
  commentServices: any;
};

const forceUpdateReducer = (x: number) => x + 1;

const CommentReplyLayout: React.FC<CommentReplyLayoutProps> = ({
  submittedComment,
  handleExpandClick,
  user,
  commentServices,
}) => {
  const [isReplyExpanded, setIsReplyExpanded] = useState(false);
  const { addReply } = useComments();
  const [comment, setComment] = useState("");
  const [isMarked, setIsMarked] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [localReplies, setLocalReplies] = useState<CommentReply[]>([]);
  const [, forceUpdate] = useReducer(forceUpdateReducer, 0);

  const inputRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const toggleMark = useCallback(() => setIsMarked((prev) => !prev), []);

  const handleDeleteComment = useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure you want to delete this comment?")) {
        try {
          await commentServices.deleteComment(id, user.id);
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
          setIsMarked(true);
        } catch (error) {
          console.error("Error resolving comment:", error);
        }
      }
    },
    [commentServices],
  );

  const dropAction = useCallback(
    (key: React.Key) => {
      switch (key) {
        case "new":
          setIsMarked(false);
          break;
        case "delete":
          if (submittedComment.id) {
            handleDeleteComment(submittedComment.id);
          } else {
            console.error("Cannot delete comment: commentId is undefined");
          }
          break;
      }
    },
    [handleDeleteComment, submittedComment.id],
  );

  const handleSubmit = useCallback(async () => {
    if (!comment.trim()) return;

    const newReply: CommentReply = {
      commentId: submittedComment.id,
      companyId: submittedComment.companyId,
      content: comment,
      createdOn: new Date().toISOString(),
      createdBy: user?.id,
      deletedOn: null,
      deletedBy: null,
      id: uuidv4(),
      modifiedOn: null,
      modifiedBy: null,
    };
    setLocalReplies((prevReplies) => [...prevReplies, newReply]);

    try {
      await commentServices.createCommentReply(newReply);
      if (newReply) {
        addReply(newReply);

        // Force UI update by toggling the state
        forceUpdate();
      }
    } catch (error) {
      console.error("Error in handleReplySubmit:", error);
    }
    setIsReplyExpanded(false);
    setComment("");
  }, [
    comment,
    submittedComment.id,
    submittedComment.companyId,
    user,
    addReply,
    commentServices,
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsReplyExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchReplies = async () => {
      try {
        const fetchedReplies = await commentServices.getCommentReplies(
          submittedComment.id,
        );
        if (isMounted) {
          setLocalReplies(fetchedReplies);
          forceUpdate();
        }
      } catch (error) {
        console.error("Error fetching replies:", error);
        if (isMounted) {
          forceUpdate();
        }
      }
    };
    fetchReplies();
    return () => {
      isMounted = false;
    };
  }, [submittedComment.id, commentServices]);

  const handleDeleteReply = useCallback((replyId: string) => {
    setLocalReplies((prevReplies) =>
      prevReplies.filter((reply) => reply.id !== replyId),
    );
  }, []);

  useEffect(() => {
    if (isReplyExpanded && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isReplyExpanded]);

  const renderInput = () => {
    const commonProps = {
      placeholder: "Write a reply...",
      value: comment,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => setComment(e.target.value),
    };

    return isReplyExpanded ? (
      <React.Fragment>
        <TextArea
          ref={textAreaRef}
          {...commonProps}
          autoSize={{ minRows: 3, maxRows: 10 }}
          className="resize-none text-sm py-2 px-1 transition-all duration-300 
          ease-in-out focus:outline-none border-none h-auto"
        />
        <div className="flex justify-between items-center px-4 py-2 border-t border-[#E9E9EE] bg-white">
          <div className="flex items-center gap-3">
            {[EmojiIcon, MentionIcon, GalleryIcon].map((Icon, index) => (
              <Button key={index} size="small" type="text" icon={<Icon />} />
            ))}
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleSubmit}
          >
            <DarkExportIcons />
          </div>
        </div>
      </React.Fragment>
    ) : (
      <Input
        {...commonProps}
        suffix={<ExportIcons />}
        onFocus={() => setIsReplyExpanded(true)}
        className="h-10 px-3 text-sm py-0 pl-4 rounded-[10px] border-none bg-white"
      />
    );
  };

  if (isDeleted || isMarked) {
    return null;
  }

  const menu = (
    <Menu onClick={({ key }) => dropAction(key)}>
      <Menu.Item key="new">Mark as unread</Menu.Item>
      <Menu.Item key="copy">Copy link</Menu.Item>
      <Menu.Item key="delete">Delete thread</Menu.Item>
    </Menu>
  );

  return (
    <section className="flex gap-3 items-start">
      <div
        className="profile-icon bg-white w-9 h-9 p-1 rounded-t-[50%] 
        border-2 border-[#991b1b] rounded-r-[50%] rounded-br-[50%] shadow-lg cursor-pointer"
        onClick={handleExpandClick}
      >
        <span className="bg-red-800 w-6 h-6 flex justify-center items-center text-white rounded-full">
          {user?.fullName?.charAt(0).toUpperCase()}
        </span>
      </div>
      <div
        className="bg-white shadow-md py-3 h-fit min-w-[310px]
       max-w-[350px] w-full rounded-md overflow-hidden border"
      >
        <div className="comment-view-header flex justify-between px-2 border-b pb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-3 cursor-pointer">
              <GoChevronLeft className="text-lg w-[23px] h-[23px]" />
              <GoChevronRight className="text-lg w-[23px] h-[23px]" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button
                type="text"
                icon={<HiOutlineDotsHorizontal className="w-[23px] h-[23px]" />}
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
                  onClick={() => handleResolvedComment(submittedComment.id)}
                />
              )}
            </div>
            <SportsIcons />
            <RxCross2
              className="w-[23px] h-[23px] cursor-pointer"
              onClick={handleExpandClick}
            />
          </div>
        </div>
        <div className="comment-view-body py-5 flex flex-col divide-y">
          <CommentProfileLayout
            comments={submittedComment}
            replies={localReplies}
            user={user}
            commentServices={commentServices}
            onDeleteReply={handleDeleteReply}
          />
        </div>
        <div
          className="comment-view-footer px-2 w-full flex items-start gap-2"
          ref={inputRef}
        >
          <ProfileIcon isIcon={false} user={user} />
          <div
            className={`transition-all duration-300 ease-in-out flex flex-col rounded-[10px] 
              border border-[#E9E9EE] w-full bg-white overflow-hidden ${
                isReplyExpanded ? "h-auto" : "h-10"
              }`}
            style={{ maxHeight: isReplyExpanded ? "1000px" : "40px" }}
          >
            {renderInput()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(CommentReplyLayout);
