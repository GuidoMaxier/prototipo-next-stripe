import { db } from "@/db";
import { projects, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function ensureDemoProject(userEmail: string) {
  // 1. Get user
  const user = await db.select().from(users).where(eq(users.email, userEmail)).get();
  if (!user) return null;

  // 2. Check if demo project exists
  const existingProject = await db.select().from(projects).where(eq(projects.userId, user.id)).get();
  if (existingProject) return existingProject;

  // 3. Create one if not
  const apiKey = `key_${user.id.slice(0, 8)}`;
  
  const [newProject] = await db.insert(projects).values({
    name: "My First Project",
    userId: user.id,
    apiKey: apiKey,
    url: "http://localhost:3000/demo"
  }).returning();

  return newProject;
}
