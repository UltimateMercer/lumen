export const NexusFormatDate = (date: string) => {
  const dot = "·";
  const formattedDate = date.replace(/-/g, dot);
  return formattedDate;
};
