<?php

namespace App\Controllers;

class PeopleController
{
    use \App\Traits\ApiStarWarTrait;
    private static int $httpStatus = 404;

    /**
     * 
     * Get all people
     * 
     * @param int $page Pagination
     * @return void
     * 
     */
    public static function getPeople(int|null $page = 1, $useMirrorEndPoint = false): void
    {
        try {
            $starWarApi = self::initStarWarApi('people', $useMirrorEndPoint);
            $res = $starWarApi->request('GET', "?page=$page");
            $body = json_decode($res->getBody(), true);
            $body['total_page'] = ceil($body['count'] / self::$resultPerPage);
            $body['current_page'] = $page ? $page : 1;
            $body['results'] = array_map(function($person) {
                return [
                    'name' => $person['name'],
                    'hair_color' => $person['hair_color'],
                    'skin_color' => $person['skin_color'],
                    'birth_year' => $person['birth_year'],
                    'gender' => $person['gender'],
                ];
            }, $body['results']);

            self::$httpStatus = $res->getStatusCode();
            echo json_encode($body);
        } catch (\Exception $e) {
            if($useMirrorEndPoint) {
                echo json_encode(['message' => 'Sorry, something wrong happened...']);
            } else {
                self::getPeople($page, true);
            }
        } finally {
            http_response_code(self::$httpStatus);
            exit;
        }
    }

    /**
     * 
     * Search a person
     * 
     * @param string $name Person name
     * @param int $page Pagination
     * @return void
     * 
     */
    public static function getPerson(string $name, int|null $page = 1, $useMirrorEndPoint = false): void
    {
        try {
            $starWarApi = self::initStarWarApi('people', $useMirrorEndPoint );
            $res = $starWarApi->request('GET', "?search=$name&page=$page");
            $body = json_decode($res->getBody(), true);
            $body['total_page'] = ceil($body['count'] / self::$resultPerPage);
            $body['current_page'] = $page ? $page : 1;
            $body['results'] = array_map(function($person) {
                return [
                    'name' => $person['name'],
                    'hair_color' => $person['hair_color'],
                    'skin_color' => $person['skin_color'],
                    'birth_year' => $person['birth_year'],
                    'gender' => $person['gender'],
                ];
            }, $body['results']);
            self::$httpStatus = $res->getStatusCode();
            echo json_encode($body);
        } catch (\Exception $e) {
            if($useMirrorEndPoint) {
                echo json_encode(['message' => 'Sorry, something wrong happened...']);
            } else {
                self::getPerson($name, $page, true);
            }
        } finally {
            http_response_code(self::$httpStatus);
            exit;
        }
    }
}
