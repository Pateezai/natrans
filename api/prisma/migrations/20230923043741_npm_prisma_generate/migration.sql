/*
  Warnings:

  - You are about to drop the column `end_time` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `travel_date` on the `Route` table. All the data in the column will be lost.
  - Added the required column `available_seat` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Route` DROP COLUMN `end_time`,
    DROP COLUMN `price`,
    DROP COLUMN `start_time`,
    DROP COLUMN `travel_date`,
    ADD COLUMN `available_seat` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Date` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date_string` VARCHAR(191) NOT NULL,
    `routeId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Period` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `desc` VARCHAR(191) NOT NULL,
    `start_times` VARCHAR(191) NOT NULL,
    `end_times` VARCHAR(191) NOT NULL,
    `date_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Date` ADD CONSTRAINT `Date_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Route`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Period` ADD CONSTRAINT `Period_date_id_fkey` FOREIGN KEY (`date_id`) REFERENCES `Date`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
