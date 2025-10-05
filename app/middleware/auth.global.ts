import {
  DEFAULT_LOGGED_IN_REDIRECT,
  apiAuthPrefix,
  guestOnlyRoutes,
  publicRoutes,
} from "~/routes";

export default defineNuxtRouteMiddleware((to, _from) => {
  const { status: authStatus } = useAuth();
  const isLoggedIn = authStatus.value === "authenticated";
  const isApiAuthRoute = to.path.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.some((route) =>
    route === "/" ? to.path === route : to.path.startsWith(route)
  );
  const isGuestRoute = guestOnlyRoutes.includes(to.path);

  // Vérifier si la route existe
  const routeExists = to.matched.length > 0;

  // Allow access to API authentication routes
  if (isApiAuthRoute) return;

  // Si la route n'existe pas, laisser Nuxt gérer l'erreur 404
  if (!routeExists) return;

  // Redirect logged-in users trying to access guest-only routes
  if (isGuestRoute && isLoggedIn) {
    return navigateTo(DEFAULT_LOGGED_IN_REDIRECT);
  }

  // Redirect to / if user is not authenticated and route is not public
  if (!isLoggedIn && !isPublicRoute) {
    return navigateTo("/");
  }

  // Let Nuxt handle the navigation
});
