import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const unprotectedPaths = [
    "/api/auth",
    "/api/webhooks",
    "/api/_content",
    "/api/_mdc",
  ];

  // Check if the route is an API route and not in the list of unprotected paths
  const isProtectedRoute =
    event.path.startsWith("/api") &&
    !unprotectedPaths.some((path) => event.path.startsWith(path));

  if (isProtectedRoute) {
    const session = await getServerSession(event);
    if (!session) {
      throw createError({ statusMessage: "Unauthenticated", statusCode: 403 });
    }
  }
});
