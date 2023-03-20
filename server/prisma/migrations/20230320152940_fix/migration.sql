/*
  Warnings:

  - The `offset` column on the `LastState` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "LastState" DROP COLUMN "offset",
ADD COLUMN     "offset" INTEGER[];
