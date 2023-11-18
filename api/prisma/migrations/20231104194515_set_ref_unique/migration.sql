/*
  Warnings:

  - A unique constraint covering the columns `[ref_id]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Ticket_ref_id_key` ON `Ticket`(`ref_id`);
