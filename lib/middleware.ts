import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedPaths = ['/about', '/profile', '/home']

export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next()
  // Create authenticated Supabase Client.
  const supabase = createClient('https://hbquufifeyxhbytyjvmu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhicXV1ZmlmZXl4aGJ5dHlqdm11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIyMzM0MTMsImV4cCI6MTk5NzgwOTQxM30.lXbLIukAU-sFhMdVvBtkNrX41I16VM6WZPxyfFFXdrk', {
   
  })
  // Check if we have a session
  const { data:user } = await supabase.auth.getUser()

  // Check if path is protected
  if (protectedPaths.includes(req.nextUrl.pathname)) {
    // Check auth condition
    if (user) {
      // Authentication successful, forward request to protected route.
      return res
    }

    // Auth condition not met, redirect to home page.
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/'
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Path is not protected, forward request to unprotected route.
  return res
}

export const config = {
  // Match all paths
  matcher: '/:path*',
}