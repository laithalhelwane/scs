-- CreateTable
CREATE TABLE `location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `cityName` VARCHAR(191) NOT NULL,
    `streetName` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `buildingNumber` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `clientUser_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `location_clientUser_id_fkey` FOREIGN KEY (`clientUser_id`) REFERENCES `client`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
