-- AlterTable
ALTER TABLE "Character" ALTER COLUMN "radius" SET DEFAULT 3;

-- AlterTable
ALTER TABLE "Leaderboard" ADD COLUMN     "timestime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
