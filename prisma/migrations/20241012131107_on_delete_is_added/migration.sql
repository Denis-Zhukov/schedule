-- DropForeignKey
ALTER TABLE "canteen_schedule" DROP CONSTRAINT "canteen_schedule_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "class_call_schedule" DROP CONSTRAINT "class_call_schedule_call_schedule_id_fkey";

-- DropForeignKey
ALTER TABLE "class_call_schedule" DROP CONSTRAINT "class_call_schedule_class_id_fkey";

-- DropForeignKey
ALTER TABLE "leave_schedule" DROP CONSTRAINT "leave_schedule_scheduleId_fkey";

-- DropEnum
DROP TYPE "Shift";

-- AddForeignKey
ALTER TABLE "canteen_schedule" ADD CONSTRAINT "canteen_schedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leave_schedule" ADD CONSTRAINT "leave_schedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_call_schedule" ADD CONSTRAINT "class_call_schedule_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_call_schedule" ADD CONSTRAINT "class_call_schedule_call_schedule_id_fkey" FOREIGN KEY ("call_schedule_id") REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
