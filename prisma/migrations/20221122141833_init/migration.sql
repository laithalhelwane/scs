/*
  Warnings:

  - Made the column `serviceId` on table `service_variety` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `service_variety` DROP FOREIGN KEY `service_variety_serviceId_fkey`;

-- AlterTable
ALTER TABLE `service_variety` MODIFY `serviceId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `order_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceId` INTEGER NOT NULL,
    `orderId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_order_detailsToservice_variety` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_order_detailsToservice_variety_AB_unique`(`A`, `B`),
    INDEX `_order_detailsToservice_variety_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `service_variety` ADD CONSTRAINT `service_variety_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_order_detailsToservice_variety` ADD CONSTRAINT `_order_detailsToservice_variety_A_fkey` FOREIGN KEY (`A`) REFERENCES `order_details`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_order_detailsToservice_variety` ADD CONSTRAINT `_order_detailsToservice_variety_B_fkey` FOREIGN KEY (`B`) REFERENCES `service_variety`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
