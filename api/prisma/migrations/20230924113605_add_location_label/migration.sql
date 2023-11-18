/*
  Warnings:

  - Added the required column `label` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Location` ADD COLUMN `label` VARCHAR(191) NOT NULL;
