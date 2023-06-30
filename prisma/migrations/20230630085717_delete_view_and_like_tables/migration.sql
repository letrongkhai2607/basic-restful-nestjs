/*
  Warnings:

  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `View` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_articleId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_articleId_fkey";

-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_userId_fkey";

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "View";
