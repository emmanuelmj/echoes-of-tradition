import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
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

// Cultural Pillar type for the card grid
export interface CulturalPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

// Timeline Era type for the visual timeline
export interface TimelineEra {
  id: string;
  era: string;
  title: string;
  period: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

// Gallery Item type for the masonry gallery
export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  detailedDescription: string;
  imageUrl: string;
  imageAlt: string;
  aspectRatio: "square" | "portrait" | "landscape";
}

// Static data for the heritage website
export const culturalPillars: CulturalPillar[] = [
  {
    id: "architecture",
    title: "Indian Architecture",
    subtitle: "Temples, Palaces & Sacred Spaces",
    description: "From the intricate carvings of Khajuraho to the soaring gopurams of Tamil Nadu, Indian architecture represents millennia of spiritual and artistic evolution. Each structure tells stories of devotion, power, and the eternal quest for harmony between heaven and earth.",
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    imageAlt: "Ancient Indian temple architecture with intricate stone carvings"
  },
  {
    id: "philosophy",
    title: "Philosophy & Wisdom",
    subtitle: "Yoga, Vedas & Ancient Knowledge",
    description: "The philosophical traditions of India have illuminated human consciousness for over five thousand years. From the meditative practices of yoga to the profound insights of the Upanishads, this wisdom tradition continues to guide seekers across the globe.",
    imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80",
    imageAlt: "Meditation and yoga practice representing Indian philosophy"
  },
  {
    id: "global",
    title: "Global Influences",
    subtitle: "Trade Routes & Cultural Exchange",
    description: "Through the Silk Road and maritime spice routes, Indian culture flowed outward, enriching civilizations from Rome to China. Textiles, spices, mathematics, and spiritual practices traveled across continents, weaving India into the fabric of world heritage.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    imageAlt: "Ancient trade routes connecting civilizations"
  }
];

export const timelineEras: TimelineEra[] = [
  {
    id: "indus-valley",
    era: "3300-1300 BCE",
    title: "Indus Valley Civilization",
    period: "The Dawn of Urban India",
    description: "One of the world's earliest urban civilizations flourished along the Indus River. Cities like Mohenjo-daro and Harappa showcased remarkable urban planning, with sophisticated drainage systems, standardized weights, and a still-undeciphered script. Their legacy lives on in the artistic traditions and craft techniques that continue to this day.",
    imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80",
    imageAlt: "Archaeological ruins representing Indus Valley civilization"
  },
  {
    id: "vedic-age",
    era: "1500-500 BCE",
    title: "The Vedic Age",
    period: "Birth of Sacred Literature",
    description: "The composition of the Vedas marked the beginning of India's rich literary tradition. These sacred hymns, philosophical dialogues, and ritual texts laid the foundation for Hindu philosophy, astronomy, mathematics, and medicine. The concepts of dharma, karma, and moksha emerged during this transformative period.",
    imageUrl: "https://images.unsplash.com/photo-1609619385002-f40f1df827b8?w=400&q=80",
    imageAlt: "Ancient Sanskrit manuscripts representing Vedic knowledge"
  },
  {
    id: "mauryan",
    era: "322-185 BCE",
    title: "Mauryan Empire",
    period: "The First Pan-Indian Dynasty",
    description: "Under Chandragupta Maurya and his grandson Ashoka, India saw its first great empire spanning nearly the entire subcontinent. Ashoka's conversion to Buddhism and his rock edicts promoting non-violence and ethical governance left an indelible mark on Indian civilization and beyond.",
    imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80",
    imageAlt: "Ashoka pillar representing Mauryan Empire"
  },
  {
    id: "silk-road",
    era: "200 BCE - 1450 CE",
    title: "Silk Road Era",
    period: "Global Cultural Exchange",
    description: "India became a crucial node in the vast network of trade routes connecting East and West. Spices, textiles, precious stones, and ideas flowed from Indian ports and overland routes. Buddhism traveled to Central Asia, China, and Southeast Asia, while Indian mathematics and astronomy influenced Islamic scholars.",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80",
    imageAlt: "Ancient trading routes and cultural exchange"
  },
  {
    id: "classical",
    era: "320-550 CE",
    title: "Gupta Golden Age",
    period: "The Classical Flowering",
    description: "Often called India's Golden Age, the Gupta period witnessed unprecedented achievements in art, science, and literature. Kalidasa composed immortal poetry, Aryabhata revolutionized mathematics and astronomy, and the temples of this era set standards that would influence architecture for centuries.",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&q=80",
    imageAlt: "Classical Indian art and sculpture from Gupta period"
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: "holi",
    title: "Holi - Festival of Colors",
    category: "Festivals",
    description: "Spring celebration of love and colors",
    detailedDescription: "Holi, the ancient Hindu festival of colors, celebrates the triumph of good over evil and the arrival of spring. Participants throw vibrant colored powders called gulal, dance to dhol drums, and share sweets. The festival has roots in Hindu mythology, commemorating the divine love of Radha and Krishna, and the burning of the demoness Holika. Today, Holi has transcended religious boundaries to become a global celebration of joy, unity, and the victory of light over darkness.",
    imageUrl: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&q=80",
    imageAlt: "Colorful celebration of Holi festival",
    aspectRatio: "portrait"
  },
  {
    id: "kathakali",
    title: "Kathakali Dance Drama",
    category: "Performing Arts",
    description: "Classical dance-drama from Kerala",
    detailedDescription: "Kathakali is a centuries-old classical Indian dance-drama originating from Kerala. Distinguished by its elaborate costumes, intricate makeup (which can take hours to apply), and dramatic expressions called navarasas, Kathakali tells stories from the Mahabharata and Ramayana. Performers train for years to master the complex hand gestures (mudras), facial expressions, and footwork that bring ancient epics to life on stage.",
    imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80",
    imageAlt: "Kathakali dancer in traditional costume and makeup",
    aspectRatio: "square"
  },
  {
    id: "madhubani",
    title: "Madhubani Painting",
    category: "Visual Arts",
    description: "Ancient folk art tradition from Bihar",
    detailedDescription: "Madhubani painting, also called Mithila art, originated in the Mithila region of Bihar over 2,500 years ago. Traditionally painted by women on mud walls during festivals and ceremonies, these vibrant works feature geometric patterns, mythological scenes, and nature motifs. Using natural dyes from plants, charcoal, and ochre, artists create intricate designs without leaving any empty space—a style called 'double line border.' Today, Madhubani art is recognized globally as a UNESCO intangible cultural heritage.",
    imageUrl: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=600&q=80",
    imageAlt: "Colorful Madhubani folk art painting",
    aspectRatio: "landscape"
  },
  {
    id: "diwali",
    title: "Diwali - Festival of Lights",
    category: "Festivals",
    description: "Celebration of light over darkness",
    detailedDescription: "Diwali, the Festival of Lights, is one of India's most beloved celebrations, marking the victory of light over darkness and knowledge over ignorance. Homes are adorned with countless oil lamps (diyas) and colorful rangoli patterns. The festival honors various deities across different regions—Lakshmi for prosperity in the north, and the return of Lord Rama from exile. Fireworks illuminate the sky as families gather to exchange gifts, share sweets, and celebrate new beginnings.",
    imageUrl: "https://images.unsplash.com/photo-1574265935825-0f3e5e96e13a?w=600&q=80",
    imageAlt: "Diwali celebration with oil lamps and lights",
    aspectRatio: "square"
  },
  {
    id: "taj-mahal",
    title: "Taj Mahal",
    category: "Architecture",
    description: "Monument to eternal love",
    detailedDescription: "The Taj Mahal stands as perhaps the world's most beautiful testament to love. Built by Mughal Emperor Shah Jahan as a mausoleum for his beloved wife Mumtaz Mahal, this white marble masterpiece took 22 years and 20,000 artisans to complete. Its perfect symmetry, intricate pietra dura inlay work, and the way its color changes with the light—from pink at dawn to white at noon to golden at sunset—make it one of humanity's greatest architectural achievements.",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",
    imageAlt: "The magnificent Taj Mahal at sunrise",
    aspectRatio: "landscape"
  },
  {
    id: "warli",
    title: "Warli Tribal Art",
    category: "Visual Arts",
    description: "Indigenous art from Maharashtra",
    detailedDescription: "Warli art is one of India's oldest tribal art forms, practiced by the Warli tribe of Maharashtra for over 3,000 years. Using only white pigment made from rice paste on mud walls, artists create simple yet profound geometric shapes—circles, triangles, and squares—representing the sun, mountains, and sacred enclosures. The distinctive 'tarpa dance' motif, showing villagers holding hands in a spiral, symbolizes unity and the rhythm of daily life in tribal communities.",
    imageUrl: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=600&q=80",
    imageAlt: "Traditional Warli tribal art patterns",
    aspectRatio: "portrait"
  },
  {
    id: "hampi",
    title: "Ruins of Hampi",
    category: "Heritage Sites",
    description: "Medieval Vijayanagara Empire capital",
    detailedDescription: "The haunting ruins of Hampi spread across a surreal boulder-strewn landscape, telling the story of one of medieval India's most powerful empires. Once the thriving capital of the Vijayanagara Empire with over 500,000 inhabitants, Hampi was described by travelers as larger than Rome. Its temples, royal enclosures, and marketplace ruins—now a UNESCO World Heritage Site—showcase the pinnacle of Dravidian architecture and the empire's sophisticated urban planning.",
    imageUrl: "https://images.unsplash.com/photo-1600100397608-e1f0dc64d2f8?w=600&q=80",
    imageAlt: "Ancient stone chariot temple at Hampi",
    aspectRatio: "landscape"
  },
  {
    id: "bharatanatyam",
    title: "Bharatanatyam",
    category: "Performing Arts",
    description: "Classical dance from Tamil Nadu",
    detailedDescription: "Bharatanatyam is one of India's oldest classical dance forms, originating in Tamil Nadu temples over 2,000 years ago. This exquisite art form combines nritta (pure dance), nritya (expressive dance), and natya (dramatic element) into a seamless performance. Dancers tell stories through elaborate footwork, precise hand gestures (mudras), and expressive eye movements, all set to classical Carnatic music. The iconic tribhanga pose—a triple bend of the body—has become emblematic of Indian art.",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
    imageAlt: "Bharatanatyam dancer in traditional attire",
    aspectRatio: "portrait"
  },
  {
    id: "pongal",
    title: "Pongal Harvest Festival",
    category: "Festivals",
    description: "Tamil harvest celebration",
    detailedDescription: "Pongal is a four-day harvest festival celebrated in Tamil Nadu, marking the sun's journey northward. The festival's name comes from the tradition of boiling the first rice of the harvest until it 'pongs' or overflows—symbolizing abundance and prosperity. Homes are decorated with kolam (rangoli), cattle are honored with painted horns and garlands, and families gather to give thanks to the sun god Surya, the earth, and the cattle that help cultivate the land.",
    imageUrl: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&q=80",
    imageAlt: "Traditional Pongal celebration with decorated pots",
    aspectRatio: "square"
  },
  {
    id: "jaipur",
    title: "Pink City of Jaipur",
    category: "Heritage Sites",
    description: "Royal Rajasthani architecture",
    detailedDescription: "Jaipur, the Pink City, stands as a masterpiece of 18th-century urban planning. Founded by Maharaja Sawai Jai Singh II in 1727, the city's distinctive pink color was adopted in 1876 to welcome Prince Albert. The city's landmarks—Hawa Mahal with its 953 windows, the astronomical instruments of Jantar Mantar, and the Amber Fort—showcase the perfect blend of Rajput and Mughal architectural traditions. The old city's grid pattern was revolutionary for its time.",
    imageUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80",
    imageAlt: "Hawa Mahal palace in Jaipur",
    aspectRatio: "portrait"
  },
  {
    id: "textiles",
    title: "Indian Textile Heritage",
    category: "Crafts",
    description: "Weaving traditions across India",
    detailedDescription: "India's textile traditions represent one of the world's richest craft heritages, with each region developing distinctive weaving techniques and patterns. From the golden muga silk of Assam to the intricate ikats of Andhra Pradesh, from Kashmiri pashmina to Gujarati bandhani, Indian textiles have been prized globally for millennia. The legendary fine muslins of Bengal were so delicate they were called 'woven air,' and Indian calicos and chintz sparked a fashion revolution in Europe.",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    imageAlt: "Colorful traditional Indian textiles and fabrics",
    aspectRatio: "landscape"
  },
  {
    id: "varanasi",
    title: "Ghats of Varanasi",
    category: "Heritage Sites",
    description: "Sacred city on the Ganges",
    detailedDescription: "Varanasi, also known as Kashi or Benares, is one of the world's oldest continuously inhabited cities and Hinduism's holiest site. The city's ghats—stone steps leading down to the sacred Ganges River—are the heart of spiritual life, where pilgrims bathe at dawn, priests perform elaborate aarti ceremonies at dusk, and cremation fires burn eternally. Mark Twain wrote that Varanasi is 'older than history, older than tradition, older even than legend.'",
    imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&q=80",
    imageAlt: "Evening aarti ceremony at Varanasi ghats",
    aspectRatio: "landscape"
  }
];
