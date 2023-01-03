/*
  Warnings:

  - You are about to drop the column `orderStatusId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `_order_detailsToservice_variety` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_details` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_order_detailsToservice_variety` DROP FOREIGN KEY `_order_detailsToservice_variety_A_fkey`;

-- DropForeignKey
ALTER TABLE `_order_detailsToservice_variety` DROP FOREIGN KEY `_order_detailsToservice_variety_B_fkey`;

-- DropForeignKey
ALTER TABLE `order_details` DROP FOREIGN KEY `order_details_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `order_details` DROP FOREIGN KEY `order_details_serviceId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `orderStatusId`;

-- DropTable
DROP TABLE `_order_detailsToservice_variety`;

-- DropTable
DROP TABLE `order_details`;

-- CreateTable
CREATE TABLE `order_service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_service_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_serviceId` INTEGER NOT NULL,
    `service_varietyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order_service` ADD CONSTRAINT `order_service_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_service` ADD CONSTRAINT `order_service_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_service_detail` ADD CONSTRAINT `order_service_detail_order_serviceId_fkey` FOREIGN KEY (`order_serviceId`) REFERENCES `order_service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_service_detail` ADD CONSTRAINT `order_service_detail_service_varietyId_fkey` FOREIGN KEY (`service_varietyId`) REFERENCES `service_variety`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
