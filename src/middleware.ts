import { NextURL } from 'next/dist/server/web/next-url';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
	matcher: ['/login', '/signup', '/dashboard/:path*'],
	name: 'middleware',
};

export function middleware(req: NextRequest) {
	const hasToken = req.cookies.has('bc_token');
	const url = req.nextUrl.clone(); // Clone the URL to modify it

	return NextResponse.next();

	const redirectResponse = (url: string | NextURL) => {
		const response = NextResponse.redirect(url);
		response.headers.set('x-middleware-cache', 'no-cache'); // ! FIX: Disable caching
		return response;
	};

	// Redirect users to the home page if the app is in testing mode and they are not on the home page
	if (process.env.NEXT_PUBLIC_TESTING === 'true' && url.pathname !== '/') {
		url.pathname = '/';
		return redirectResponse(url);
	}

	// Redirects for users with a token trying to access login, signup, or forgot-password
	if (hasToken && ['/login', '/signup'].includes(url.pathname)) {
		url.pathname = '/dashboard';
		return redirectResponse(url);
	}

	// Redirect users without a token trying to access any dashboard/* path
	if (!hasToken && url.pathname.startsWith('/dashboard')) {
		url.pathname = '/login';
		return redirectResponse(url);
	}

	return NextResponse.next();
}
