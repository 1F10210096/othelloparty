-- CreateTable
CREATE TABLE "UserPoint" (
    "firebaseId" TEXT NOT NULL,
    "userPoint" INTEGER NOT NULL,

    CONSTRAINT "UserPoint_pkey" PRIMARY KEY ("firebaseId","userPoint")
);
