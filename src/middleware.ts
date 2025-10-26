import { type NextRequest, NextResponse } from "next/server";
import { getUserSession } from "./actions/get-user-session";

const redirectUser = (route: string, userIsAtuthenticaded: boolean) => {
  // Caso usuario autenticado, redireciona para a página principal
  if (route === "/autenticar" && userIsAtuthenticaded) {
    return "/";
  }

  // caso usuário não autenticado e quiser acessar pagina de checkout, redireciona para a página de autenticacao
  if (route.startsWith("/checkout") && !userIsAtuthenticaded) {
    return "/autenticar";
  }
};
export async function middleware(request: NextRequest) {
  const userSession = await getUserSession();
  const pathName = request.nextUrl.pathname;
  const userIsAtuthenticaded = !!userSession;
  const redirect = redirectUser(pathName, userIsAtuthenticaded);

  if (redirect) {
    return NextResponse.redirect(new URL(redirect, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)",
  ],
};
