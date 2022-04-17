/*
This file was used to store the initial database to the mongo database,
Do not run this
*/


const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Pokemon = require('../db/models/pokemons');
const scraper = require('../scraper');
const connect = require('../db/connection');
mongoose.Promise = global.Promise;

connect();


const countUnsaved = async() => {
    var arr = [];
    for(var i = 1; i <= 809; i++) {
        await Pokemon.find({ id: i })
            .then(data => {
                if(data.length === 0)
                    arr.push(i);
            })
            .catch(error => console.log(error))
    }
    return arr;
}

//Cluster 1 to initialize Pokemons

const save = async () => {
    var searchArray = await countUnsaved();
    console.log('Total Unsaved: ',searchArray.length)
    const pokejson = await JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/pokedex.json')));
    for(i = 0; i < searchArray.length; i++) {
        var { name, id } = pokejson[searchArray[i]-1];
        await scraper(id)
            .then(({ type, xText, yText, physical, weakness, forms, base }) => {
                var pok = new Pokemon({
                    name: name.english,
                    type,
                    id,
                    base,
                    forms,
                    xText,
                    yText,
                    physical,
                    weakness,
                    image: `/assets/images/${id}.png`,
                    thumb: `/assets/thumbnails/${id}.png`,
                    sprite: `/assets/sprites/${id}.png`
                });
                pok.save()
                    .then(() => console.log(`Saved ${searchArray[i]}`))
                    .catch(error => console.log(error));
            })
            .catch(() => {
                console.log(`Unsaved: ${searchArray[i]}`);
            })
    }
    console.log('finished');
}

save();

/*
//Cluster 2 to initialize Moves/Skills
const movesJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/skills.json')));
const moveSchema = new mongoose.Schema({
    id: Number,
    accuracy: Number,
    name: String,
    power: Number,
    pp: Number,
    type: String
});

const Move = mongoose.model('Moves', moveSchema);
var i = 0;
movesJson.map((data, index) => {
    var { accuracy, id, ename, power, pp, type } = data;
    var mov = new Move({
        id,
        accuracy,
        name: ename,
        power,
        pp,
        type
    });
    mov.save()
        .then(() => console.log(`Saved: ${++i}`))
        .catch(error => console.log(error));
});

//Cluster 3 for Types
const typeJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/types.json')));
var i = 0;
const typeSchema = new mongoose.Schema({
    id: Number,
    name: String
});

const Type = mongoose.model('Types', typeSchema);

typeJson.map((data, index) => {
    var { english } = data;
    var typ = new Type({
        id: ++i,
        name: english
    });
    typ.save()
        .then(() => console.log(`Saved: ${i}`))
        .catch(error => console.log(error));
});


//Cluster 4 To initialize Items
const itemJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/items.json')));

const itemSchema = new mongoose.Schema({
    id: Number,
    name: String
});

var i = 0;

const Item = mongoose.model('Items', itemSchema);

itemJson.map((data, index) => {
    var { id, name } = data;
    var item = new Item({
        id,
        name: name.english
    });
    item.save()
        .then(() => console.log(`Saved: ${++i}`))
        .catch(error => console.log(error));
});
*/