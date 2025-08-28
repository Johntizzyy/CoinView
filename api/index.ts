import type { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../server/app";
import { createServer } from "http";

// Export a handler that Vercel can invoke
export default function handler(req: VercelRequest, res: VercelResponse) {
  // Let Express handle the request
  // @ts-expect-error Vercel's req/res are compatible enough for Express
  return app(req, res);
}

// Optional: if needed, expose server for websockets later
export const config = {
  api: {
    bodyParser: false,
  },
};
