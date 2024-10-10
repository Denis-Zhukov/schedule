import {DayOfWeek, PrismaClient, Subclass} from "@prisma/client";
import callSchedules from './contants/call-schedule.json';
import teachers from './contants/teachers.json';
import classesData from './contants/classes.json';
import subclassesData from './contants/subclasses.json';
import scheduleData from './contants/schedule.json';
import classroomsData from './contants/classrooms.json';

const prisma = new PrismaClient();

async function main() {
    const classes = await prisma.class.createManyAndReturn({
        data: classesData.map(name => ({name})),
        skipDuplicates: true
    });

    const subclasses = await prisma.subclass.createManyAndReturn({
        data: subclassesData.map(name => ({name})),
        skipDuplicates: true
    });

    for (const teacher of teachers) {
        await prisma.teacher.upsert({
            where: ({id: teacher.id}),
            create: teacher,
            update: teacher
        })
    }

    const classrooms = await prisma.classroom.createManyAndReturn({
        data: classroomsData.map(name => ({name})),
        skipDuplicates: true
    });

    //Расписание звонков добавляем для классов
    for (const [key, value] of Object.entries(callSchedules)) {
        const classesPerSchedule = key.split(',');

        const lessons = value.map(({lessonNumber, startTime, endTime}) => ({
                lessonNumber,
                startTime,
                endTime
            }
        ))

        const callSchedule = await prisma.callSchedule.createManyAndReturn({data: lessons});

        const relation = classesPerSchedule.map(($class) => {
            const {id: classId} = classes.find(({name}) => name === $class)!;
            return callSchedule.map(({id: callScheduleId}) => ({classId, callScheduleId}))
        }).flat();

        await prisma.classCallSchedule.createMany({data: relation});
    }

    await Promise.all(scheduleData.map(async ({
                                                  class: $class,
                                                  subclass,
                                                  classroom,
                                                  teacherId,
                                                  dayOfWeek,
                                                  timeStart,
                                                  timeEnd,
                                                  canteen,
                                                  leave
                                              }) => {
        const {id: classId} = classes.find(({name}) => name === $class)!;
        const {id: subclassId} = subclasses.find(({name}) => name === subclass)!;
        const classroomObj = classrooms.find(({name}) => name === classroom);

        timeStart = `1970-01-01T${timeStart}:00+03:00`;
        timeEnd = `1970-01-01T${timeEnd}:00+03:00`;

        const {id: scheduleId} = await prisma.schedule.create({
            data: {
                dayOfWeek: dayOfWeek as DayOfWeek,
                classId,
                subclassId,
                teacherId,
                timeStart,
                timeEnd,
                classroomId: classroomObj?.id
            },
        });

        if (canteen) {
            await prisma.canteenSchedule.create({data: {scheduleId}})
        }

        if (leave) {
            await prisma.leaveSchedule.create({data: {scheduleId}})
        }
    }));


    console.log('Database has been seeded.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
