<?php

require __DIR__ . '/../vendor/autoload.php';

// DOTENV
$dotenv = Dotenv\Dotenv::createUnsafeImmutable(__DIR__ . '/..');
$dotenv->load();

// CONFIG
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json; charset=utf-8');

// ROUTER
$router = new \Bramus\Router\Router();
require __DIR__ . '/../App/router.php';

$router->run();
