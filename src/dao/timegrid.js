const sequelize = require('../db');
const Timegrid = sequelize.model('timegrid');

const bulk = (data) => {
    return Timegrid.bulkCreate(data);
};

const remove = (filter) => {
    return Timegrid.destroy({
        where: filter,
    });
};

const findAll = (filter) => {
    return Timegrid.findAll({
        where: filter,
        attributes: ['day', 'start', 'end'],
        order: [['start', 'ASC']],
        raw: true,
    });
};

module.exports = {
    bulk,
    remove,
    findAll,
};
