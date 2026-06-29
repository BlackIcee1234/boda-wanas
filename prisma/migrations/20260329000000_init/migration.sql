-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('YES', 'NO', 'MAYBE');

-- CreateEnum
CREATE TYPE "FoodType" AS ENUM ('NORMAL', 'VEGETARIAN');

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "maxGuests" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rsvp" (
    "id" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,
    "attendance" "AttendanceStatus" NOT NULL,
    "phone" TEXT NOT NULL,
    "companionNames" TEXT,
    "guestCount" INTEGER NOT NULL DEFAULT 1,
    "foodType" "FoodType" NOT NULL DEFAULT 'NORMAL',
    "dietaryRestrictions" TEXT,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rsvp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guest_code_key" ON "Guest"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Rsvp_guestId_key" ON "Rsvp"("guestId");

-- AddForeignKey
ALTER TABLE "Rsvp" ADD CONSTRAINT "Rsvp_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
