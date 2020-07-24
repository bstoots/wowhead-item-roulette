/*
Functions
- Bind click handler
- Call external library to get new item
- Update current item
- Get previous item
*/

class Wowhead {

    constructor (
        subdomain = "www",
        minItemId = 120000,
        maxItemId = 180000
    ) {
        this.subdomain = subdomain;
        this.minItemId = minItemId;
        this.maxItemId = maxItemId;
    }

    getSubdomains () {
        return {
            'de' : 'Deutsch',
            'www': 'English',
            'ptr': 'English (PTR)',
            'es' : 'Español',
            'fr' : 'Français',
            'it' : 'Italiano',
            'pt' : 'Português Brasileiro',
            'ru' : 'Русский',
            'ko' : '한국어',
            'cn' : '简体中文',
        }
    }

    getRandomItemId (defaultMinItemId, defaultMaxItemId) {
        return Math.floor(Math.random() * (this.maxItemId - this.minItemId)) + this.minItemId;
    }

    async doesIdExistInXmlFeed (itemId) {
        let response = await fetch(`/item_id/${itemId}/exists`);
        let data = await response.json();
        // console.log(data.exists);
        return data.exists;
    }

    /**
     * Parse the subdomain from a URL string.
     * @param  string url  URL string
     * @return string      Subdomain part of the URL.  e.g. www, ptr, de.
     */
    getSubdomainFromUrl (url) {
        const regex = /^https?:\/\/(.+?)\.wowhead.com\/.*?$/;
        let m = regex.exec(url);
        return m[1];
    }

    /**
     * Parse the item ID from a URL string.
     * @param  string url  URL string
     * @return string      Item ID part of the URL. http://www.wowhead.com/item=37752 returns 37752.
     */
    getItemIdFromUrl (url) {
        const regex = /^https?:\/\/.+?\.wowhead.com\/item=(\d+)$/;
        let m = regex.exec(url);
        return m[1];
    }

    /**
     * Generate an <a> element for a specific subdomain and item ID.
     * @param  string  subdomain  Wowhead subdomain: www, ptr, de.
     * @param  integer itemId     Wowhead item ID
     * @param  string  iconSize   Icon size: tiny, small, medium, large
     * @return string             String containing a Wowhead link
     */
    getWowHeadLink (subdomain, itemId, iconSize) {
        let data_wh_icon_added = '';
        let data_wh_icon_size = '';
        if (iconSize == 'tiny' || iconSize == 'small' || iconSize == 'medium' || iconSize == 'large') {
            data_wh_icon_added = 'data-wh-icon-added="false"';
            data_wh_icon_size = 'data-wh-icon-size="' + iconSize + '"';
        }
        else {
            data_wh_icon_added = 'data-wh-icon-added="false"';
            data_wh_icon_size = 'data-wh-icon-size="tiny"';
        }
        return '<a class="itemLink" target="wowhead" href="http://' + subdomain + '.wowhead.com/item=' + itemId + '" rel="item=' + itemId + '" ' + data_wh_icon_added + ' ' + data_wh_icon_size + '></a>';
    }

    /**
     * Generate an <a> element for a specific subdomain and random item ID.
     * @param  string  subdomain  Wowhead subdomain: www, ptr, de.
     * @param  string  iconSize   Icon size: tiny, small, medium, large
     * @return string             String containing a Wowhead link
     */
    randomWowheadLink (subdomain, iconSize) {
        let itemId = this.getRandomItemId();
        return this.getWowHeadLink(subdomain, itemId, iconSize);
    }

    /**
     * Handles replacing the current random item link with a new item
     * @param  string newItemLink  String containing a Wowhead link
     * @return object              jQuery object containing the replaced element
     */
    replaceCurrentWowheadLink (newItemLink) {
        newItemLink = $(newItemLink).attr('id', 'currentItemLink');
        return $("#currentItemLink").replaceWith(newItemLink);
    }

    /**
     * Handles moving an element to the history list
     * @param  object  jQuery object containing an <a> element
     * @return void
     */
    moveWowheadLinkToHistory (oldItemLink) {
        let subdomain = this.getSubdomainFromUrl($(oldItemLink).attr('href'));
        let itemId = this.getItemIdFromUrl($(oldItemLink).attr('href'));
        let historicItemLink = this.getWowHeadLink(subdomain, itemId, 'tiny');
        $("#itemHistoryRow").prepend('<div class="col-12 col-sm-6 col-md-4 col-xl-3">' + historicItemLink + '</div>');
    }

}

export { Wowhead };
