/*
  Warnings:

  - Added the required column `ownerUser_id` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `service` ADD COLUMN `ownerUser_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_ownerUser_id_fkey` FOREIGN KEY (`ownerUser_id`) REFERENCES `owner`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
