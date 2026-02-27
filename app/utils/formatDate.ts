export const getTimeShort = (dateString: string) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
  }).format(date);
};



/**
 * Returns the weekday name from a date string.
 * @param dateString - The date string to format.
 * @param short - Whether to return a short or long weekday name. Default is false.
 * @returns The formatted weekday name.
 */
export const getDay = (dateString: string, short: boolean = false) : string => {
  const date = new Date(dateString);
  
  return new Intl.DateTimeFormat("en-US", {
    weekday: short ? "short" : "long",
  }).format(date);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};
