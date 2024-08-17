/*
  Warnings:

  - You are about to drop the column `timestime` on the `Leaderboard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Leaderboard" DROP COLUMN "timestime",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
