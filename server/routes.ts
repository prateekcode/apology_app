import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to fetch messages if needed
  app.get('/api/messages', (req, res) => {
    // Read messages from static JSON file
    const messagesPath = path.join(import.meta.dirname, '../client/src/data/messages.ts');
    try {
      // Return success message - we're handling messages on the client side
      res.json({ success: true, message: "Messages are handled client-side" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching messages" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
