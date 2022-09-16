/*
  Warnings:

  - You are about to drop the `_CategoryToTeacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToTeacher" DROP CONSTRAINT "_CategoryToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToTeacher" DROP CONSTRAINT "_CategoryToTeacher_B_fkey";

-- DropIndex
DROP INDEX "terms_number_key";

-- AlterTable
ALTER TABLE "test" ADD COLUMN     "termId" INTEGER;

-- DropTable
DROP TABLE "_CategoryToTeacher";

-- AddForeignKey
ALTER TABLE "test" ADD CONSTRAINT "test_termId_fkey" FOREIGN KEY ("termId") REFERENCES "terms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
