const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;

/**
 * Remove trailing slash from the input string.
 * @param {string} input - The input string.
 * @param {boolean} [respectQueryAndFragment] - Flag to respect query and fragment in the input.
 * @returns {string} - The input string without trailing slash.
 */
export function withoutTrailingSlash(
  input = "",
  respectQueryAndFragment?: boolean
): string {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input.slice(0, -1) : input || "/";
  }

  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }

  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");

  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }

  const [basePath, ...queryParts] = path.split("?");
  const cleanPath = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;

  return `${cleanPath || "/"}${
    queryParts.length > 0 ? `?${queryParts.join("?")}` : ""
  }${fragment}`;
}

/**
 * Check if the input string has a trailing slash.
 * @param {string} input - The input string.
 * @param {boolean} [respectQueryAndFragment] - Flag to respect query and fragment in the input.
 * @returns {boolean} - True if the input string has a trailing slash, otherwise false.
 */
export function hasTrailingSlash(
  input = "",
  respectQueryAndFragment?: boolean
): boolean {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
