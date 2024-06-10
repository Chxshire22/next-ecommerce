import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey().unique(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
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

export const quotations = pgTable("quotations", {
	id: serial("id").primaryKey().unique(),
	attention: text("attention").notNull(),
	entity: text("entity"),
	dateOfQuotation: timestamp("date_of_quotation").defaultNow().notNull(),
	exipiryDate: timestamp("expiry_date").notNull(),
	addressLine1: text("address_line1").notNull(),
	addressLine2: text("address_line2"),
	addressLine3: text("address_line3"),
	paymentTerms: text("payment_terms").notNull(),
	warrantyPeriod: integer("warranty_period").notNull(),
});

export const quotationItems = pgTable("quotation_items", {
	id: serial("id").primaryKey().unique(),
	quotationId: integer("quotation_id")
		.notNull()
		.references(() => quotations.id),
	description: text("description").notNull(),
	quantity: integer("quantity").notNull(),
	unitPrice: integer("unit_price").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
	userSessions: many(userSessions), //one user may log into their account from multiple locations
}));

export const refreshTokenRelations = relations(userSessions, ({ one }) => ({
	user: one(users, {
		fields: [userSessions.userId],
		references: [users.id],
	}),
}));

export const quotationRelations = relations(quotations, ({ many }) => ({
	quotationItems: many(quotationItems),
}));

export const quotationItemRelations = relations(quotationItems, ({ one }) => ({
	quotation: one(quotations, {
		fields: [quotationItems.quotationId],
		references: [quotations.id],
	}),
}));

// to use relational API, need to define explicitly the relationship between each tables if any
