<?php

namespace Bstoots\Wowhead\ItemRoulette\Controllers;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Bstoots\Wowhead\ItemRoulette\Config;

class RouletteController extends BaseController {

  public function get(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface {
    $response->getBody()->write(
      $this->templates->render(
        'roulette', 
        [
          'wowheadSubdomain' => $this->determineWowheadSubdomain($args),
          'minItemId'        => Config::MIN_ITEM_ID,
          'maxItemId'        => Config::MAX_ITEM_ID,
        ]
      )
    );
    return $response->withStatus(200);
  }

  protected function determineWowheadSubdomain(array $args) {
    if (array_key_exists('wowheadSubdomain', $args) && in_array($args['wowheadSubdomain'], Config::WOWHEAD_SUBDOMAINS)) {
      return $args['wowheadSubdomain'];
    }
    else {
      return 'www';
    }
  }

}
