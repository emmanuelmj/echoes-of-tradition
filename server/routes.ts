import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertCulturalPillarSchema,
  insertTimelineEraSchema,
  insertGalleryItemSchema,
} from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // API endpoint to get all cultural pillars
  app.get("/api/pillars", async (_req, res) => {
    try {
      const pillars = await storage.getAllPillars();
      res.json(pillars);
    } catch (error) {
      console.error("Error fetching pillars:", error);
      res.status(500).json({ message: "Failed to fetch pillars" });
    }
  });

  // API endpoint to get a specific cultural pillar by slug
  app.get("/api/pillars/:slug", async (req, res) => {
    try {
      const pillar = await storage.getPillarBySlug(req.params.slug);
      if (!pillar) {
        return res.status(404).json({ message: "Pillar not found" });
      }
      res.json(pillar);
    } catch (error) {
      console.error("Error fetching pillar:", error);
      res.status(500).json({ message: "Failed to fetch pillar" });
    }
  });

  // API endpoint to create a new cultural pillar
  app.post("/api/pillars", async (req, res) => {
    try {
      const validated = insertCulturalPillarSchema.parse(req.body);
      const pillar = await storage.createPillar(validated);
      res.status(201).json(pillar);
    } catch (error) {
      console.error("Error creating pillar:", error);
      res.status(400).json({ message: "Invalid pillar data" });
    }
  });

  // API endpoint to update a cultural pillar
  app.patch("/api/pillars/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const pillar = await storage.updatePillar(id, req.body);
      if (!pillar) {
        return res.status(404).json({ message: "Pillar not found" });
      }
      res.json(pillar);
    } catch (error) {
      console.error("Error updating pillar:", error);
      res.status(400).json({ message: "Failed to update pillar" });
    }
  });

  // API endpoint to delete a cultural pillar
  app.delete("/api/pillars/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deletePillar(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting pillar:", error);
      res.status(500).json({ message: "Failed to delete pillar" });
    }
  });

  // API endpoint to get all timeline eras
  app.get("/api/timeline", async (_req, res) => {
    try {
      const eras = await storage.getAllTimelineEras();
      res.json(eras);
    } catch (error) {
      console.error("Error fetching timeline:", error);
      res.status(500).json({ message: "Failed to fetch timeline" });
    }
  });

  // API endpoint to get a specific timeline era by slug
  app.get("/api/timeline/:slug", async (req, res) => {
    try {
      const era = await storage.getTimelineEraBySlug(req.params.slug);
      if (!era) {
        return res.status(404).json({ message: "Era not found" });
      }
      res.json(era);
    } catch (error) {
      console.error("Error fetching era:", error);
      res.status(500).json({ message: "Failed to fetch era" });
    }
  });

  // API endpoint to create a new timeline era
  app.post("/api/timeline", async (req, res) => {
    try {
      const validated = insertTimelineEraSchema.parse(req.body);
      const era = await storage.createTimelineEra(validated);
      res.status(201).json(era);
    } catch (error) {
      console.error("Error creating era:", error);
      res.status(400).json({ message: "Invalid era data" });
    }
  });

  // API endpoint to update a timeline era
  app.patch("/api/timeline/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const era = await storage.updateTimelineEra(id, req.body);
      if (!era) {
        return res.status(404).json({ message: "Era not found" });
      }
      res.json(era);
    } catch (error) {
      console.error("Error updating era:", error);
      res.status(400).json({ message: "Failed to update era" });
    }
  });

  // API endpoint to delete a timeline era
  app.delete("/api/timeline/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTimelineEra(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting era:", error);
      res.status(500).json({ message: "Failed to delete era" });
    }
  });

  // API endpoint to get all gallery items
  app.get("/api/gallery", async (req, res) => {
    try {
      const { search, category, region } = req.query;
      
      let items;
      if (search && typeof search === "string") {
        items = await storage.searchGalleryItems(search);
      } else if (category && typeof category === "string") {
        items = await storage.getGalleryItemsByCategory(category);
      } else if (region && typeof region === "string") {
        items = await storage.getGalleryItemsByRegion(region);
      } else {
        items = await storage.getAllGalleryItems();
      }
      
      res.json(items);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      res.status(500).json({ message: "Failed to fetch gallery" });
    }
  });

  // API endpoint to get gallery items by category
  app.get("/api/gallery/category/:category", async (req, res) => {
    try {
      const items = await storage.getGalleryItemsByCategory(req.params.category);
      res.json(items);
    } catch (error) {
      console.error("Error fetching gallery by category:", error);
      res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });

  // API endpoint to get a specific gallery item by slug
  app.get("/api/gallery/:slug", async (req, res) => {
    try {
      const item = await storage.getGalleryItemBySlug(req.params.slug);
      if (!item) {
        return res.status(404).json({ message: "Gallery item not found" });
      }
      res.json(item);
    } catch (error) {
      console.error("Error fetching gallery item:", error);
      res.status(500).json({ message: "Failed to fetch gallery item" });
    }
  });

  // API endpoint to create a new gallery item
  app.post("/api/gallery", async (req, res) => {
    try {
      const validated = insertGalleryItemSchema.parse(req.body);
      const item = await storage.createGalleryItem(validated);
      res.status(201).json(item);
    } catch (error) {
      console.error("Error creating gallery item:", error);
      res.status(400).json({ message: "Invalid gallery item data" });
    }
  });

  // API endpoint to update a gallery item
  app.patch("/api/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const item = await storage.updateGalleryItem(id, req.body);
      if (!item) {
        return res.status(404).json({ message: "Gallery item not found" });
      }
      res.json(item);
    } catch (error) {
      console.error("Error updating gallery item:", error);
      res.status(400).json({ message: "Failed to update gallery item" });
    }
  });

  // API endpoint to delete a gallery item
  app.delete("/api/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteGalleryItem(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      res.status(500).json({ message: "Failed to delete gallery item" });
    }
  });

  // API endpoint to get heritage stats/summary
  app.get("/api/stats", async (_req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  return httpServer;
}
