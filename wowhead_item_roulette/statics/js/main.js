import { WowheadRoulette } from './WowheadRoulette.js';

const wowheadRoulette = new WowheadRoulette();

// Once the DOM is in place start the client-side app
if (document.readyState === "complete") {
    wowheadRoulette.start();
}
else {
    document.addEventListener("DOMContentLoaded", (event) => {
        wowheadRoulette.start(event)
    });
}
