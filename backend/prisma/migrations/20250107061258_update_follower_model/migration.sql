/*
  Warnings:

  - The primary key for the `Follower` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_pkey",
ADD CONSTRAINT "Follower_pkey" PRIMARY KEY ("follower_id", "followee_id");
