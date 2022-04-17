const fs = require('fs');
const connect = require('../db/connection');
const Pokemon = require('../db/models/pokemons');
const Item = require('../db/models/items');
const Type = require('../db/models/types');
const Move = require('../db/models/moves');

connect();

const writeJson = async () => {
    await Pokemon.find({})
        .then(async data => {
            var json = await JSON.stringify(data);
            fs.writeFile('assets/completedb/pokemons.json', json, 'utf8', () => {console.log('done')});
        })
        .catch(error => console.log(error));
    await Item.find({})
        .then(async data => {
            var json = await JSON.stringify(data);
            fs.writeFile('assets/completedb/items.json', json, 'utf8', () => {console.log('done')});
        })
        .catch(error => console.log(error));
    await Type.find({})
        .then(async data => {
            var json = await JSON.stringify(data);
            fs.writeFile('assets/completedb/types.json', json, 'utf8', () => {console.log('done')});
        })
        .catch(error => console.log(error));
    await Move.find({})
        .then(async data => {
            var json = await JSON.stringify(data);
            fs.writeFile('assets/completedb/moves.json', json, 'utf8', () => {console.log('done')});
        })
        .catch(error => console.log(error));
}

writeJson();