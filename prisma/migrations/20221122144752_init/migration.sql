-- AlterTable
ALTER TABLE `order` MODIFY `orderStatusId` INTEGER NULL,
    MODIFY `orderdStatus` ENUM('wating', 'ok') NULL DEFAULT 'wating';
