const fetch = require('node-fetch');
var cors = require('cors')


const API_KEY = 'd2b070eb1e16be91e89182b57fe7ae25563c0e54';
const API_URL = 'https://www.giantbomb.com/api/games/?api_key=';
const GAMES = API_URL + API_KEY + "&format=json";

const SWITCHGAMES = GAMES + "&sort=date_added:desc&filter=platforms:157"

async function getGames(query) {
    const res = await fetch(query);
    const data = await res.json();

    data.results.forEach(game => {
        const img = document.createElement('img');
        img.src = game.image.screen_url;

        document.body.appendChild(img);
    })
    return data;
}

getGames(SWITCHGAMES)
