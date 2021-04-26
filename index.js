const fetch = require('node-fetch');

const API_KEY = 'd2b070eb1e16be91e89182b57fe7ae25563c0e54';
const API_URL = 'https://www.giantbomb.com/api/games/?api_key=';
const GAMESORT = API_URL + API_KEY + "&sort=asc&format=json";

async function getGames() {
    const res = await fetch(GAMESORT);
    const data = await res.json();
    return data;
}

console.log(getGames());