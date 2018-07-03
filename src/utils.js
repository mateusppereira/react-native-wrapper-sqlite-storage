export function generateId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1);
  const day = now.getDate();
  const hour = now.getUTCHours(0);
  const minute = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();
  return `${day}${month}${year}${hour}${minute}${seconds}${milliseconds}`;
}
