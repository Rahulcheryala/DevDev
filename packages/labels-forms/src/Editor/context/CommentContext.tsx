import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import { CommentReply, CommentTag, UpdateComment, Comment } from "../types";

export type CommentCount = {
  id: string;
  replyCount: number;
};

export type CommentsContextType = {
  comments: Comment[];
  getComments: (labelId: string) => Promise<void>;
  addComment: (newComment: any) => void;
  addReply: (newReply: CommentReply) => void;
  updateComment: (
    commentId: string,
    updatedComment: UpdateComment,
  ) => Promise<void>;
  replies: CommentReply[];
  getReplies: (commentId: string) => Promise<void>;
  createReply: (newReply: CommentReply) => Promise<void>;
  tags: CommentTag[];
  getTags: (commentId: string) => Promise<void>;
  createTag: (newTag: CommentTag) => Promise<void>;
  getLabelComments: (labelId: string) => Promise<void>;
  replyCountMap: Record<string, number>; // Added local reply count map
  labelId: string;
  setLabelId: React.Dispatch<React.SetStateAction<string>>;
};

const CommentsContext = createContext<CommentsContextType | undefined>(
  undefined,
);

export const useComments = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error("useComments must be used within a CommentsProvider");
  }
  return context;
};

export const CommentsProvider = ({
  children,
  labelComments,
}: {
  children: ReactNode;
  labelComments: any;
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replies, setReplies] = useState<CommentReply[]>([]);
  const [tags, setTags] = useState<CommentTag[]>([]);
  const [labelId, setLabelId] = useState("");
  const [replyCountMap, setReplyCountMap] = useState<Record<string, number>>(
    {},
  ); // State for reply count per comment

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);
    const extractedId =
      segments.length > 0 ? segments[segments.length - 1] : "";
    setLabelId(extractedId);
  }, []);

  const addComment = useCallback((newComment: Comment) => {
    setComments((prevComments) => [...prevComments, newComment]);
    setReplyCountMap((prevCountMap) => ({
      ...prevCountMap,
      [newComment?.id]: 0, // Initialize reply count for new comment
    }));
  }, []);

  const addReply = useCallback((newReply: CommentReply) => {
    setReplies((prevReplies) => [...prevReplies, newReply]);
    setReplyCountMap((prevCountMap) => {
      const currentCount = prevCountMap[newReply?.commentId] || 0;
      return {
        ...prevCountMap,
        [newReply?.commentId]: currentCount + 1, // Increment reply count for specific comment
      };
    });
  }, []);

  const getComments = useCallback(
    async (labelId: string) => {
      try {
        const data = await labelComments.getComments(labelId);
        setComments(data);

        // Initialize reply counts for fetched comments
        const initialReplyCountMap: Record<string, number> = {};

        // For each comment, fetch the replies and count them
        for (const comment of data) {
          const replies = await labelComments.getCommentReplies(comment.id);
          initialReplyCountMap[comment.id] = replies.length;
        }

        setReplyCountMap(initialReplyCountMap);
      } catch (error) {
        console.error("Error fetching label comments:", error);
      }
    },
    [labelComments],
  );

  const getReplies = useCallback(
    async (commentId: string) => {
      try {
        const data = await labelComments.getCommentReplies(commentId);
        setReplies((prevReplies) => [...prevReplies, ...data]);

        // Update the reply count map using functional updates
        setReplyCountMap((prevCountMap) => ({
          ...prevCountMap,
          [commentId]: (prevCountMap[commentId] || 0) + data.length, // Update reply count
        }));
      } catch (error) {
        toast.error("Failed to fetch replies");
      }
    },
    [labelComments],
  );

  const getLabelComments = useCallback(
    async (labelId: string) => {
      try {
        const data = await labelComments.getLabelComments(labelId);
        setComments(data);
      } catch (error) {
        toast.error("Failed to fetch label comments");
      }
    },
    [labelComments],
  );

  const updateComment = useCallback(
    async (commentId: string, updatedComment: UpdateComment) => {
      try {
        const { data, error } = await labelComments.updateComment(
          commentId,
          updatedComment,
        );
        if (error) {
          throw error;
        }
        setComments((prev) =>
          prev.map((comment) => (comment.id === commentId ? data : comment)),
        );
      } catch (error) {
        toast.error("Failed to update comment");
      }
    },
    [labelComments],
  );

  const createReply = useCallback(
    async (newReply: CommentReply) => {
      try {
        const { data, error } =
          await labelComments.createCommentReply(newReply);
        if (error) {
          throw error;
        }
        setReplies((prev) => [...prev, data]);
      } catch (error) {
        toast.error("Failed to create reply");
      }
    },
    [labelComments],
  );

  const getTags = useCallback(
    async (commentId: string) => {
      try {
        const data = await labelComments.getCommentTags(commentId);
        setTags(data);
      } catch (error) {
        toast.error("Failed to fetch tags");
      }
    },
    [labelComments],
  );

  const createTag = useCallback(
    async (newTag: CommentTag) => {
      try {
        const { data, error } = await labelComments.createCommentTag(newTag);
        if (error) {
          throw error;
        }
        setTags((prev) => [...prev, data]);
      } catch (error) {
        toast.error("Failed to create tag");
      }
    },
    [labelComments],
  );

  return (
    <CommentsContext.Provider
      value={{
        comments,
        getComments,
        addComment,
        addReply,
        updateComment,
        replies,
        getReplies,
        createReply,
        tags,
        getTags,
        createTag,
        getLabelComments,
        replyCountMap,
        labelId,
        setLabelId,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
