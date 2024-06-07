ALTER TABLE "refreshToken" RENAME TO "jwtRefresh";--> statement-breakpoint
ALTER TABLE "jwtRefresh" DROP CONSTRAINT "refreshToken_id_unique";--> statement-breakpoint
ALTER TABLE "jwtRefresh" DROP CONSTRAINT "refreshToken_userId_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jwtRefresh" ADD CONSTRAINT "jwtRefresh_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "jwtRefresh" ADD CONSTRAINT "jwtRefresh_id_unique" UNIQUE("id");