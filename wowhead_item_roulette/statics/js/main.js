import { NextItemButton } from './NextItemButton.js';
import { Wowhead } from './Wowhead.js';

const wowhead = new Wowhead();

// Define functionality of the button that will get the next Wowhead item
let nextItemButton = new NextItemButton('#randomItem');
nextItemButton.setClickHandler(function (event) {
    let itemId;
    (async () => {
        itemId = wowhead.getRandomItemId();
        for (i = 0; i < 100; i++) {
            if (await wowhead.doesIdExistInXmlFeed(itemId)) {
                break;
            }
            itemId = wowhead.getRandomItemId();
        }
        // console.log(itemId);
        let newItemLink = wowhead.getWowHeadLink('en', itemId, 'large');
        let oldItemLink = wowhead.replaceCurrentWowheadLink(newItemLink);
        wowhead.moveWowheadLinkToHistory(oldItemLink);
        $WowheadPower.refreshLinks();
    })().catch(err => {
        console.error(err);
    });
});

let init = () => {
    nextItemButton.bind();
};

if (document.readyState === "complete") {
    init();
}
else {
    document.addEventListener("DOMContentLoaded", init);
}
