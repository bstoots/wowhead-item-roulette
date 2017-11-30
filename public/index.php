<?php

require __DIR__ . '/../vendor/autoload.php';

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

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

$response = $route->dispatch($container->get('request'), $container->get('response'));

$container->get('emitter')->emit($response);
