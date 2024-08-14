/*
  Warnings:

  - You are about to drop the column `timestamp` on the `Leaderboard` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Leaderboard" DROP COLUMN "timestamp",
ADD COLUMN     "duration" INTEGER NOT NULL;
