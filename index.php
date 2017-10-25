<?php
	
	require_once __DIR__ . '/vendor/autoload.php';
	require_once __DIR__ . '/secrets.php';
	require_once __DIR__ . '/utils.php';
	
	$app = new Silex\Application();
	
	$app[ 'debug' ] = IS_DEBUG;
	
	/*
	 * PUBLIC SECTION
	 * */
	
	$app->get('/{route}', function (){
		
		return file_get_contents('./frontend/dist/index.html');
		
	})->assert('route', '^(|app|features)$');
	
	/*
	 * API SECTION
	 * */
	
	$app->run();
	
	