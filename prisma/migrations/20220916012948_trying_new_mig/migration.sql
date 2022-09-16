-- CreateTable
CREATE TABLE "_CategoryToDiscipline" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToDiscipline_AB_unique" ON "_CategoryToDiscipline"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToDiscipline_B_index" ON "_CategoryToDiscipline"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToDiscipline" ADD CONSTRAINT "_CategoryToDiscipline_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToDiscipline" ADD CONSTRAINT "_CategoryToDiscipline_B_fkey" FOREIGN KEY ("B") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
