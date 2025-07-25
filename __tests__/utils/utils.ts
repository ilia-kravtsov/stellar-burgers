export const stripId = (item: any) => {
  const copy = { ...item };
  delete copy.id;
  return copy;
};
