export const formatCommentTime = (createdOn: string): string => {
  const currentTime = new Date().getTime();
  const commentTime = new Date(createdOn).getTime();
  const timeDiff = currentTime - commentTime;

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "Just now";
  } else if (minutes < 60) {
    return `${minutes} min`;
  } else if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"}`;
  } else {
    return `${days} day${days === 1 ? "" : "s"}`;
  }
};

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};
