/*
  Warnings:

  - You are about to drop the column `nama` on the `orderStatus` table. All the data in the column will be lost.
  - Added the required column `name` to the `orderStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderStatus` DROP COLUMN `nama`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
