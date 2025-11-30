import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Cultural Pillars table
export const culturalPillarsTable = pgTable("cultural_pillars", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  imageAlt: text("image_alt").notNull(),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertCulturalPillarSchema = createInsertSchema(culturalPillarsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertCulturalPillar = z.infer<typeof insertCulturalPillarSchema>;
export type CulturalPillar = typeof culturalPillarsTable.$inferSelect;

// Timeline Eras table
export const timelineErasTable = pgTable("timeline_eras", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  era: text("era").notNull(),
  title: text("title").notNull(),
  period: text("period").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  imageAlt: text("image_alt").notNull(),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertTimelineEraSchema = createInsertSchema(timelineErasTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertTimelineEra = z.infer<typeof insertTimelineEraSchema>;
export type TimelineEra = typeof timelineErasTable.$inferSelect;

// Gallery Items table
export const galleryItemsTable = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  region: text("region"),
  description: text("description").notNull(),
  detailedDescription: text("detailed_description").notNull(),
  imageUrl: text("image_url").notNull(),
  imageAlt: text("image_alt").notNull(),
  aspectRatio: text("aspect_ratio").notNull().default("square"),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertGalleryItemSchema = createInsertSchema(galleryItemsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;
export type GalleryItem = typeof galleryItemsTable.$inferSelect;
