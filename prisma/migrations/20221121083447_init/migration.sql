/*
  Warnings:

  - Made the column `clientUser_id` on table `location` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `location` DROP FOREIGN KEY `location_clientUser_id_fkey`;

-- AlterTable
ALTER TABLE `location` MODIFY `clientUser_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `location_clientUser_id_fkey` FOREIGN KEY (`clientUser_id`) REFERENCES `client`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
