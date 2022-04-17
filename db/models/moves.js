const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const moveSchema = new mongoose.Schema({
    id: Number,
    accuracy: Number,
    name: String,
    power: Number,
    pp: Number,
    type: String
});

moveSchema.plugin(mongoosePaginate);

const Move = mongoose.model('Moves', moveSchema);

module.exports = Move;