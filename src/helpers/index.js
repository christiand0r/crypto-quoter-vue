export const generateID = () => {
  return Math.random().toString(32).substring(2) + Date.now().toString(32);
};

export const parseStampToLocaleDate = (timestamp) => {
  const date = new Date(timestamp);

  const dateOptions = {
    day: "numeric",
    year: "numeric",
    month: "long",
  };

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  // Obten la fecha y la hora formateadas
  const formattedDate = date.toLocaleDateString(undefined, dateOptions);
  const formattedTime = date.toLocaleTimeString(undefined, timeOptions);

  return `${formattedDate} - ${formattedTime}`;
};