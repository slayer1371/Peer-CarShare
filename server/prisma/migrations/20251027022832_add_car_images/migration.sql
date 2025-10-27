-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "description" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];
