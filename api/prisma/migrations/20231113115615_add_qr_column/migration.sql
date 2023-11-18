/*
  Warnings:

  - You are about to drop the column `maximum_seat` on the `Period` table. All the data in the column will be lost.
  - You are about to drop the column `available_seat` on the `Route` table. All the data in the column will be lost.
  - Added the required column `available_seat` to the `Period` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qr_code` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Period` DROP COLUMN `maximum_seat`,
    ADD COLUMN `available_seat` INTEGER NOT NULL,
    ALTER COLUMN `reserved_seat` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Route` DROP COLUMN `available_seat`;

-- AlterTable
ALTER TABLE `Ticket` ADD COLUMN `qr_code` VARCHAR(191) NOT NULL,
    ALTER COLUMN `duration` DROP DEFAULT,
    ALTER COLUMN `fare` DROP DEFAULT,
    ALTER COLUMN `identnumber` DROP DEFAULT,
    ALTER COLUMN `note` DROP DEFAULT;
