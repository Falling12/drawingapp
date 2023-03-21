/*
  Warnings:

  - Made the column `tool` on table `LastState` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "LastState" ALTER COLUMN "tool" SET NOT NULL;
