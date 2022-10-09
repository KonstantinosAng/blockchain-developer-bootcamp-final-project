import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	// Store the response so we can modify its headers
	const response = NextResponse.next()

	response.headers.set("Cache-Control", "s-maxage=1, stale-while-revalidate=59")

	if (request.nextUrl.pathname.startsWith("/")) {
		// return NextResponse.redirect(new URL("/login", request.url))
	}

	return response
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: "/:path*",
}
