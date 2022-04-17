const Pokemon = require('../db/models/pokemons');
const connect = require('../db/connection');

connect();

const updateDB = async () => {
    await Pokemon.paginate({}, { page: 1, limit: 900 })
    .then(({ docs }) => {
        docs.map((item, index) => {
            var { id } = item;
            Pokemon.update({ id }, {
                image: `/assets/images/${id}.png`,
                thumb: `/assets/thumbnails/${id}.png`,
                sprite: `/assets/sprites/${id}.png`
            })
                .then(() => console.log(`Updated: ${id}`))
                .catch(error => error);
        })
    }).catch(error => {
        console.log(error);
    });
}

updateDB();