const cheerio = require('cheerio');
const axios = require('axios');
const downloadImage = require('./downloadimage');

const imgExt = async ($) => {
    var i = 0;
    while(true) {
        if($('.profile-images').children()[i])
            await downloadImage($('.profile-images').children()[i].attribs.src);
        else
            break;
        i++;
    }
}

const formExt = ($) => {
    var i = 0;
    var arr = [];
    while(true) {
        if($('option').eq(i).text()) {
            arr.push($('option').eq(i).text())
        } else {
            break;
        }
        ++i;
    }
    return arr;
}

const spaceTrimmer = (string) => {
    return string.replace(/\s\s+/g, ' ').trim().replace(/\n/g, " ");;
}


const verXTextExt = ($) => {
    var i = 0;
    var textArr = [];
    while(true) {
        if($('.version-x').eq(i).text()) {
            textArr.push(spaceTrimmer($('.version-x').eq(i).text()));
        } else {
            break;
        }
        i++;
    }
    return textArr;
}

const verYTextExt = ($) => {
    var i = 0;
    var textArr = [];
    while(true) {
        if($('.version-y').eq(i).text()) {
            textArr.push(spaceTrimmer($('.version-y').eq(i).text()));
        } else {
            break;
        }
        i++;
    }
    return textArr;
}

const extractProp = ($, prop) => {
    var heightArray = [];
    $('.attribute-value').each((index, item) => {
        if(item.prev && item.prev.prev && item.prev.prev.children[0].data.trim().toLowerCase()===prop.toLowerCase()) {
            heightArray.push(item.children['0'].data.trim())
        }
    })
    return heightArray;
}

const extractAbilities = ($) => {
    var i = 0, tempArr = [], returnJSON = {}, key = 0;
    while(true) {
        if($('.moreInfo').eq(i).text().trim() !== '') {
            if(i > 0 && $('.moreInfo').eq(i).parent().parent().text()!==$('.moreInfo').eq(i-1).parent().parent().text()) {
                returnJSON[key] = tempArr;
                key++;
                tempArr=[];
            }
            tempArr.push($('.moreInfo').eq(i).text().trim());
        } else {
            break;
        }
        i++;
    }
    returnJSON[key] = tempArr;
    return returnJSON;
}
const physicalPropExt = ($) => {
    let returnArray = [];
    const heightArray = extractProp($, 'height');
    const weightArray = extractProp($, 'weight');
    const genderArray = extractProp($, 'gender');
    const categoryArray = extractProp($, 'category');
    const abilitiesArray = extractAbilities($);
    let phyJson = {};

    for(var i = 0; i < heightArray.length; i++) {
        phyJson.height = heightArray[i];
        phyJson.weight = weightArray[i];
        phyJson.gender = genderArray[i];
        phyJson.category = categoryArray[i];
        phyJson.abilities = abilitiesArray[i];
        returnArray.push(JSON.parse(JSON.stringify(phyJson)));
    }
    return returnArray;
}

const typeExt = ($) => {
    var i = 0, returnArray = [];
    while(true) {
        if($('.dtm-type').eq(i).text() !== '') {
            returnArray.push(spaceTrimmer($('.dtm-type').eq(i).find('li').text()).split(' '));
        } else {
            break;
        }
        i++;
    }
    return returnArray;
}

const weaknessExt = ($) => {
    var i = 0, returnArray = [];
    while(true) {
        if($('.dtm-weaknesses').eq(i).text() !== '') {
            returnArray.push(spaceTrimmer($('.dtm-weaknesses').eq(i).find('li').text()).split(' '));
        } else {
            break;
        }
        i++;
    }
    return returnArray;
}

const statsExt = ($) => {
    var i = 0;
    let stats = [], returnArray = [];
    const statsArray = ['hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];
    while(true) {
        if($('.meter').eq(i).attr('data-value')) {
            stats.push($('.meter').eq(i).attr('data-value'));
        } else {
            break;
        }
        i++;
    }
    const statsJson = {};
    for(var i = 0; i < stats.length; i++) {
        if (i%6 === 5) {
            statsJson[statsArray[5]] = stats[i];
            returnArray.push(JSON.parse(JSON.stringify(statsJson)));
        } else {
            statsJson[statsArray[i%6]] = stats[i];
        }
    }
    return returnArray;
}

const scrape = async (pokemon) => {
    return await axios.get(`https://www.pokemon.com/us/pokedex/${pokemon}`)
        .then(async response => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                //await imgExt($);
                var base = statsExt($), forms = formExt($), type = typeExt($), xText = verXTextExt($), yText = verYTextExt($), physical = physicalPropExt($), weakness = weaknessExt($);
                return {
                    base,
                    forms,
                    type,
                    xText,
                    yText,
                    physical,
                    weakness
                }
            } else {
                console.log('Cannot fetch');
            }
        })
        .catch(error => {
            console.log('Error: ', error.code);
        })
}

module.exports = scrape;