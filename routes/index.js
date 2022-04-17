const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const getPokemons = require('../db/getPokemons');
const getPokemon = require('../db/getPokemon');
const getItems = require('../db/getItems');
const getTypes = require('../db/getTypes');
const getMoves = require('../db/getMoves');
const startConnection = require('../db/connection');

startConnection();


const router = express();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Pokedex Backend'
    });
});

router.get('/api/pokemon/:id', async (req, res) => {
    const { id } = req.params;
    const { data, success } = await getPokemon(id);
    res.status(200).json({
        data,
        success
    });
});

router.post('/api/pokemons', async (req, res) => {
    const { offset } = req.body
    const { data, success } = await getPokemons(offset);
    res.status(200).json({
        data,
        success
    });
});

router.get('/api/items', async (req, res) => {
    const { data, success } = await getItems();
    res.status(200).json({
        data,
        success
    });
});


router.get


router.get('/api/moves', async (req, res) => {
    const { data, success } = await getMoves();
    res.status(200).json({
        data,
        success
    });
});

router.get('/api/types', async (req, res) => {
    const { data, success } = await getTypes();
    res.status(200).json({
        data,
        success
    });
});

router.get('/assets/:folder/:name', (req, res) => {
    var { folder, name } = req.params;;
    if ((folder === 'images' || folder === 'thumbnails' || folder === 'sprites' || folder === 'cries') && fs.existsSync(path.resolve(`./assets/${folder}/${name}`))) {
            res.sendFile(path.resolve(`./assets/${folder}/${name}`));
    } else {
        res.status(200).json({
            data: [{ error: true }],
            success: true,
        });
    }
})

module.exports = router;