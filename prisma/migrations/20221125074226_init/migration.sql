-- CreateTable
CREATE TABLE `delivery` (
    `userId` INTEGER NOT NULL,
    `relativePhNumber` VARCHAR(191) NOT NULL,
    `relativeType` VARCHAR(191) NOT NULL,
    `residentLocation` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `vehicleType` VARCHAR(191) NOT NULL,
    `vehicleColor` VARCHAR(191) NOT NULL,
    `vehicleNumber` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `delivery_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `delivery_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
