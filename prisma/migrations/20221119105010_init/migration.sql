/*
  Warnings:

  - You are about to alter the column `accessToken` on the `session` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `LongText`.

*/
-- AlterTable
ALTER TABLE `session` MODIFY `accessToken` LONGTEXT NOT NULL;
