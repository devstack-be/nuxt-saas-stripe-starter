/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/", "/pricing", "/docs"];

/**
 * An array of routes that are used for authentication (or only accessible to guests).
 * These routes will redirect logged-in users to /dashboard.
 * @type {string[]}
 */
export const guestOnlyRoutes: string[] = [];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path for a user who is logged in.
 * @type {string}
 */
export const DEFAULT_LOGGED_IN_REDIRECT = "/dashboard";
