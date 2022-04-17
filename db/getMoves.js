const Move = require('./models/moves');

const getMoves = async () => {
    var result = await Move.paginate({}, { page: 1, limit: 100 })
    .then((data) => {
        return { data, success: true };
    })
    .catch((data) => {
        return { data, success: false };
    });
    return result;
}

module.exports = getMoves;