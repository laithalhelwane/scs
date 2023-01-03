-- CreateTable
CREATE TABLE `order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `clientUser_id` INTEGER NOT NULL,
    `ownerUser_id` INTEGER NOT NULL,
    `orderStatusId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_clientUser_id_fkey` FOREIGN KEY (`clientUser_id`) REFERENCES `client`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_ownerUser_id_fkey` FOREIGN KEY (`ownerUser_id`) REFERENCES `owner`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_orderStatusId_fkey` FOREIGN KEY (`orderStatusId`) REFERENCES `orderStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
