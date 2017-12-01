'use strict';

let $WowheadRoulette = function () {

  let minItemId = 77;
  let maxItemId = 56000;

  let getSubdomainFromHref = function (href) {
    const regex = /^https?:\/\/(.+?)\.wowhead.com\/.*?$/;
    let m = regex.exec(href);
    return m[1];
  };

  let getItemIdFromHref = function (href) {
    const regex = /^https?:\/\/.+?\.wowhead.com\/item=(\d+)$/;
    let m = regex.exec(href);
    return m[1];
  };

  let getWowHeadLink = function (subdomain, itemId, iconSize) {
    let data_wh_icon_added = '';
    let data_wh_icon_size = '';
    if (iconSize == 'false' || iconSize == false) {
      data_wh_icon_added = 'data-wh-icon-added="true"';
      data_wh_icon_size = 'data-wh-icon-size="tiny"';
    }
    else if (iconSize == 'tiny' || iconSize == 'small' || iconSize == 'medium' || iconSize == 'large') {
      data_wh_icon_added = 'data-wh-icon-added="false"';
      data_wh_icon_size = 'data-wh-icon-size="' + iconSize + '"';
    }
    else {
      data_wh_icon_added = 'data-wh-icon-added="false"';
      data_wh_icon_size = 'data-wh-icon-size="tiny"';
    }
    return '<a class="itemLink" href="http://' + subdomain + '.wowhead.com/item=' + itemId + '" rel="item=' + itemId + '" ' + data_wh_icon_added + ' ' + data_wh_icon_size + '></a>';
  };

  let randomWowheadLink = function (subdomain, iconSize) {
    let itemId = Math.floor(Math.random() * (maxItemId - minItemId)) + minItemId;
    return getWowHeadLink(subdomain, itemId, iconSize);
  };

  let replaceCurrentWowheadLink = function (newItemLink) {
    newItemLink = $(newItemLink).attr('id', 'currentItemLink');
    return $("#currentItemLink").replaceWith(newItemLink);
  };

  let moveWowheadLinkToHistory = function (oldItemLink) {
    let subdomain = getSubdomainFromHref($(oldItemLink).attr('href'));
    let itemId = getItemIdFromHref($(oldItemLink).attr('href'));
    let historicItemLink = getWowHeadLink(subdomain, itemId, 'tiny');
    $("#itemHistoryRow").prepend('<div class="col-12 col-md-4">' + historicItemLink + '</div>');
  };

  // 
  return Object.freeze({
    minItemId: function () { return minItemId; }(),
    maxItemId: function () { return maxItemId; }(),
    getWowHeadLink: getWowHeadLink,
    randomWowheadLink: randomWowheadLink,
    replaceCurrentWowheadLink: replaceCurrentWowheadLink,
    moveWowheadLinkToHistory: moveWowheadLinkToHistory,
    getSubdomainFromHref: getSubdomainFromHref,
    getItemIdFromHref: getItemIdFromHref
  });
}();
