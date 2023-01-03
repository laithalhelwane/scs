/*
  Warnings:

  - You are about to drop the `orderStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_orderStatusId_fkey`;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `orderdStatus` ENUM('wating', 'ok') NOT NULL DEFAULT 'wating';

-- DropTable
DROP TABLE `orderStatus`;
