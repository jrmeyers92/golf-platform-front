-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthYear" INTEGER,
    "birthMonth" INTEGER,
    "birthDay" INTEGER,
    "handicap" REAL,
    "gender" TEXT,
    "city" TEXT NOT NULL DEFAULT 'San Francisco',
    "state" TEXT NOT NULL DEFAULT 'CA',
    "zipCode" INTEGER NOT NULL DEFAULT 94110,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("birthDay", "birthMonth", "birthYear", "clerkId", "createdAt", "email", "firstName", "gender", "handicap", "id", "lastName", "updatedAt") SELECT "birthDay", "birthMonth", "birthYear", "clerkId", "createdAt", "email", "firstName", "gender", "handicap", "id", "lastName", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check("User");
PRAGMA foreign_keys=ON;
