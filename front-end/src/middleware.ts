import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GetDataByToken } from "./utils";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/admin")) {
    const token = req.cookies.get("jwt")?.value;

    if (!token || !GetDataByToken(token).isAdmin) {
      url.pathname = "/404";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
