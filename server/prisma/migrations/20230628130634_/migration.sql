/*
  Warnings:

  - Added the required column `blackmen` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whitemen` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "blackmen" TEXT NOT NULL,
ADD COLUMN     "whitemen" TEXT NOT NULL;
