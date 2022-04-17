const Type = require('./models/types');

const getTypes = async () => {
    var result = await Type.paginate({}, { page: 1, limit: 100 })
    .then((data) => {
        return { data, success: true };
    })
    .catch((data) => {
        return { data, success: false };
    });
    return result;
}

module.exports = getTypes;