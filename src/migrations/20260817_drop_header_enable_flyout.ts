import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "enable_flyout";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "header_nav_items" ADD COLUMN IF NOT EXISTS "enable_flyout" boolean DEFAULT false;
  `)
}
