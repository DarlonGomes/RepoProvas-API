/*
  Warnings:

  - You are about to drop the column `termId` on the `test` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "test" DROP CONSTRAINT "test_termId_fkey";

-- AlterTable
ALTER TABLE "test" DROP COLUMN "termId";
