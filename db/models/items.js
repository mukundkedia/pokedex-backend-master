const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const itemSchema = new mongoose.Schema({
    id: Number,
    name: String
});

itemSchema.plugin(mongoosePaginate);

const Item = mongoose.model('Items', itemSchema);

module.exports = Item;