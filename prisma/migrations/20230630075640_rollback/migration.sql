/*
  Warnings:

  - You are about to drop the column `articleId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `articleId` on the `View` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `View` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_articleId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_authorId_fkey";

-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_articleId_fkey";

-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_authorId_fkey";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "articleId",
DROP COLUMN "authorId",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "View" DROP COLUMN "articleId",
DROP COLUMN "authorId",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
