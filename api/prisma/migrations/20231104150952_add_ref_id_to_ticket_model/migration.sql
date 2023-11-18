/*
  Warnings:

  - Added the required column `ref_id` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ticket` ADD COLUMN `ref_id` VARCHAR(191) NOT NULL;
