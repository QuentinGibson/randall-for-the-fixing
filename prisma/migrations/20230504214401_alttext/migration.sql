/*
  Warnings:

  - You are about to drop the column `image` on the `Testimony` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ServiceImage` table. All the data in the column will be lost.
  - Added the required column `altText` to the `ServiceImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN "icon" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Testimony" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "testimonyBody" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "serviceTypeId" TEXT NOT NULL,
    CONSTRAINT "Testimony_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "ServiceType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Testimony" ("createdAt", "id", "name", "serviceTypeId", "testimonyBody", "updatedAt") SELECT "createdAt", "id", "name", "serviceTypeId", "testimonyBody", "updatedAt" FROM "Testimony";
DROP TABLE "Testimony";
ALTER TABLE "new_Testimony" RENAME TO "Testimony";
CREATE UNIQUE INDEX "Testimony_name_key" ON "Testimony"("name");
CREATE TABLE "new_ServiceImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "altText" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "serviceId" TEXT,
    CONSTRAINT "ServiceImage_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ServiceImage" ("createdAt", "id", "image", "serviceId", "updatedAt") SELECT "createdAt", "id", "image", "serviceId", "updatedAt" FROM "ServiceImage";
DROP TABLE "ServiceImage";
ALTER TABLE "new_ServiceImage" RENAME TO "ServiceImage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
