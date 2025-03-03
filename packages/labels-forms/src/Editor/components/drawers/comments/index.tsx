import React, { useCallback, useEffect, useState, useMemo } from "react";
import { CommentsProvider, useComments } from "../../../context/CommentContext";
import { Input } from "antd";
import { SearchIcon, SortingIcon, InputRemove } from "../icons";
import DropdownFilter, { FilterOption } from "./components/DropdownFilter";
import CommentsTray from "./components/CommentsTray";

type CommentsProps = {
  labelComments: any;
  user: any;
  labelId: string;
};

type CommentsContentProps = {
  CommentServices: any;
  user: any;
  labelId: string;
};

const CommentsDrawerContent: React.FC<CommentsContentProps> = ({
  CommentServices,
  user,
  labelId,
}) => {
  const { comments, getComments, addComment } = useComments();
  const [inputValue, setInputValue] = useState<string>("");
  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  const [inputKey, setInputKey] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<FilterOption | null>(null);

  useEffect(() => {
    getComments(labelId);
    const data = CommentServices?.getResolvedComments(labelId);
    addComment(data);
    // Set up real-time updates
    const updateInterval = setInterval(() => {
      getComments(labelId);
      CommentServices?.getResolvedComments(labelId);
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(updateInterval);
  }, [getComments, labelId, CommentServices]);

  const clearInput = useCallback(() => {
    setInputValue("");
    setInputKey((prevKey) => prevKey + 1);
  }, []);

  const filterComments = useCallback(
    (searchTerm: string, filter: FilterOption | null) => {
      let result = [...comments]; // Clone comments to avoid mutating state

      if (searchTerm.trim()) {
        result = result.filter((comment) =>
          comment.content.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }

      switch (filter) {
        case "date":
          result.sort(
            (a, b) =>
              new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime(),
          );
          break;
        case "resolved":
          result = result.filter((comment) => comment.resolved === true);
          break;
        case "currentPage":
          result = result.filter((comment) => comment.labelId === labelId);
          break;
      }

      return result;
    },
    [comments, labelId],
  );

  const filteredComments = useMemo(
    () => filterComments(inputValue, activeFilter),
    [filterComments, inputValue, activeFilter],
  );

  const handleFilterChange = (filter: FilterOption) => {
    setActiveFilter(filter);
  };

  // const handleCommentAdd = useCallback(
  //   (newComment: any) => {
  //     addComment(newComment);
  //   },
  //   [addComment]
  // );

  // const handleCommentUpdate = useCallback(
  //   (commentId: string, updatedComment: any) => {
  //     updateComment(commentId, updatedComment);
  //   },
  //   [updateComment]
  // );

  return (
    <section className="comments-drawer p-[1em] overflow-x-hidden overflow-y-auto custom-scrollbar h-full ">
      <div className="search-top">
        <Input
          key={inputKey}
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsInputActive(true)}
          onBlur={() => setIsInputActive(false)}
          prefix={
            <div className="text-2xl text-default-400 pointer-events-none flex-shrink-0">
              <SearchIcon />
            </div>
          }
          suffix={
            <div className="text-2xl text-default-400 flex-shrink-0 flex items-center gap-2">
              <DropdownFilter onFilterChange={handleFilterChange} />
              <SortingIcon />
              {isInputActive && inputValue && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    clearInput();
                  }}
                  type="button"
                >
                  <InputRemove />
                </button>
              )}
            </div>
          }
          className="h-12 px-2 py-0 rounded-[10px] border border-[#E9E9EE] bg-white"
        />
      </div>
      <div className="comments-card-container text-center mt-[1em] mb-5">
        <span className="text-[#19110B] text-center text-sm font-normal leading-5">
          {filteredComments.length > 0 && (
            <CommentsTray
              commentsTrayData={filteredComments}
              user={user}
              commentServices={CommentServices}
            />
          )}
        </span>
      </div>
    </section>
  );
};

const CommentsDrawer: React.FC<CommentsProps> = ({
  labelComments,
  user,
  labelId,
}) => {
  return (
    <CommentsProvider labelComments={labelComments}>
      <CommentsDrawerContent
        CommentServices={labelComments}
        user={user}
        labelId={labelId}
      />
    </CommentsProvider>
  );
};

export default CommentsDrawer;
