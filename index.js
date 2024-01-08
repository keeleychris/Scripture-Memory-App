import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, set, update, get, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://memory-verse-ab41a-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const dateEl = document.getElementById("current-date");
const titleEl = document.getElementById("page-title");
const verseEl = document.getElementById("verse-text");
const date = new Date();
const monthIndex = date.getMonth();
const day = date.getDate();
const year = date.getFullYear();
const month = months[monthIndex];

console.log(day)

dateEl.textContent = `${month} ${day}, ${year}`;
titleEl.textContent = `${month} Memory Verse`;

let book = await get(ref(database, `${month}/Book`))
book = JSON.parse(JSON.stringify(book))
book = book.split(" ").join("")
let chapterVerse = await get(ref(database, `${month}/reference`))
chapterVerse = JSON.parse(JSON.stringify(chapterVerse))
const apiURL = `https://api.esv.org/v3/passage/html/?q=${book}+${chapterVerse}&include-css-link=true&include-audio-link=false&include-verse-numbers=false&include-footnotes=false&include-headings=false&include-css-link=true`

async function getESVAPI() {
        let response = await fetch(`${apiURL}`, {
        headers: {Authorization: '384f202c619ecb17da52e23211556439467456e2'}
        });
        let data = await response.json();
        data = JSON.stringify(data);
        data = JSON.parse(data);
        return data;
}

let testThisOut = await getESVAPI();
const { passages } = await testThisOut;
verseEl.innerHTML = passages[0]