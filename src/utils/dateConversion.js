function dateConversion(inputDate) {
  // if post is within 24h say hours
  // if post is more than 24h say yesterday
  // otherwise say Date + Month + time

  const test = new Date(inputDate);
  const now = new Date();
  const hours = Math.round(((Math.abs(test - now) / 36e5) * 100) / 100);

  if (hours < 24) {
    return `${hours} hours ago`;
  } else if (hours > 24 && hours < 48) {
    return `Yesterday`;
  } else if (hours > 48) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const formattedDate = test.toLocaleDateString("en-US", options);

    return `${formattedDate}`;
  }
}

export default dateConversion;
