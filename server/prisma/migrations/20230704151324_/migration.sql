/*
  Warnings:

  - The primary key for the `UserPoint` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `firebaseId` on the `UserPoint` table. All the data in the column will be lost.
  - Added the required column `userId` to the `UserPoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserPoint" DROP CONSTRAINT "UserPoint_pkey",
DROP COLUMN "firebaseId",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "UserPoint_pkey" PRIMARY KEY ("userId", "userPoint");
