<?php

namespace Bstoots\Wowhead\ItemRoulette\Controllers;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use League\Route\Http\Exception as HttpException;

class ErrorController extends BaseController {

  public function client(ResponseInterface $response) {
    $response->getBody()->write($this->templates->render('400', []));
    return $response;
  }

  public function server(ResponseInterface $response) {
    $response->getBody()->write($this->templates->render('500', []));
    return $response;
  }

  public function default(ResponseInterface $response) {
    $response->getBody()->write($this->templates->render('500', []));
    return $response;
  }

}
