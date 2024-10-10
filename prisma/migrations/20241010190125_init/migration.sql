-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "Shift" AS ENUM ('FIRST', 'SECOND');

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "surname" TEXT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "teacher_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "id" SERIAL NOT NULL,
    "surname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "patronymic" TEXT NOT NULL,
    "telegram_id" TEXT,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subclasses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "subclasses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classrooms" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "classrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule" (
    "id" SERIAL NOT NULL,
    "day_of_week" "DayOfWeek" NOT NULL,
    "class_id" INTEGER NOT NULL,
    "subclass_id" INTEGER,
    "teacher_id" INTEGER NOT NULL,
    "time_start" TIMESTAMP(3) NOT NULL,
    "time_end" TIMESTAMP(3) NOT NULL,
    "classroom_id" INTEGER,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "canteen_schedule" (
    "id" SERIAL NOT NULL,
    "scheduleId" INTEGER NOT NULL,

    CONSTRAINT "canteen_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leave_schedule" (
    "id" SERIAL NOT NULL,
    "scheduleId" INTEGER NOT NULL,

    CONSTRAINT "leave_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson" (
    "id" SERIAL NOT NULL,
    "lesson_number" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_call_schedule" (
    "class_id" INTEGER NOT NULL,
    "call_schedule_id" INTEGER NOT NULL,

    CONSTRAINT "class_call_schedule_pkey" PRIMARY KEY ("class_id","call_schedule_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "classes_name_key" ON "classes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "subclasses_name_key" ON "subclasses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "classrooms_name_key" ON "classrooms"("name");

-- CreateIndex
CREATE UNIQUE INDEX "schedule_day_of_week_class_id_subclass_id_teacher_id_time_e_key" ON "schedule"("day_of_week", "class_id", "subclass_id", "teacher_id", "time_end", "time_start", "classroom_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_subclass_id_fkey" FOREIGN KEY ("subclass_id") REFERENCES "subclasses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canteen_schedule" ADD CONSTRAINT "canteen_schedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leave_schedule" ADD CONSTRAINT "leave_schedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_call_schedule" ADD CONSTRAINT "class_call_schedule_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_call_schedule" ADD CONSTRAINT "class_call_schedule_call_schedule_id_fkey" FOREIGN KEY ("call_schedule_id") REFERENCES "lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
