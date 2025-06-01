// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/events",
  "/events/(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/login(.*)",
  "/checkout(.*)",
  "/booking-bekraeftelse(.*)",
  "/singleview(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { protect } = await auth();

  if (!isPublicRoute(req)) {
    await protect(); // beskyt ikke-offentlige sider
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // matcher alle routes undtagen statiske filer
    "/(api|trpc)(.*)",        // matcher API og trpc routes
  ],
};

