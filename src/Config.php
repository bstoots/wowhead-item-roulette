<?php

namespace Bstoots\Wowhead\ItemRoulette;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

abstract class Config {

  /**
   * @var string Path to the view templates
   */
  const VIEW_DIR = __DIR__ . '/../resources/views';

  /**
   * @var string Subdomain to use if we can't determine which to use
   */
  const DEFAULT_WOWHEAD_SUBDOMAIN = 'www';

  /**
   * @var array All valid Wowhead subdomains
   */
  const WOWHEAD_SUBDOMAINS = [
    'de'  => 'Deutsch',
    'www' => 'English',
    'ptr' => 'English (PTR)',
    'es'  => 'Español',
    'fr'  => 'Français',
    'it'  => 'Italiano',
    'pt'  => 'Português Brasileiro',
    'ru'  => 'Русский',
    'ko'  => '한국어',
    'cn'  => '简体中文',
  ];

  /**
   * @var  integer  Lowest Wowhead item ID
   */
  const MIN_ITEM_ID = 77;

  /**
   * @var  integer  Highest Wowhead item ID
   */
  const MAX_ITEM_ID = 90000;

}
