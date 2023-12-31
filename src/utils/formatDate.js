export const formatDate = (dateString) => {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", options);
};
