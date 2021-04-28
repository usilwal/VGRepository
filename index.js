const fetch = require('node-fetch');
const API_KEY = require('api.js');

const API_URL = '?api_key=' + API_KEY;

const startDate = '1-1 00:00:00'
let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
const currDate = `${year}-${month}-${date} 00:00:00`;

const main = document.querySelector('main');
const form = document.getElementById('search-form');
const search = document.getElementById('search');

function getList(data) {
    main.innerHTML = '';
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

        main.appendChild(gameElement)
    });

    return data;
}

async function searchGame(term) {
    const searchUrl = `https://www.giantbomb.com/api/search/${API_URL}&format=json`
    const query = `${searchUrl}&resources=game&query=${term}`;
    const res = await fetch(query);
    const data = await res.json();
    getList(data);
}

async function getGame(url) {
    const query = `${url}${API_URL}&format=json`
    const res = await fetch(query);
    const data = await res.json();
}

async function getNewestGames(filter) {
    const games = `https://www.giantbomb.com/api/games/${API_URL}&format=json&sort=original_release_date:desc&filter=original_release_date:${startDate}|${currDate},`;
    const query = games + filter;
    const res = await fetch(query);
    const data = await res.json();
    getList(data);
}

form.addEventListener('submit', event => {
    event.preventDefault();
    const searchTerm = search.value;
    searchGame(searchTerm);
});

getNewestGames('');