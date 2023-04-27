-- RedefineTables
PRAGMA foreign_keys=OFF;
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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
