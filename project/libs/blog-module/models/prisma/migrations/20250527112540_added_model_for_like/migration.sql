-- CreateTable
CREATE TABLE "likes" (
    "postId" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("postId","user_id")
);

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
