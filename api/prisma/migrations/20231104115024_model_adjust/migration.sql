/*
  Warnings:

  - You are about to drop the column `name` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `transaction_id` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_status` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `p_name` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Payment` DROP COLUMN `name`,
    DROP COLUMN `status`,
    ADD COLUMN `name_oncard` VARCHAR(191) NULL,
    ADD COLUMN `transaction_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `transaction_status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `name`,
    ADD COLUMN `p_name` VARCHAR(191) NOT NULL;
