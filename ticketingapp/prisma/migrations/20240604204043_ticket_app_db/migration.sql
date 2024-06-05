/*
  Warnings:

  - You are about to drop the column `statue` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `statue`,
    ADD COLUMN `status` ENUM('OPEN', 'STARTED', 'CLOSED') NOT NULL DEFAULT 'OPEN';
