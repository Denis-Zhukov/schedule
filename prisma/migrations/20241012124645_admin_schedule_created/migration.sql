-- DropForeignKey
ALTER TABLE "canteen_schedule" DROP CONSTRAINT "canteen_schedule_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "class_call_schedule" DROP CONSTRAINT "class_call_schedule_call_schedule_id_fkey";

-- DropForeignKey
ALTER TABLE "class_call_schedule" DROP CONSTRAINT "class_call_schedule_class_id_fkey";

-- DropForeignKey
ALTER TABLE "leave_schedule" DROP CONSTRAINT "leave_schedule_scheduleId_fkey";

-- CreateTable
CREATE TABLE "admins" (
    "id" INTEGER NOT NULL,
    "surname" TEXT,
    "name" TEXT NOT NULL,
    "username" TEXT,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_schedule" (
    "id" SERIAL NOT NULL,
    "day_of_week" "DayOfWeek" NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "shift" "Shift" NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "canteen_schedule" ADD CONSTRAINT "canteen_schedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leave_schedule" ADD CONSTRAINT "leave_schedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_call_schedule" ADD CONSTRAINT "class_call_schedule_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_call_schedule" ADD CONSTRAINT "class_call_schedule_call_schedule_id_fkey" FOREIGN KEY ("call_schedule_id") REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_schedule" ADD CONSTRAINT "admin_schedule_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;
