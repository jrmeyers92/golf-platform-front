-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CountryClub" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL DEFAULT 'Default Address',
    "phoneNumber" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "CountryClub_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CountryClub" ("authorId", "city", "createdAt", "id", "name", "state", "updatedAt", "zipCode") SELECT "authorId", "city", "createdAt", "id", "name", "state", "updatedAt", "zipCode" FROM "CountryClub";
DROP TABLE "CountryClub";
ALTER TABLE "new_CountryClub" RENAME TO "CountryClub";
PRAGMA foreign_key_check("CountryClub");
PRAGMA foreign_keys=ON;
