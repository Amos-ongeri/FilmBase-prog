//relative time formatter
export const getRelativeTime = (dateString) => {
  const date = new Date(dateString);

  const now = new Date();

  const seconds = Math.floor(
    (date - now) / 1000
  );

  const rtf = new Intl.RelativeTimeFormat(
    "en",
    { numeric: "auto" }
  );

  //in seconds
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const unit in intervals) {
    const value =
      seconds / intervals[unit];

    if (Math.abs(value) >= 1) {
      return rtf.format(
        Math.round(value),
        unit
      );
    }
  }

  return "just now";
};