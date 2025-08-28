import type { Express } from "express";
import { storage } from "./storage";

export function registerRoutes(app: Express): void {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // example health route so the API has at least one endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });
}
