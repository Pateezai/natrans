/*
  Warnings:

  - Added the required column `duration` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Route` ADD COLUMN `duration` VARCHAR(191) NOT NULL;
