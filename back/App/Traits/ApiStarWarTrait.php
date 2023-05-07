<?php

namespace App\Traits;

use \GuzzleHttp\Client;

trait ApiStarWarTrait
{
  private static int $resultPerPage = 10;
  public static function initStarWarApi(string $field, bool $useMirrorEndPoint = false)
  {
    $endPointApi = $useMirrorEndPoint ? getenv('API_END_POINT_MIRROR') : getenv('API_END_POINT');
    return new Client([
      'base_uri' => $endPointApi . $field,
      'timeout'  => 3.0,
    ]);
  }
}
