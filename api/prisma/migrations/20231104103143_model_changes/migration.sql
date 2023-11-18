/*
  Warnings:

  - The primary key for the `Ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ref_id` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `Sequence` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[paymentId]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Sequence` DROP FOREIGN KEY `Sequence_periodId_fkey`;

-- AlterTable
ALTER TABLE `Ticket` DROP PRIMARY KEY,
    DROP COLUMN `ref_id`,
    ADD COLUMN `paymentId` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `Sequence`;

-- CreateTable
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `payment_method` VARCHAR(191) NOT NULL,
    `transaction_date` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `transaction_name` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `net` INTEGER NOT NULL,
    `fee` INTEGER NOT NULL,
    `fee_vat` INTEGER NOT NULL,
    `fee_rate` DECIMAL(65, 30) NOT NULL,
    `vat_rate` DECIMAL(65, 30) NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `card_brand` VARCHAR(191) NULL,
    `bank` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Ticket_paymentId_key` ON `Ticket`(`paymentId`);

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
