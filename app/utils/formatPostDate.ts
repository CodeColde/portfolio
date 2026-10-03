const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const formatPostDate = (date?: string | null) => (date ? dateFormatter.format(new Date(date)) : undefined);

export default formatPostDate;
