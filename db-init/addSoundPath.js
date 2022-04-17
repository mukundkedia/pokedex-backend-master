const Pokemon = require('../db/models/pokemons');
const connect = require('../db/connection');

connect();

const updateDB = async () => {
    await Pokemon.paginate({}, { page: 1, limit: 900 })
    .then(({ docs }) => {
        docs.map((item, index) => {
            var { id, name } = item;
            if (name === 'Nidoran♂')
                name = 'nidoranm';
            else if (name === 'Nidoran♀')
                name = 'nidoranf';
            Pokemon.update({ id }, {
                cry: `/assets/cries/${name.toLowerCase()}.mp3`,
            })
                .then(() => console.log(`Updated: ${id}`))
                .catch(error => error);
        })
    }).catch(error => {
        console.log(error);
    });
}

updateDB();