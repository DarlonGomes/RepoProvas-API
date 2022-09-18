/*
  Warnings:

  - The `created_at` column on the `test` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `date` to the `test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "test" ADD COLUMN     "date" TEXT NOT NULL,
DROP COLUMN "created_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
