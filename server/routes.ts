import type { Express } from "express";
import { createServer, type Server } from "http";
import { 
  culturalPillars, 
  timelineEras, 
  galleryItems 
} from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // API endpoint to get all cultural pillars
  app.get("/api/pillars", (_req, res) => {
    res.json(culturalPillars);
  });

  // API endpoint to get a specific cultural pillar by ID
  app.get("/api/pillars/:id", (req, res) => {
    const pillar = culturalPillars.find(p => p.id === req.params.id);
    if (!pillar) {
      return res.status(404).json({ message: "Pillar not found" });
    }
    res.json(pillar);
  });

  // API endpoint to get all timeline eras
  app.get("/api/timeline", (_req, res) => {
    res.json(timelineEras);
  });

  // API endpoint to get a specific timeline era by ID
  app.get("/api/timeline/:id", (req, res) => {
    const era = timelineEras.find(e => e.id === req.params.id);
    if (!era) {
      return res.status(404).json({ message: "Era not found" });
    }
    res.json(era);
  });

  // API endpoint to get all gallery items
  app.get("/api/gallery", (_req, res) => {
    res.json(galleryItems);
  });

  // API endpoint to get gallery items by category
  app.get("/api/gallery/category/:category", (req, res) => {
    const items = galleryItems.filter(
      item => item.category.toLowerCase() === req.params.category.toLowerCase()
    );
    res.json(items);
  });

  // API endpoint to get a specific gallery item by ID
  app.get("/api/gallery/:id", (req, res) => {
    const item = galleryItems.find(g => g.id === req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Gallery item not found" });
    }
    res.json(item);
  });

  // API endpoint to get heritage stats/summary
  app.get("/api/stats", (_req, res) => {
    const categories = [...new Set(galleryItems.map(item => item.category))];
    res.json({
      totalPillars: culturalPillars.length,
      totalTimelineEras: timelineEras.length,
      totalGalleryItems: galleryItems.length,
      galleryCategories: categories,
    });
  });

  return httpServer;
}
