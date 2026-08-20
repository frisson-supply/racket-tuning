import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_about_us_section_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_about_us_section_about_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_button_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_about_us_section_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_about_us_section_about_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_button_type" AS ENUM('reference', 'custom');
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'main' BEFORE 'highImpact';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'main' BEFORE 'highImpact';
  CREATE TABLE "pages_blocks_about_us_section_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum_pages_blocks_about_us_section_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "pages_blocks_about_us_section_cards_locales" (
  	"title" varchar,
  	"description" varchar,
  	"link_url" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_us_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"about_card_link_type" "enum_pages_blocks_about_us_section_about_card_link_type" DEFAULT 'reference',
  	"about_card_link_new_tab" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_us_section_locales" (
  	"eyebrow" varchar,
  	"rich_text" jsonb,
  	"about_card_title" varchar DEFAULT 'About us',
  	"about_card_description" varchar,
  	"about_card_link_url" varchar,
  	"about_card_link_label" varchar,
  	"cards_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_about_us_section_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum__pages_v_blocks_about_us_section_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_us_section_cards_locales" (
  	"title" varchar,
  	"description" varchar,
  	"link_url" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_about_us_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"about_card_link_type" "enum__pages_v_blocks_about_us_section_about_card_link_type" DEFAULT 'reference',
  	"about_card_link_new_tab" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_us_section_locales" (
  	"eyebrow" varchar,
  	"rich_text" jsonb,
  	"about_card_title" varchar DEFAULT 'About us',
  	"about_card_description" varchar,
  	"about_card_link_url" varchar,
  	"about_card_link_label" varchar,
  	"cards_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages" ADD COLUMN "hero_button_type" "enum_pages_hero_button_type" DEFAULT 'reference';
  ALTER TABLE "pages" ADD COLUMN "hero_button_new_tab" boolean;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_eyebrow" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_button_url" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_button_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_button_type" "enum__pages_v_version_hero_button_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_button_new_tab" boolean;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_eyebrow" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_button_url" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_button_label" varchar;
  ALTER TABLE "pages_blocks_about_us_section_cards" ADD CONSTRAINT "pages_blocks_about_us_section_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_us_section_cards" ADD CONSTRAINT "pages_blocks_about_us_section_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_us_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_us_section_cards_locales" ADD CONSTRAINT "pages_blocks_about_us_section_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_us_section_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_us_section" ADD CONSTRAINT "pages_blocks_about_us_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_us_section_locales" ADD CONSTRAINT "pages_blocks_about_us_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_us_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_us_section_cards" ADD CONSTRAINT "_pages_v_blocks_about_us_section_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_us_section_cards" ADD CONSTRAINT "_pages_v_blocks_about_us_section_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_us_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_us_section_cards_locales" ADD CONSTRAINT "_pages_v_blocks_about_us_section_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_us_section_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_us_section" ADD CONSTRAINT "_pages_v_blocks_about_us_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_us_section_locales" ADD CONSTRAINT "_pages_v_blocks_about_us_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_us_section"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_about_us_section_cards_order_idx" ON "pages_blocks_about_us_section_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_us_section_cards_parent_id_idx" ON "pages_blocks_about_us_section_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_us_section_cards_image_idx" ON "pages_blocks_about_us_section_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_about_us_section_cards_locales_locale_parent_id" ON "pages_blocks_about_us_section_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_us_section_order_idx" ON "pages_blocks_about_us_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_us_section_parent_id_idx" ON "pages_blocks_about_us_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_us_section_path_idx" ON "pages_blocks_about_us_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_about_us_section_locales_locale_parent_id_uniqu" ON "pages_blocks_about_us_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_about_us_section_cards_order_idx" ON "_pages_v_blocks_about_us_section_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_us_section_cards_parent_id_idx" ON "_pages_v_blocks_about_us_section_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_us_section_cards_image_idx" ON "_pages_v_blocks_about_us_section_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_about_us_section_cards_locales_locale_parent" ON "_pages_v_blocks_about_us_section_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_about_us_section_order_idx" ON "_pages_v_blocks_about_us_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_us_section_parent_id_idx" ON "_pages_v_blocks_about_us_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_us_section_path_idx" ON "_pages_v_blocks_about_us_section" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_about_us_section_locales_locale_parent_id_un" ON "_pages_v_blocks_about_us_section_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_about_us_section_cards" CASCADE;
  DROP TABLE "pages_blocks_about_us_section_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_about_us_section" CASCADE;
  DROP TABLE "pages_blocks_about_us_section_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_about_us_section_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_about_us_section_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_about_us_section" CASCADE;
  DROP TABLE "_pages_v_blocks_about_us_section_locales" CASCADE;
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum_pages_hero_type";
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::"public"."enum_pages_hero_type";
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DATA TYPE "public"."enum_pages_hero_type" USING "hero_type"::"public"."enum_pages_hero_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE "public"."enum__pages_v_version_hero_type" USING "version_hero_type"::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "pages" DROP COLUMN "hero_button_type";
  ALTER TABLE "pages" DROP COLUMN "hero_button_new_tab";
  ALTER TABLE "pages_locales" DROP COLUMN "hero_eyebrow";
  ALTER TABLE "pages_locales" DROP COLUMN "hero_button_url";
  ALTER TABLE "pages_locales" DROP COLUMN "hero_button_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_button_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_button_new_tab";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_hero_eyebrow";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_hero_button_url";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_hero_button_label";
  DROP TYPE "public"."enum_pages_blocks_about_us_section_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_about_us_section_about_card_link_type";
  DROP TYPE "public"."enum_pages_hero_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_about_us_section_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_about_us_section_about_card_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_button_type";`)
}
