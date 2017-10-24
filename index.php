<?php
	
	require_once __DIR__ . '/vendor/autoload.php';
	require_once __DIR__ . '/secrets.php';
	
	$app = new Silex\Application();
	$app[ 'debug' ] = IS_DEBUG;
	
	/*
	 * PUBLIC SECTION
	 * */
	
	$app->get('/', function(){
		return file_get_contents('./frontend/dist/index.html');
	});
	
	/*
	 * API SECTION
	 * */
	
	$app->run();