/*
  Warnings:

  - You are about to drop the column `date_id` on the `Period` table. All the data in the column will be lost.
  - You are about to drop the column `end_times` on the `Period` table. All the data in the column will be lost.
  - You are about to drop the column `start_times` on the `Period` table. All the data in the column will be lost.
  - You are about to drop the column `available_seat` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `end_location` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `start_location` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the `Date` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endTime` to the `Period` table without a default value. This is not possible if the table is not empty.
  - Added the required column `routeId` to the `Period` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Period` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availableSeat` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fare` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Date` DROP FOREIGN KEY `Date_routeId_fkey`;

-- DropForeignKey
ALTER TABLE `Period` DROP FOREIGN KEY `Period_date_id_fkey`;

-- AlterTable
ALTER TABLE `Period` DROP COLUMN `date_id`,
    DROP COLUMN `end_times`,
    DROP COLUMN `start_times`,
    ADD COLUMN `endTime` VARCHAR(191) NOT NULL,
    ADD COLUMN `routeId` INTEGER NOT NULL,
    ADD COLUMN `startTime` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Route` DROP COLUMN `available_seat`,
    DROP COLUMN `end_location`,
    DROP COLUMN `start_location`,
    ADD COLUMN `availableSeat` INTEGER NOT NULL,
    ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `destination` VARCHAR(191) NOT NULL,
    ADD COLUMN `fare` INTEGER NOT NULL,
    ADD COLUMN `origin` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Date`;

-- CreateIndex
CREATE INDEX `routeId` ON `Period`(`routeId`);

-- AddForeignKey
ALTER TABLE `Period` ADD CONSTRAINT `Period_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Route`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
