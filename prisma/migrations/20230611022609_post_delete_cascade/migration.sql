-- DropForeignKey
ALTER TABLE `chirp` DROP FOREIGN KEY `Chirp_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Chirp` ADD CONSTRAINT `Chirp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
