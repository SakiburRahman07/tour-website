-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'OTHERS',
ADD COLUMN     "note" TEXT;
