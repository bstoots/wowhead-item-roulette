<?php

namespace Bstoots\Wowhead\ItemRoulette\Controllers;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Bstoots\Wowhead\ItemRoulette\{Config, Util};

class RouletteController extends BaseController {

  public function get(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface {
    // Make sure that a subdomain is provided and that it is valid.  If not redirect to default subdomain
    if (!array_key_exists('wowheadSubdomain', $args) || !Util::assertWowheadSubdomain($args['wowheadSubdomain'])) {
      $response = $response->withStatus(302);
      $response = $response->withHeader('Location', '/' . Config::DEFAULT_WOWHEAD_SUBDOMAIN);
      return $response;
    }
    $response->getBody()->write(
      $this->templates->render(
        'roulette', 
        [
          'currentSubdomain'  => $args['wowheadSubdomain'],
          'allSubdomains'     => Config::WOWHEAD_SUBDOMAINS,
          'minItemId'         => Config::MIN_ITEM_ID,
          'maxItemId'         => Config::MAX_ITEM_ID,
        ]
      )
    );
    return $response->withStatus(200);
  }

}
