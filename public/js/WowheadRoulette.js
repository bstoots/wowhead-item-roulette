'use strict';

/**
 * Library for driving the Wowhead Roulette application
 */
let $WowheadRoulette = function () {

  /**
   * Currently active subdomain.
   * @var string Subdomain prefix.  e.g. www, ptr, de.
   */
  let currentSubdomain;

  /**
   * Minimum item ID.  Corresponds to Wowhead item ID.
   * This value is typically used for random link generation.
   * @var integer Wowhead item ID.
   */
  let minItemId;

  /**
   * Maximum item ID.  Corresponds to Wowhead item ID.
   * This value is typically used for random link generation.
   * @var integer Wowhead item ID.
   */
  let maxItemId;

  /**
   * Parse the subdomain from a URL string.
   * @param  string url  URL string
   * @return string      Subdomain part of the URL.  e.g. www, ptr, de.
   */
  let getSubdomainFromUrl = function (url) {
    const regex = /^https?:\/\/(.+?)\.wowhead.com\/.*?$/;
    let m = regex.exec(url);
    return m[1];
  };

  /**
   * Parse the item ID from a URL string.
   * @param  string url  URL string
   * @return string      Item ID part of the URL. http://www.wowhead.com/item=37752 returns 37752.
   */
  let getItemIdFromUrl = function (url) {
    const regex = /^https?:\/\/.+?\.wowhead.com\/item=(\d+)$/;
    let m = regex.exec(url);
    return m[1];
  };

  /**
   * Generate an <a> element for a specific subdomain and item ID.
   * @param  string  subdomain  Wowhead subdomain: www, ptr, de.
   * @param  integer itemId     Wowhead item ID
   * @param  string  iconSize   Icon size: tiny, small, medium, large
   * @return string             String containing a Wowhead link
   */
  let getWowHeadLink = function (subdomain, itemId, iconSize) {
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
  };

  /**
   * Generate an <a> element for a specific subdomain and random item ID.
   * @param  string  subdomain  Wowhead subdomain: www, ptr, de.
   * @param  string  iconSize   Icon size: tiny, small, medium, large
   * @return string             String containing a Wowhead link
   */
  let randomWowheadLink = function (subdomain, iconSize) {
    let itemId = Math.floor(Math.random() * (this.maxItemId - this.minItemId)) + this.minItemId;
    return getWowHeadLink(subdomain, itemId, iconSize);
  };

  /**
   * Handles replacing the current random item link with a new item
   * @param  string newItemLink  String containing a Wowhead link
   * @return object              jQuery object containing the replaced element
   */
  let replaceCurrentWowheadLink = function (newItemLink) {
    newItemLink = $(newItemLink).attr('id', 'currentItemLink');
    return $("#currentItemLink").replaceWith(newItemLink);
  };

  /**
   * Handles moving an element to the history list
   * @param  object  jQuery object containing an <a> element
   * @return void
   */
  let moveWowheadLinkToHistory = function (oldItemLink) {
    let subdomain = getSubdomainFromUrl($(oldItemLink).attr('href'));
    let itemId = getItemIdFromUrl($(oldItemLink).attr('href'));
    let historicItemLink = getWowHeadLink(subdomain, itemId, 'tiny');
    $("#itemHistoryRow").prepend('<div class="col-12 col-sm-6 col-md-4 col-xl-3">' + historicItemLink + '</div>');
  };

  /**
   * Handles updating existing links for a new subdomain
   * @param  string  Wowhead subdomain: www, ptr, de.
   * @return void
   */
  let updateWowheadSubdomain = function (subdomain) {
    $(".itemLink").each(function (key, value) {
      let itemId = getItemIdFromUrl($(value).attr('href'));
      if (value.id == 'currentItemLink') {
        replaceCurrentWowheadLink(
          getWowHeadLink(subdomain, itemId, 'large')
        );
      }
      else {
        $(value).replaceWith(getWowHeadLink(subdomain, itemId, 'tiny'));
      }
    });
  }

  // Public interface for $WowheadRoulette object.  Object is seal()ed to prevent misuse.
  return Object.seal({
    currentSubdomain:          currentSubdomain,
    minItemId:                 minItemId,
    maxItemId:                 maxItemId,
    getWowHeadLink:            getWowHeadLink,
    randomWowheadLink:         randomWowheadLink,
    replaceCurrentWowheadLink: replaceCurrentWowheadLink,
    moveWowheadLinkToHistory:  moveWowheadLinkToHistory,
    updateWowheadSubdomain:    updateWowheadSubdomain,
    getSubdomainFromUrl:       getSubdomainFromUrl,
    getItemIdFromUrl:          getItemIdFromUrl
  });
}();
