/*
  Warnings:

  - Added the required column `quantity` to the `order_service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order_service` ADD COLUMN `quantity` INTEGER NOT NULL;
