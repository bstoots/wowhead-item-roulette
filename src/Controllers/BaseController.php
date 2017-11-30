<?php

namespace Bstoots\Wowhead\ItemRoulette\Controllers;

use Bstoots\Wowhead\ItemRoulette\Config;
use League\Plates;

abstract class BaseController {

  protected $templates;

  public function __construct() {
    $this->templates = new Plates\Engine(Config::VIEW_DIR);
  }

}
