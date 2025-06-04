-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "tagId" UUID;

-- CreateTable
CREATE TABLE "tags" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE SET NULL ON UPDATE CASCADE;
