import { type NextRequest, NextResponse } from "next/server";
import { getUserSession } from "./actions/get-user-session";

const VERIFY_ROUTE = [
  {
    path: "/autenticar",
    requires_auth: false,
    redirectTo: "/",
  },
  {
    path: "/checkout",
    requires_auth: true,
    redirectTo: "/autenticar",
  },
  {
    path: "/pedidos",
    requires_auth: true,
    redirectTo: "/autenticar",
  },
] as const;

export async function middleware(request: NextRequest) {
  const userSession = await getUserSession();
  const pathName = request.nextUrl.pathname;
  const userIsAtuthenticaded = !!userSession;

  const ROUTE_NEEDS_ACTION = VERIFY_ROUTE.find((route) =>
    pathName.startsWith(route.path)
  );

  if (!ROUTE_NEEDS_ACTION) {
    return NextResponse.next();
  }
  // Verifica a condicao da rota e se o usuario esta logado e redireciona
  if (ROUTE_NEEDS_ACTION.requires_auth && !userIsAtuthenticaded) {
    return NextResponse.redirect(
      new URL(ROUTE_NEEDS_ACTION.redirectTo, request.url)
    );
  }

  if (!ROUTE_NEEDS_ACTION.requires_auth && userIsAtuthenticaded) {
    return NextResponse.redirect(
      new URL(ROUTE_NEEDS_ACTION.redirectTo, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)",
  ],
};
