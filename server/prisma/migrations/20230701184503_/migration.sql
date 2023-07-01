/*
  Warnings:

  - Added the required column `blackname` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whitename` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "blackname" TEXT NOT NULL,
ADD COLUMN     "whitename" TEXT NOT NULL;
