const Item = require('./models/items');

const getItems = async () => {
    var result = await Item.paginate({}, { page: 1, limit: 10 })
    .then((data) => {
        return { data, success: true };
    }).catch((data) => {
        return { data, success: false };
    });
    return result;
}

module.exports = getItems;