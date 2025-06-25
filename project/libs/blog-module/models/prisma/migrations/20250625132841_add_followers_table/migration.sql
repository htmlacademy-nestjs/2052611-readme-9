-- CreateTable
CREATE TABLE "followers" (
    "user_id" TEXT NOT NULL,
    "following_user_id" TEXT NOT NULL,

    CONSTRAINT "followers_pkey" PRIMARY KEY ("user_id","following_user_id")
);
