import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const middleware = (request: NextRequest, event: Event) => {
	if (request.nextUrl.pathname.startsWith("/")) {
		// return NextResponse.redirect(new URL("/login", request.url))
	}

	// return NextResponse.redirect(request.nextUrl)
	return NextResponse.next()
}

export default middleware
