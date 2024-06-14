-- CreateTable
CREATE TABLE "CountryClub" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CountryClubCostPost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "initiationFee" INTEGER NOT NULL,
    "monthlyDues" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "clubId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CountryClubCostPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CountryClubCostPost_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "CountryClub" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
