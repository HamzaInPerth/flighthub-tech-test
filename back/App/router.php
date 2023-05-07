<?php

$router->setNamespace('\App\Controllers');

$router->mount('/people', function () use ($router) {
    // Search person
    $router->get('/search/{name}/?(\d+)?', 'PeopleController@getPerson');

    // People list
    $router->get('/?(\d+)?', 'PeopleController@getPeople');
});

// Planets lists
$router->get('/planets/?(\d+)?', 'PlanetsController@getPlanets');

// Starships lists
$router->get('/starships/?(\d+)?', 'StarshipsController@getStarships');

// 404 handler
$router->set404('(/.*)?', function () {
    http_response_code(404);
    echo json_encode(['message' => 'This page does not exist.']);
    exit;
});
