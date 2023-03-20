/*
  Warnings:

  - A unique constraint covering the columns `[lastStateId]` on the table `Drawing` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Drawing" ADD COLUMN     "lastStateId" INTEGER;

-- CreateTable
CREATE TABLE "LastState" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "drawingId" INTEGER,
    "offset" INTEGER NOT NULL,
    "scale" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LastState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Drawing_lastStateId_key" ON "Drawing"("lastStateId");

-- AddForeignKey
ALTER TABLE "Drawing" ADD CONSTRAINT "Drawing_lastStateId_fkey" FOREIGN KEY ("lastStateId") REFERENCES "LastState"("id") ON DELETE CASCADE ON UPDATE CASCADE;
