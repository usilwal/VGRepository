const fetch = require('node-fetch');
var cors = require('cors')

const startDate = '1-1 00:00:00'
let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
const currDate = `${year}-${month}-${date} 00:00:00`;

const API_KEY = 'd2b070eb1e16be91e89182b57fe7ae25563c0e54';
const API_URL = '?api_key=' + API_KEY;

const SWITCHGAMES = "platforms:157,";

const main = document.querySelector('main');

async function getGame(url) {
    const query = `${url}?api_key=${API_KEY}&format=json`
    const res = await fetch(query)
    const data = await res.json();

    console.log(data.genres.name)
}

async function getGames(filter) {
    const games = `https://www.giantbomb.com/api/games/${API_URL}&format=json&sort=original_release_date:desc&filter=original_release_date:${startDate}|${currDate},`;
    const query = games + filter;
    const res = await fetch(query);
    const data = await res.json();

    data.results.forEach(game => {
        if (game.original_release_date === null) {
            game.original_release_date = 'Not Listed';
        }
        const gameElement = document.createElement('div');
        gameElement.classList.add('game');
        gameElement.innerHTML = `
        <img src="${game.image.screen_url}" title="${game.deck}"/>
        <div class="game-desc">
            <h3>${game.name}</h3>
            <span>${game.original_release_date}</span>
        </div>`

        document.body.appendChild(gameElement)
    });

    console.log(data);
    return data;
}

getGames(SWITCHGAMES)
