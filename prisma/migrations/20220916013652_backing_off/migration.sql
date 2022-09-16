/*
  Warnings:

  - You are about to drop the `_CategoryToDiscipline` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToDiscipline" DROP CONSTRAINT "_CategoryToDiscipline_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToDiscipline" DROP CONSTRAINT "_CategoryToDiscipline_B_fkey";

-- DropTable
DROP TABLE "_CategoryToDiscipline";
