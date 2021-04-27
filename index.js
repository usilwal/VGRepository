const fetch = require('node-fetch');
var cors = require('cors')

const startDate = '1-1 00:00:00'
let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
const currDate = `${year}-${month}-${date} 00:00:00`;

const API_KEY = 'd2b070eb1e16be91e89182b57fe7ae25563c0e54';
const API_URL = 'https://www.giantbomb.com/api/games/?api_key=';

const GAMES = API_URL + API_KEY + `&format=json&sort=original_release_date:desc&filter=original_release_date:${startDate}|${currDate},`;

const SWITCHGAMES = GAMES + "platforms:157,"

async function getGames(query) {
    const res = await fetch(query);
    const data = await res.json();

    data.results.forEach(game => {
        const img = document.createElement('img');
        img.src = game.image.screen_url;

        document.body.appendChild(img);
    })

    console.log(data);
    return data;
}

getGames(SWITCHGAMES)
