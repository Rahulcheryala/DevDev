export const safeReplace = (value: any) => {
    if (!value) return "";
    return typeof value === "string" ? value.replace(/_/g, " ") : value;
  };