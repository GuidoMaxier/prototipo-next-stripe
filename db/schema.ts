import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core';
import type { AdapterAccountType } from "next-auth/adapters";

// --- NextAuth Tables ---

export const users = sqliteTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
});

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

// --- SaaS Multi-tenant Tables ---

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  apiKey: text("api_key").unique().notNull(), // Public key for the tracking script
  url: text("url"), // The client's website URL
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

// --- Business Tables ---

export const ordersTable = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  projectId: text('project_id')
    .references(() => projects.id, { onDelete: "cascade" }),
  stripeSessionId: text('stripe_session_id').unique(),
  userId: text('user_id')
    .references(() => users.id),
  amount: integer('amount').notNull(),
  status: text('status').notNull(),
  
  // Tracking Data (Essential for AdTracker)
  utmSource: text('utm_source'),
  utmMedium: text('utm_medium'),
  utmCampaign: text('utm_campaign'),
  fbclid: text('fbclid'), // Facebook Click ID
  gclid: text('gclid'),   // Google Click ID

  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .$onUpdate(() => new Date())
});

export const visitsTable = sqliteTable('visits', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  projectId: text('project_id')
    .references(() => projects.id, { onDelete: "cascade" }),
  
  // Tracking Data
  utmSource: text('utm_source'),
  utmMedium: text('utm_medium'),
  utmCampaign: text('utm_campaign'),
  fbclid: text('fbclid'),
  gclid: text('gclid'),
  
  path: text('path').notNull(),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});