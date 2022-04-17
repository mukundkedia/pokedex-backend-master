const Pokemon = require('./models/pokemons');

const getPokemon = async (id) => {
    var result = await Pokemon.find({ id })
        .then((data) => {
            return { data, success: true };
        }).catch((data) => {
            return { data, success: false };
        });
    return result;
}

module.exports = getPokemon;