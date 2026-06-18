import type { NextApiRequest, NextApiResponse } from "next";
import { createServerClient } from "@supabase/ssr";
import { serialize } from "cookie";

export function supabaseServercClientPages(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return Object.entries(req.cookies).map(([name, value]) => ({
            name,
            value: value ?? "",
          }));
        },

        setAll(cookiesToSet) {
          const cookies = cookiesToSet.map(({ name, value, options }) =>
            serialize(name, value, options)
          );

          res.setHeader("Set-Cookie", cookies);
        },
      },
    }
  );
}