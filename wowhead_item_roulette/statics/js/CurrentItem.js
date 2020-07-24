/*
Functions
- Bind click handler
- Call external library to get new item
- Update current item
- Get previous item
*/

import { Wowhead } from './Wowhead.js';

class CurrentItem {

    constructor () {
        this.currentItemId = undefined;
        this.lastItemId = undefined;
    }

    bindClickEventTo (selector) {
        const element = document.querySelector(selector);
        // @TODO - Make sure querySelector returned something
        element.addEventListener('click', event => {
            let wowhead = new Wowhead();
            let newItemLink = wowhead.randomWowheadLink('en', 'large');
            let oldItemLink = wowhead.replaceCurrentWowheadLink(newItemLink);
            wowhead.moveWowheadLinkToHistory(oldItemLink);
            $WowheadPower.refreshLinks();
        });
    }

}

export { CurrentItem };
