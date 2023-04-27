/*
  Warnings:

  - You are about to drop the column `name` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ServiceType` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Testimony` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ServiceImage` table. All the data in the column will be lost.
  - Added the required column `title` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `ServiceType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Testimony` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `ServiceImage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Tag" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE UNIQUE INDEX "Tag_title_key" ON "Tag"("title");
CREATE TABLE "new_ServiceType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ServiceType" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "ServiceType";
DROP TABLE "ServiceType";
ALTER TABLE "new_ServiceType" RENAME TO "ServiceType";
CREATE UNIQUE INDEX "ServiceType_title_key" ON "ServiceType"("title");
CREATE TABLE "new_Testimony" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "testimonyBody" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "serviceTypeId" TEXT NOT NULL,
    CONSTRAINT "Testimony_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "ServiceType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Testimony" ("createdAt", "id", "image", "serviceTypeId", "testimonyBody", "updatedAt") SELECT "createdAt", "id", "image", "serviceTypeId", "testimonyBody", "updatedAt" FROM "Testimony";
DROP TABLE "Testimony";
ALTER TABLE "new_Testimony" RENAME TO "Testimony";
CREATE UNIQUE INDEX "Testimony_title_key" ON "Testimony"("title");
CREATE TABLE "new_Business" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Business" ("address", "createdAt", "email", "id", "logo", "phone", "updatedAt") SELECT "address", "createdAt", "email", "id", "logo", "phone", "updatedAt" FROM "Business";
DROP TABLE "Business";
ALTER TABLE "new_Business" RENAME TO "Business";
CREATE UNIQUE INDEX "Business_title_key" ON "Business"("title");
CREATE TABLE "new_ServiceImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "serviceId" TEXT,
    CONSTRAINT "ServiceImage_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ServiceImage" ("createdAt", "id", "image", "serviceId", "updatedAt") SELECT "createdAt", "id", "image", "serviceId", "updatedAt" FROM "ServiceImage";
DROP TABLE "ServiceImage";
ALTER TABLE "new_ServiceImage" RENAME TO "ServiceImage";
CREATE UNIQUE INDEX "ServiceImage_title_key" ON "ServiceImage"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
