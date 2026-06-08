import { NextRequest } from "next/server";
import { updateSession } from "./supabase/updateSession";

export function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
   matcher: [
    "/((?!api/uploadthing|_next/static|_next/image|favicon.ico).*)",
  ],
};