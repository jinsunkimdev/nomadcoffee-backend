-- AlterTable
ALTER TABLE "user" ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "avatarURL" DROP NOT NULL,
ALTER COLUMN "githubUsername" DROP NOT NULL;
