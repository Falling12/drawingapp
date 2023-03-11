/*
  Warnings:

  - A unique constraint covering the columns `[strokeId]` on the table `Point` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[drawingId]` on the table `Stroke` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Point_strokeId_key" ON "Point"("strokeId");

-- CreateIndex
CREATE UNIQUE INDEX "Stroke_drawingId_key" ON "Stroke"("drawingId");
