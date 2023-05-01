/*
  Warnings:

  - You are about to drop the column `serviceTypeId` on the `Service` table. All the data in the column will be lost.
  - Added the required column `serviceName` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "subtext" TEXT NOT NULL,
    "serviceDescription" TEXT NOT NULL,
    "serviceFiller" TEXT NOT NULL,
    "serviceCta" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "serviceName" TEXT NOT NULL,
    CONSTRAINT "Service_serviceName_fkey" FOREIGN KEY ("serviceName") REFERENCES "ServiceType" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Service" ("createdAt", "id", "image", "serviceCta", "serviceDescription", "serviceFiller", "subtext", "title", "updatedAt") SELECT "createdAt", "id", "image", "serviceCta", "serviceDescription", "serviceFiller", "subtext", "title", "updatedAt" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
CREATE UNIQUE INDEX "Service_title_key" ON "Service"("title");
CREATE TABLE "new_ServiceImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "serviceId" TEXT,
    CONSTRAINT "ServiceImage_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ServiceImage" ("createdAt", "id", "image", "name", "serviceId", "updatedAt") SELECT "createdAt", "id", "image", "name", "serviceId", "updatedAt" FROM "ServiceImage";
DROP TABLE "ServiceImage";
ALTER TABLE "new_ServiceImage" RENAME TO "ServiceImage";
CREATE UNIQUE INDEX "ServiceImage_name_key" ON "ServiceImage"("name");
CREATE TABLE "new_Blog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "blogBody" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Blog" ("blogBody", "createdAt", "id", "image", "title", "updatedAt", "userId") SELECT "blogBody", "createdAt", "id", "image", "title", "updatedAt", "userId" FROM "Blog";
DROP TABLE "Blog";
ALTER TABLE "new_Blog" RENAME TO "Blog";
CREATE UNIQUE INDEX "Blog_title_key" ON "Blog"("title");
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "projectBody" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "serviceId" TEXT NOT NULL,
    CONSTRAINT "Project_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("createdAt", "id", "image", "projectBody", "serviceId", "title", "updatedAt") SELECT "createdAt", "id", "image", "projectBody", "serviceId", "title", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_title_key" ON "Project"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
