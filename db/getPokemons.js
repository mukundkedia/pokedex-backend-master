const Pokemon = require('./models/pokemons');

const getPokemons = async (page) => {
    var result = await Pokemon.paginate({}, { page, limit: 12, sort: 'id', select: 'id name type image thumb sprites' })
    .then((data) => {
        return { data, success: true };
    }).catch((data) => {
        return { data, success: false };
    });
    return result;
}

module.exports = getPokemons;