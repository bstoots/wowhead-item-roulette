<?php

require __DIR__ . '/../vendor/autoload.php';

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Bstoots\Wowhead\ItemRoulette\Controllers\ErrorController;
use League\Route\Http\Exception as HttpException;

error_reporting(-1);
ini_set('display_errors', 'On');

$container = new League\Container\Container;

$container->share('response', Zend\Diactoros\Response::class);
$container->share('request', function () {
  return Zend\Diactoros\ServerRequestFactory::fromGlobals(
    $_SERVER, $_GET, $_POST, $_COOKIE, $_FILES
  );
});

$container->share('emitter', Zend\Diactoros\Response\SapiEmitter::class);

$route = new League\Route\RouteCollection($container);

$route->map('GET', '/', 'Bstoots\Wowhead\ItemRoulette\Controllers\RouletteController::get');
$route->map('GET', '/{wowheadSubdomain}', 'Bstoots\Wowhead\ItemRoulette\Controllers\RouletteController::get');

try {
  $response = $route->dispatch($container->get('request'), $container->get('response'));
}
catch (HttpException $httpException) {
  // HTTP 400 Client Errors
  if ($httpException->getStatusCode() >= 400 && $httpException->getStatusCode() < 500) {
    $response = (new ErrorController)->client($container->get('response'));
  }
  // HTTP 500 Server Errors
  else if ($httpException->getStatusCode() >= 500 && $httpException->getStatusCode() < 600) {
    $response = (new ErrorController)->server($container->get('response'));
  }
  // Anything else
  else {
    $response = (new ErrorController)->default($container->get('response'));
  }
}
catch (\Exception $e) {
  $response = (new ErrorController)->default($container->get('response'));
}
finally {
  $container->get('emitter')->emit($response);
}
