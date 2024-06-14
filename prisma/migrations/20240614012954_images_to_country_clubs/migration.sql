-- CreateTable
CREATE TABLE "File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT NOT NULL,
    "countryClubId" INTEGER,
    CONSTRAINT "File_countryClubId_fkey" FOREIGN KEY ("countryClubId") REFERENCES "CountryClub" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CountryClub" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "CountryClub_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CountryClub" ("address", "authorId", "city", "createdAt", "id", "name", "phoneNumber", "state", "updatedAt", "zipCode") SELECT "address", "authorId", "city", "createdAt", "id", "name", "phoneNumber", "state", "updatedAt", "zipCode" FROM "CountryClub";
DROP TABLE "CountryClub";
ALTER TABLE "new_CountryClub" RENAME TO "CountryClub";
PRAGMA foreign_key_check("CountryClub");
PRAGMA foreign_keys=ON;
