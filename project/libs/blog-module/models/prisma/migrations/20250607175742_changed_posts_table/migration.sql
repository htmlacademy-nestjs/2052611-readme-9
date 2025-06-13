/*
  Warnings:

  - The primary key for the `likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `data` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "likes" DROP CONSTRAINT "likes_pkey",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("postId", "user_id");

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "data",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "file" TEXT,
ADD COLUMN     "originalPostId" UUID,
ADD COLUMN     "preview" TEXT,
ADD COLUMN     "text" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "url" TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT;
