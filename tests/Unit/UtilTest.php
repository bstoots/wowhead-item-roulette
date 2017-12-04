<?php
declare(strict_types=1);

namespace Bstoots\Wowhead\ItemRoulette\Tests\Unit;

use PHPUnit\Framework\TestCase;
use Bstoots\Wowhead\ItemRoulette\Util;

/**
 * @covers Util
 */
final class UtilTest extends TestCase {

  /**
   * @dataProvider assertWowheadSubdomainTrueProvider()
   */
  public function testAssertWowheadSubdomainTrue($subdomain) {
    $this->assertTrue(Util::assertWowheadSubdomain($subdomain));
  }

  /**
   * @dataProvider assertWowheadSubdomainFalseProvider()
   */
  public function testAssertWowheadSubdomainFalse($subdomain) {
    $this->assertFalse(Util::assertWowheadSubdomain($subdomain));
  }

  /**
   * 
   */
  public static function assertWowheadSubdomainTrueProvider() {
    return [
      ['de'],
      ['www'],
      ['ptr'],
      ['es'],
      ['fr'],
      ['it'],
      ['pt'],
      ['ru'],
      ['ko'],
      ['cn'],
    ];
  }

  /**
   * 
   */
  public static function assertWowheadSubdomainFalseProvider() {
    return [
      [null],
      [0],
      [false],
      [true],
      [''],
      [['wowheadSubdomain' => 'www']],
      // Only going to accept lowercase subdomains
      ['WWW'],
    ];
  }

}
