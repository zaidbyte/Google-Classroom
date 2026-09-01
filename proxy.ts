import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isWhitelisted } from "@/lib/whitelist";

export async function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  let pendingCookies: { name: string; value: string; options: CookieOptions }[] = [];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          pendingCookies = cookiesToSet;
        },
      },
    },
  );

  function finish(response: NextResponse) {
    pendingCookies.forEach(({ name, value, options }) =>
      response.cookies.set(name, value, options),
    );
    return response;
  }

  // Single auth round trip per request: also silently refreshes the
  // session cookie when the access token has expired.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return finish(NextResponse.next({ request: { headers: requestHeaders } }));
  }

  if (!isWhitelisted(user.email)) {
    return finish(NextResponse.redirect("https://classroom.google.com"));
  }

  requestHeaders.set("x-user-email", user.email);
  requestHeaders.set(
    "x-user-name",
    user.user_metadata?.full_name ?? user.user_metadata?.name ?? "",
  );
  requestHeaders.set(
    "x-user-avatar",
    user.user_metadata?.avatar_url ?? user.user_metadata?.picture ?? "",
  );

  return finish(NextResponse.next({ request: { headers: requestHeaders } }));
}

export const config = {
  matcher: ["/"],
};
