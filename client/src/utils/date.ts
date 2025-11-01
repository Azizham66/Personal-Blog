export function getFormattedDate(includeTime = false) {
  const date = new Date();
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  if (!includeTime) return `${d}-${m}-${y}`;

  const h = date.getHours();
  const min = date.getMinutes().toString().padStart(2, "0");
  return `${d}-${m}-${y} - ${h}:${min}`;
}