-- CreateTable
CREATE TABLE "post_types" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "post_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "post_types_name_key" ON "post_types"("name");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "post_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
