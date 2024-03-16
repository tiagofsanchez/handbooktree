import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// TODOS
// 1. check the url for everything
// connect to supabase



export const config = {
  matcher: ["/((?!api/|_next/|_static/|examples/|[\\w-]+\\.\\w+).*)"],
};

export default async function middleware(req: NextRequest) {
  //PROTECTING THE ROUTE WHEN THE USER IS NOT LOGGED IN
  const res = NextResponse.next();

  //this is checking if the user is there and I will need to add that once I connected supabase here

    const supabase = createMiddlewareClient({ req, res });
    const {
      data: { user },
    } = await supabase.auth.getUser();


  const url = req.nextUrl;
  const hostname = req.headers.get("host");
  const path = url.pathname;

  // If localhost, assign the host value manually
  // If prod, get the custom domain/subdomain value by removing the root URL
  // (in the case of "subdomain-3.localhost:3000", "localhost:3000" is the root URL)
  // process.env.NODE_ENV === "production" indicates that the app is deployed to a production environment
  // process.env.VERCEL === "1" indicates that the app is deployed on Vercel
  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname.replace(`.brokertree.co`, "")
      : hostname.replace(`.localhost:3000`, "");

  
  //rewrites for app pages
  // like that I do have a clear separation on my app and this is the app while home
  // and the other pages are just content driven pages and do not have interaction with use
  if (currentHost == "app") {
    if (path==='/' && !user) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // ALL THIS IS FOR MULTI-TENANTING
  // NOTE - there is problem here with the build up of the multitenanting ... need to sort that out with supabase.

  //   const { data } = await supabase
  //     .from("profiles")
  //     .select("*")
  //     .eq("subdomain", currentHost);

  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents.
  if (url.pathname.startsWith(`/_sites`)) {
    url.pathname = `/404`;
  } else if (
    hostname === "localhost:3000" ||
    hostname === "brokertree.co"
    // data.length === 0
  ) {
    // rewrite to the current subdomain under the pages/sites folder
    return NextResponse.rewrite(new URL(`/home${path}`, req.url));
  } else {
    url.pathname = `/_sites/${currentHost}${url.pathname}`;
  }
  return NextResponse.rewrite(url);
}
