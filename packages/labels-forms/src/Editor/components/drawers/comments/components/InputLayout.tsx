import React, { useState, useRef, useEffect, useCallback } from "react";
import { Input, Button } from "antd";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import {
  CommentInputIcon,
  DarkExportIcons,
  EmojiIcon,
  ExportIcons,
  GalleryIcon,
  MentionIcon,
} from "../../icons";
import { useComments } from "../../../../context/CommentContext";
import { Comment } from "../../../../types";
import { v4 as uuidv4 } from "uuid";
import { $EmojiPicker, $ExpandComments } from "../../../../stores/stores";
import { useStoreStateValue } from "@scena/react-store";
import { toast } from "react-toastify";

const { TextArea } = Input;

type Position = {
  x: number;
  y: number;
};

type CommentInputLayoutProps = {
  commentBoxId: string;
  position: Position;
  labelId: string;
  companyId: string;
  user: any;
  onSubmit: () => void;
  commentServices: any;
  onReplySubmit?: (reply: string) => void;
};

const CommentInputLayout: React.FC<CommentInputLayoutProps> = ({
  position,
  labelId,
  companyId,
  user,
  onSubmit,
  commentBoxId,
  commentServices,
}) => {
  const [isExpanded, setIsExpanded] = useState(
    useStoreStateValue($ExpandComments),
  );
  const { addComment, getComments } = useComments();
  const [commentView, setCommentView] = useState<string>("");
  const [showInput, setShowInput] = useState(true);
  const [showPicker, setShowPicker] = useState(
    useStoreStateValue($EmojiPicker),
  );
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isExpanded && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCommentSubmit = useCallback(async () => {
    if (!commentView.trim()) {
      return;
    }

    const newComment: Comment = {
      companyId,
      content: commentView,
      createdOn: new Date().toISOString(),
      createdBy: user.id,
      labelId,
      pinLocation: position,
      deletedOn: null,
      deletedBy: null,
      id: uuidv4(),
      pinned: null,
      resolved: null,
      modifiedOn: null,
      modifiedBy: null,
      commentBoxId,
    };

    try {
      await commentServices.createComment(newComment);
      if (newComment) {
        addComment(newComment);
        setIsExpanded(false);
        setShowInput(false);
        setCommentView(""); // Clear the input
        onSubmit();
      } else {
        toast.error("Comment creation failed or returned null");
      }
    } catch (error) {
      console.error("Error in handleCommentSubmit:", error);
    }
  }, [
    commentView,
    companyId,
    user,
    labelId,
    position,
    addComment,
    commentBoxId,
    onSubmit,
    commentServices,
  ]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getComments(labelId);
        addComment(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [user, companyId, labelId, commentBoxId, addComment, getComments]);

  const handleEmojiClick = useCallback((emojiData: EmojiClickData) => {
    setCommentView((prev) => prev + emojiData.emoji);
    setShowPicker((prev) => !prev);
  }, []);

  const renderInputContent = () =>
    !isExpanded ? (
      <Input
        placeholder="Add a comment"
        value={commentView}
        onChange={(e) => setCommentView(e.target.value)}
        onFocus={() => setIsExpanded(true)}
        suffix={<ExportIcons />}
        style={{ height: "40px", borderRadius: "10px", padding: "0 16px" }}
      />
    ) : (
      <>
        <TextArea
          placeholder="Add a comment"
          ref={textAreaRef}
          value={commentView}
          onChange={(e) => setCommentView(e.target.value)}
          autoSize={{ minRows: 3, maxRows: 10 }}
          style={{
            resize: "none",
            fontSize: "14px",
            padding: "8px 4px",
            border: "none",
            boxShadow: "none",
          }}
        />
        <div className="flex justify-between items-center px-4 py-2 border-t border-[#E9E9EE] bg-white">
          <div className="flex items-center gap-3">
            <Button
              size="small"
              type="text"
              icon={<EmojiIcon />}
              ref={emojiButtonRef}
              onClick={() => setShowPicker((prev) => !prev)}
            />
            <Button size="small" type="text" icon={<MentionIcon />} />
            <Button
              size="small"
              type="text"
              icon={<GalleryIcon />}
              className="relative"
            />
            {showPicker && (
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                style={{
                  position: "absolute",
                  zIndex: 1001,
                  top: "80%",
                  left: 0,
                }}
              />
            )}
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleCommentSubmit}
          >
            <DarkExportIcons />
          </div>
        </div>
      </>
    );

  if (!showInput) {
    return null;
  }

  return (
    <section>
      <div
        className="flex w-full flex-wrap md:flex-nowrap mb-6 
        md:mb-0 gap-4 transition-all flex duration-300 ease-in-out"
        ref={inputRef}
      >
        <div
          className={`w-full transition-all flex gap-1 duration-300 ease-in-out ${
            isExpanded ? "h-[200px]" : "h-12"
          }`}
        >
          <CommentInputIcon />
          <div
            className="h-fit min-w-[310px] max-w-[310px] w-full transition-all 
          duration-300 ease-in-out flex flex-col rounded-[10px] 
          border border-[#E9E9EE] bg-white shadow-lg overflow-hidden"
          >
            {renderInputContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(CommentInputLayout);
