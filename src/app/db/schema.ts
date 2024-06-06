import {drizzle} from 'drizzle-orm/vercel-postgres'
import {sql} from '@vercel/postgres'

import {
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core"


export const UsersTable = pgTable("users",{
  id: serial('id').primaryKey().unique(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').notNull().default(new Date()),
})