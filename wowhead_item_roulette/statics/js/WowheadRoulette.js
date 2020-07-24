import { NextItemButton } from './NextItemButton.js';
import { Wowhead } from './Wowhead.js';

class WowheadRoulette {

    constructor () {
        // Initialize Wowhead util instance
        this.wowhead = new Wowhead();
        // Initialize NextItemButton instance
        this.nextItemButtonSelector = '#randomItem';
        this.nextItemButton = new NextItemButton(this.nextItemButtonSelector);
    }

    start (event) {
        (async () => {
            try {
                await this.initializeCurrentItemLink();
                this.initializeNextItemButton();
            } catch (e) {
                console.error(e);
            }
        })();
    }

    async initializeCurrentItemLink () {
        let itemId = this.wowhead.getRandomItemId();
        for (let i = 0; i < 100; i++) {
            if (await this.wowhead.doesIdExistInXmlFeed(itemId)) {
                break;
            }
            itemId = this.wowhead.getRandomItemId();
        }
        let newItemLink = this.wowhead.getWowHeadLink('en', itemId, 'large');
        this.wowhead.replaceCurrentWowheadLink(newItemLink);
        $WowheadPower.refreshLinks();
    }

    initializeNextItemButton () {
        this.nextItemButton.setClickHandler((event) => {
            event.preventDefault();
            let itemId;
            (async () => {
                itemId = this.wowhead.getRandomItemId();
                for (let i = 0; i < 100; i++) {
                    if (await this.wowhead.doesIdExistInXmlFeed(itemId)) {
                        break;
                    }
                    itemId = this.wowhead.getRandomItemId();
                }
                // console.log(itemId);
                let newItemLink = this.wowhead.getWowHeadLink('en', itemId, 'large');
                let oldItemLink = this.wowhead.replaceCurrentWowheadLink(newItemLink);
                this.wowhead.moveWowheadLinkToHistory(oldItemLink);
                $WowheadPower.refreshLinks();
            })().catch(err => {
                console.error(err);
            });
        });
        // register the configured event handler function
        this.nextItemButton.registerClickHandler();
    }

}

export { WowheadRoulette };
