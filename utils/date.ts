/**
 * Formats a date to a string with the format "Month Day, Year".
 * @param {string | number | Date} input - The input date.
 * @returns {string} - The formatted date string.
 */
export function formatDate(input: string | number | Date): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Formats a date and time to a string with the format "Month Day, Year, Hour:Minute AM/PM".
 * @param {string | number | Date} input - The input date and time.
 * @returns {string} - The formatted date and time string.
 */
export function formatDateTime(input: string | number | Date): string {
  const date = new Date(input);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}
