-- CreateTable
CREATE TABLE `favorite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientUser_id` INTEGER NOT NULL,
    `ownerUser_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `favorite_clientUser_id_ownerUser_id_key`(`clientUser_id`, `ownerUser_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `favorite` ADD CONSTRAINT `favorite_clientUser_id_fkey` FOREIGN KEY (`clientUser_id`) REFERENCES `client`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorite` ADD CONSTRAINT `favorite_ownerUser_id_fkey` FOREIGN KEY (`ownerUser_id`) REFERENCES `owner`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
