<?php

namespace App\Controllers;


class PlanetsController
{
    use \App\Traits\ApiStarWarTrait;
    private static int $httpStatus = 404;

    /**
     * 
     * Get all planets
     * 
     * @param int $page Pagination
     * @return void
     * 
     */
    public static function getPlanets(int|null $page = 1, $useMirrorEndPoint = false): void
    {
        try {
            $starWarApi = self::initStarWarApi('planets', $useMirrorEndPoint);
            $res = $starWarApi->request('GET', "?page=$page");
            $body = json_decode($res->getBody(), true);
            $body['total_page'] = ceil($body['count'] / self::$resultPerPage);
            $body['current_page'] = $page ? $page : 1;
            $body['results'] = array_map(function ($person) {
                return [
                    'name' => $person['name'],
                    'rotation_period' => $person['rotation_period'],
                    'orbital_period' => $person['orbital_period'],
                    'diameter' => $person['diameter'],
                    'climate' => $person['climate'],
                    'gravity' => $person['gravity'],
                    'terrain' => $person['terrain'],
                    'surface_water' => $person['surface_water'],
                    'population' => $person['population'],
                    'climate' => $person['climate'],
                ];
            }, $body['results']);

            self::$httpStatus = $res->getStatusCode();
            echo json_encode($body);
        } catch (\Exception $e) {
            if($useMirrorEndPoint) {
                echo json_encode(['message' => 'Sorry, something wrong happened...']);
            } else {
                self::getPlanets($page, true);
            }
        } finally {
            http_response_code(self::$httpStatus);
            exit;
        }
    }
}
