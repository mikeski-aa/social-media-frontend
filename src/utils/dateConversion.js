function dateConversion(inputDate) {
  // if post is within 24h say hours
  // if post is more than 24h say yesterday
  // otherwise say Date + Month + time

  const test = new Date(inputDate);
  const now = new Date();
  const hours = Math.round(((Math.abs(test - now) / 36e5) * 100) / 100);
  const minutes = Math.round(((Math.abs(test - now) / 6e4) * 100) / 100);

  if (minutes < 1) {
    return `Less than 1 minute ago`;
  } else if (minutes > 1 && minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 2 && hours >= 1) {
    return `${hours} hour ago`;
  } else if (hours <= 24 && hours >= 2) {
    return `${hours} hours ago`;
  } else if (hours > 24 && hours < 48) {
    return `Yesterday`;
  } else if (hours >= 48) {
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
  } else {
    console.log("Logging dates");
    console.log(inputDate);
    console.log(hours);
    console.log(minutes);
    console.log("//////////");
    return "error";
  }
}

export default dateConversion;
