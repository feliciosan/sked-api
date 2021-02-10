const moment = require('moment');
const TimegridDao = require('../dao/timegrid');
const ScheduleLockDao = require('../dao/schedule-lock');
const ScheduleDao = require('../dao/schedule');
const { getTimegridStructure } = require('../utils');

const set = async ({ filter, data, transaction }) => {
    await TimegridDao.remove({
		user_id: filter.user_id
	}, { transaction });

    await TimegridDao.bulk(data.timegrid, { transaction });

    return true;
};

const findAll = async ({ filter }) => {
    const timegridData = await TimegridDao.findAll(filter);
    const timegrid = getTimegridStructure();

    timegridData.forEach((item) => {
        timegrid[item.day].push(item);
    });

    return { timegrid };
};

const findByDay = async ({ filter, meta }) => {
	const timegridFilter = {
		account_id: filter.account_id,
		user_id: filter.user_id,
		day: moment(filter.date).day(),
	};
	const schedulesFilter = {
		account_id: filter.account_id,
		user_id: filter.user_id,
		date: filter.date,
		canceled_at: null
	};
	const schedulesLockFilter = {
		account_id: filter.account_id,
		user_id: filter.user_id,
		date: filter.date,
	};

    const timegridPromise = TimegridDao.findAll(timegridFilter);
    const scheduleLockPromise = ScheduleLockDao.findAll(schedulesLockFilter, {
		attributes: ['start', 'end'],
		order: [['start', 'ASC']],
	});
    const schedulesPromise = ScheduleDao.findAll(schedulesFilter, {
		attributes: ['start', 'end'],
		order: [['start', 'ASC']],
	});

	const [timegridData, schedulesData, scheduleLockData] = await Promise.all([timegridPromise, schedulesPromise, scheduleLockPromise]);
	const availableTimegrid = getAvailableSlots(timegridData, meta.service, [...scheduleLockData, ...schedulesData]);

    return { available_timegrid: availableTimegrid };
};

const getAvailableSlots = (timegrid, service, schedules) => {
    const timeFormat = 'HH:mm:ss';
    const generatedSlots = [];

    timegrid.forEach((grid) => {
        const { start, end } = grid;
        const startTime = moment(start, timeFormat);
        const endTime = moment(end, timeFormat);

        if (endTime.isBefore(startTime)) {
            endTime.add(1, 'day');
        }

        while (startTime < endTime) {
            const slot = {
                service_id: service.id,
                start: moment(startTime).format(timeFormat),
                end: moment(startTime).add(service.duration, 'minutes').format(timeFormat),
            };

            const unavailableSlot = schedules.find((schedule) => {
                const scheduleStart = moment(schedule.start, timeFormat);
                const scheduleEnd = moment(schedule.end, timeFormat);
                const slotStart = moment(slot.start, timeFormat);
                const slotEnd = moment(slot.end, timeFormat);

                return scheduleStart.isBetween(slotStart, slotEnd, null, '[)') || scheduleEnd.isBetween(slotStart, slotEnd, null, '(]');
            });

            if (unavailableSlot) {
                startTime.set({
                    hour: unavailableSlot.end.slice(0, 2),
                    minute: unavailableSlot.end.slice(3, 5),
                });
            } else {
                startTime.add(service.duration, 'minutes');

                if (startTime.isAfter(endTime)) {
                    break;
                }

                generatedSlots.push(slot);
            }
        }
    });

    return generatedSlots;
};

module.exports = {
    set: set,
    findAll: findAll,
    findByDay: findByDay,
};
