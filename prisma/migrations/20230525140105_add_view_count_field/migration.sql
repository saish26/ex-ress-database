-- DropIndex
DROP INDEX `Post_authorId_fkey` ON `Post`;

-- AlterTable
ALTER TABLE `Post` ADD COLUMN `viewCount` INTEGER NOT NULL DEFAULT 0;
