import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware() {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to auth pages without token
        if (req.nextUrl.pathname.startsWith("/auth/")) {
          return true
        }
        
        // Require authentication for checkout
        if (req.nextUrl.pathname.startsWith("/checkout")) {
          return !!token
        }
        
        // Allow all other pages
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    "/checkout/:path*",
    "/auth/:path*"
  ]
}
