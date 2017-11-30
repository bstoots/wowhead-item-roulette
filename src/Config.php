<?php

namespace Bstoots\Wowhead\ItemRoulette;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

abstract class Config {
  
  const VIEW_DIR = __DIR__ . '/../resources/views';

  const WOWHEAD_SUBDOMAINS = [
    'de',
    'www',
    'ptr',
    'es',
    'fr',
    'it',
    'pt',
    'ru',
    'ko',
    'cn',
  ];

  const MIN_ITEM_ID = 77;
  const MAX_ITEM_ID = 56000;

}
