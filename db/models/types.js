const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const typeSchema = new mongoose.Schema({
    id: Number,
    name: String
});

typeSchema.plugin(mongoosePaginate);

const Type = mongoose.model('Types', typeSchema);

module.exports = Type;