import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const jwtRefresh = pgTable("jwtRefresh", {
  id: serial("id").primaryKey().unique(),
  token: text("token").notNull(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts), // one user can have many posts
  jwtRefresh: many(jwtRefresh), //one user may log into their account from multiple locations
}));

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users,{
    fields:[posts.userId],
    references: [users.id]
  }), // one post can have one user
}));

export const refreshTokenRelations = relations(jwtRefresh, ({ one }) => ({
  user: one(users, {
    fields: [jwtRefresh.userId],
    references: [users.id],
  }),
}));

// to use relational API, need to define explicitly the relationship between each tables if any
