const moment = require('moment');
const TimegridDao = require('../dao/timegrid');
const ScheduleDao = require('../dao/schedule');
const { getTimegridStructure } = require('../utils');

const set = async ({ filter, data }) => {
    await TimegridDao.remove({ user_id: filter.user_id });
    await TimegridDao.bulk(data.timegrid);

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
    const timegrid = await TimegridDao.findAll({
        account_id: filter.account_id,
        day: moment(filter.date).day(),
	});

    const schedules = await ScheduleDao.findAll({
		account_id: filter.account_id,
		date: filter.date,
		canceled_at: null
	}, {
		attributes: ['start', 'end'],
		order: [['start', 'ASC']],
	});

    const availableTimegrid = getAvailableSlots(timegrid, meta.service, schedules);

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
                const slotStart = moment(slot.start, timeFormat);
                const slotEnd = moment(slot.end, timeFormat);

                return scheduleStart.isBetween(slotStart, slotEnd, null, '[)');
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
