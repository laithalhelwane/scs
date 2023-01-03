/*
  Warnings:

  - You are about to drop the column `phonenumber` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNumber` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `user_phonenumber_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `phonenumber`,
    DROP COLUMN `user_name`,
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `userName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_phoneNumber_key` ON `user`(`phoneNumber`);
