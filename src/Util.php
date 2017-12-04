<?php

namespace Bstoots\Wowhead\ItemRoulette;

abstract class Util {

  /**
   * Asserts that the passed value is a valid subdomain
   * @param  mixed  $subdomain
   * @return bool
   */
  public static function assertWowheadSubdomain($subdomain): bool {
    if (!is_string($subdomain)) {
      return false;
    }
    else if (!in_array($subdomain, array_keys(Config::WOWHEAD_SUBDOMAINS))) {
      return false;
    }
    else {
      return true;
    }
  }

}
