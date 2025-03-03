export const sanitize = (input: Record<string, any>) => {
  const output = { ...input };
  Object.keys(output).forEach((key) => {
    if (output[key] === undefined && key !== "id") output[key] = null;
  });
  return output;
};

export const removeUndefined = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  )
}