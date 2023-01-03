/*
  Warnings:

  - You are about to drop the column `orderId` on the `order_service_detail` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `order_service_detail` DROP FOREIGN KEY `order_service_detail_orderId_fkey`;

-- AlterTable
ALTER TABLE `order_service_detail` DROP COLUMN `orderId`;
