<?php

namespace App\Controllers;

class StarshipsController
{
    use \App\Traits\ApiStarWarTrait;
    private static int $httpStatus = 404;

    /**
     * 
     * Get all starships
     * 
     * @param int $page Pagination
     * @return void
     * 
     */
    public static function getStarships(int|null $page = 1, $useMirrorEndPoint = false): void
    {
        try {
            $starWarApi = self::initStarWarApi('starships', $useMirrorEndPoint);
            $res = $starWarApi->request('GET', "?page=$page");
            $body = json_decode($res->getBody(), true);
            $body['total_page'] = ceil($body['count'] / self::$resultPerPage);
            $body['current_page'] = $page ? $page : 1;
            $body['results'] = array_map(function($person) {
                return [
                    'name' => $person['name'],
                    'model' => $person['model'],
                    'manufacturer' => $person['manufacturer'],
                    'cost_in_credits' => $person['cost_in_credits'],
                    'length' => $person['length'],
                    'max_atmosphering_speed' => $person['max_atmosphering_speed'],
                    'crew' => $person['crew'],
                    'passengers' => $person['passengers'],
                    'cargo_capacity' => $person['cargo_capacity'],
                    'consumables' => $person['consumables'],
                    'hyperdrive_rating' => $person['hyperdrive_rating'],
                    'MGLT' => $person['MGLT'],
                    'starship_class' => $person['starship_class'],
                ];
            }, $body['results']);

            self::$httpStatus = $res->getStatusCode();
            echo json_encode($body);
        } catch (\Exception $e) {
            if($useMirrorEndPoint) {
                echo json_encode(['message' => 'Sorry, something wrong happened...']);
            } else {
                self::getStarships($page, true);
            }
        } finally {
            http_response_code(self::$httpStatus);
            exit;
        }
    }
}
