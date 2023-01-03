-- CreateTable
CREATE TABLE `orderDelivery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deliveryUserId` INTEGER NULL,
    `orderId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orderDelivery` ADD CONSTRAINT `orderDelivery_deliveryUserId_fkey` FOREIGN KEY (`deliveryUserId`) REFERENCES `delivery`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderDelivery` ADD CONSTRAINT `orderDelivery_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
