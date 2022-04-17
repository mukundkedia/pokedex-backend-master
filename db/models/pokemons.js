const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.Promise = global.Promise;

const baseSchema = new mongoose.Schema({
    hp: Number,
    attack: Number,
    defense: Number,
    sp_attack: Number,
    sp_defense: Number,
    speed: Number
});

const physicalSchema = new mongoose.Schema({
    height: String,
    weight: String,
    gender: String,
    category: String,
    abilities: [String]
})

const pokemonSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: [[String]],
    base: [baseSchema],
    xText: [String],
    yText: [String],
    forms: [String],
    physical: [physicalSchema],
    weakness: [[String]],
    sprite: String,
    thumb: String,
    image: String,
    cry: String
});

pokemonSchema.plugin(mongoosePaginate);

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;