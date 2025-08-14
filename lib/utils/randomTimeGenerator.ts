export const generateRandomTime = () => {
  const hours = Math.floor(Math.random() * (20 - 8) + 8); // Random hour between 8 AM and 8 PM
  const minutes = ["00", "15", "30", "45"][Math.floor(Math.random() * 4)]; // Random minutes in quarters
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;

  // Get tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return `${hour12}:${minutes} ${ampm} on ${tomorrow.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  )}`;
};
