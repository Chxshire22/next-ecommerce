CREATE TABLE IF NOT EXISTS "quotation_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"quotation_id" integer NOT NULL,
	"description" text NOT NULL,
	"quantity" integer NOT NULL,
	"unit_price" integer NOT NULL,
	CONSTRAINT "quotation_items_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quotations" (
	"id" serial PRIMARY KEY NOT NULL,
	"attention" text NOT NULL,
	"entity" text,
	"date_of_quotation" timestamp DEFAULT now() NOT NULL,
	"expiry_date" timestamp NOT NULL,
	"address_line1" text NOT NULL,
	"address_line2" text,
	"address_line3" text,
	"payment_terms" text NOT NULL,
	"warranty_period" integer NOT NULL,
	CONSTRAINT "quotations_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DROP TABLE "posts";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quotation_items" ADD CONSTRAINT "quotation_items_quotation_id_quotations_id_fk" FOREIGN KEY ("quotation_id") REFERENCES "public"."quotations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
