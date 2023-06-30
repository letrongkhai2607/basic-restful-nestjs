-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "articleId" INTEGER;

-- AlterTable
ALTER TABLE "View" ADD COLUMN     "articleId" INTEGER;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;
