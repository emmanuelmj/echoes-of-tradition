import { eq, ilike, or, asc } from "drizzle-orm";
import { db } from "./db";
import {
  type User,
  type InsertUser,
  type CulturalPillar,
  type InsertCulturalPillar,
  type TimelineEra,
  type InsertTimelineEra,
  type GalleryItem,
  type InsertGalleryItem,
  users,
  culturalPillarsTable,
  timelineErasTable,
  galleryItemsTable,
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Cultural Pillars operations
  getAllPillars(): Promise<CulturalPillar[]>;
  getPillarBySlug(slug: string): Promise<CulturalPillar | undefined>;
  createPillar(pillar: InsertCulturalPillar): Promise<CulturalPillar>;
  updatePillar(id: number, pillar: Partial<InsertCulturalPillar>): Promise<CulturalPillar | undefined>;
  deletePillar(id: number): Promise<boolean>;
  
  // Timeline Eras operations
  getAllTimelineEras(): Promise<TimelineEra[]>;
  getTimelineEraBySlug(slug: string): Promise<TimelineEra | undefined>;
  createTimelineEra(era: InsertTimelineEra): Promise<TimelineEra>;
  updateTimelineEra(id: number, era: Partial<InsertTimelineEra>): Promise<TimelineEra | undefined>;
  deleteTimelineEra(id: number): Promise<boolean>;
  
  // Gallery Items operations
  getAllGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItemBySlug(slug: string): Promise<GalleryItem | undefined>;
  getGalleryItemsByCategory(category: string): Promise<GalleryItem[]>;
  getGalleryItemsByRegion(region: string): Promise<GalleryItem[]>;
  searchGalleryItems(query: string): Promise<GalleryItem[]>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  updateGalleryItem(id: number, item: Partial<InsertGalleryItem>): Promise<GalleryItem | undefined>;
  deleteGalleryItem(id: number): Promise<boolean>;
  
  // Stats
  getStats(): Promise<{
    totalPillars: number;
    totalTimelineEras: number;
    totalGalleryItems: number;
    galleryCategories: string[];
    regions: string[];
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Cultural Pillars operations
  async getAllPillars(): Promise<CulturalPillar[]> {
    return db.select().from(culturalPillarsTable).orderBy(asc(culturalPillarsTable.sortOrder));
  }

  async getPillarBySlug(slug: string): Promise<CulturalPillar | undefined> {
    const [pillar] = await db.select().from(culturalPillarsTable).where(eq(culturalPillarsTable.slug, slug));
    return pillar;
  }

  async createPillar(pillar: InsertCulturalPillar): Promise<CulturalPillar> {
    const [created] = await db.insert(culturalPillarsTable).values(pillar).returning();
    return created;
  }

  async updatePillar(id: number, pillar: Partial<InsertCulturalPillar>): Promise<CulturalPillar | undefined> {
    const [updated] = await db
      .update(culturalPillarsTable)
      .set({ ...pillar, updatedAt: new Date() })
      .where(eq(culturalPillarsTable.id, id))
      .returning();
    return updated;
  }

  async deletePillar(id: number): Promise<boolean> {
    const result = await db.delete(culturalPillarsTable).where(eq(culturalPillarsTable.id, id));
    return true;
  }

  // Timeline Eras operations
  async getAllTimelineEras(): Promise<TimelineEra[]> {
    return db.select().from(timelineErasTable).orderBy(asc(timelineErasTable.sortOrder));
  }

  async getTimelineEraBySlug(slug: string): Promise<TimelineEra | undefined> {
    const [era] = await db.select().from(timelineErasTable).where(eq(timelineErasTable.slug, slug));
    return era;
  }

  async createTimelineEra(era: InsertTimelineEra): Promise<TimelineEra> {
    const [created] = await db.insert(timelineErasTable).values(era).returning();
    return created;
  }

  async updateTimelineEra(id: number, era: Partial<InsertTimelineEra>): Promise<TimelineEra | undefined> {
    const [updated] = await db
      .update(timelineErasTable)
      .set({ ...era, updatedAt: new Date() })
      .where(eq(timelineErasTable.id, id))
      .returning();
    return updated;
  }

  async deleteTimelineEra(id: number): Promise<boolean> {
    await db.delete(timelineErasTable).where(eq(timelineErasTable.id, id));
    return true;
  }

  // Gallery Items operations
  async getAllGalleryItems(): Promise<GalleryItem[]> {
    return db.select().from(galleryItemsTable).orderBy(asc(galleryItemsTable.sortOrder));
  }

  async getGalleryItemBySlug(slug: string): Promise<GalleryItem | undefined> {
    const [item] = await db.select().from(galleryItemsTable).where(eq(galleryItemsTable.slug, slug));
    return item;
  }

  async getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
    return db.select().from(galleryItemsTable)
      .where(ilike(galleryItemsTable.category, category))
      .orderBy(asc(galleryItemsTable.sortOrder));
  }

  async getGalleryItemsByRegion(region: string): Promise<GalleryItem[]> {
    return db.select().from(galleryItemsTable)
      .where(ilike(galleryItemsTable.region, region))
      .orderBy(asc(galleryItemsTable.sortOrder));
  }

  async searchGalleryItems(query: string): Promise<GalleryItem[]> {
    const searchPattern = `%${query}%`;
    return db.select().from(galleryItemsTable)
      .where(
        or(
          ilike(galleryItemsTable.title, searchPattern),
          ilike(galleryItemsTable.category, searchPattern),
          ilike(galleryItemsTable.description, searchPattern),
          ilike(galleryItemsTable.region, searchPattern)
        )
      )
      .orderBy(asc(galleryItemsTable.sortOrder));
  }

  async createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem> {
    const [created] = await db.insert(galleryItemsTable).values(item).returning();
    return created;
  }

  async updateGalleryItem(id: number, item: Partial<InsertGalleryItem>): Promise<GalleryItem | undefined> {
    const [updated] = await db
      .update(galleryItemsTable)
      .set({ ...item, updatedAt: new Date() })
      .where(eq(galleryItemsTable.id, id))
      .returning();
    return updated;
  }

  async deleteGalleryItem(id: number): Promise<boolean> {
    await db.delete(galleryItemsTable).where(eq(galleryItemsTable.id, id));
    return true;
  }

  // Stats
  async getStats() {
    const pillars = await this.getAllPillars();
    const eras = await this.getAllTimelineEras();
    const items = await this.getAllGalleryItems();
    
    const categories = Array.from(new Set(items.map(item => item.category)));
    const regions = Array.from(new Set(items.map(item => item.region).filter((r): r is string => r !== null)));

    return {
      totalPillars: pillars.length,
      totalTimelineEras: eras.length,
      totalGalleryItems: items.length,
      galleryCategories: categories,
      regions,
    };
  }
}

export const storage = new DatabaseStorage();
