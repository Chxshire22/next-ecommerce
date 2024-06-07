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

export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey().unique(),
  token: text("token").notNull(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  tokenIssuedTime: text("token_issued_time").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts), // one user can have many posts
  userSessions: many(userSessions), //one user may log into their account from multiple locations
}));

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users,{
    fields:[posts.userId],
    references: [users.id]
  }), // one post can have one user
}));

export const refreshTokenRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id],
  }),
}));

// to use relational API, need to define explicitly the relationship between each tables if any
