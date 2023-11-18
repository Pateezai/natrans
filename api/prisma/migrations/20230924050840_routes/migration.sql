/*
  Warnings:

  - You are about to drop the column `availableSeat` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `origin` on the `Route` table. All the data in the column will be lost.
  - Added the required column `available_seat` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_location` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_location` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Route` DROP COLUMN `availableSeat`,
    DROP COLUMN `destination`,
    DROP COLUMN `origin`,
    ADD COLUMN `available_seat` INTEGER NOT NULL,
    ADD COLUMN `end_location` VARCHAR(191) NOT NULL,
    ADD COLUMN `start_location` VARCHAR(191) NOT NULL;
