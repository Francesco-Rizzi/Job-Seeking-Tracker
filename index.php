<?php
	
	require_once __DIR__ . '/vendor/autoload.php';
	require_once __DIR__ . '/secrets.php';
	require_once __DIR__ . '/utils.php';
	
	use \Symfony\Component\HttpFoundation\Request;
	
	$app = new Silex\Application();
	connectToDB($app);
	
	$app[ 'debug' ] = IS_DEBUG;
	
	/*
	 * PUBLIC SECTION
	 * */
	
	$app->get('/{route}', function (){
		
		return file_get_contents('./frontend/dist/index.html');
		
	})
		->assert('route', '^(|app|features)$');
	
	/*
	 * API SECTION
	 * */
	
	$app->get('/get-user-data', function ( Request $request ) use ( $app ){
		
		$JWT  = $request->request->get('JWT');
		$data = [ 'JWT' => fetchUserData($JWT) ];
		
		return $app->json($data, 200);
		
	});
	
	$app->post('/save-user-data', function ( Request $request ) use ( $app ){
		
		$data = [];
		
		return $app->json($data, 200);
		
	});
	
	$app->post('/signup', function ( Request $request ) use ( $app ){
		
		$name     = $request->request->get('name');
		$email    = $request->request->get('email');
		$password = $request->request->get('password');
		$data     = createNewUser($name, $email, $password, $app);
		
		return $app->json($data, 200);
		
	});
	
	$app->post('/signin', function ( Request $request ) use ( $app ){
		
		$data = [];
		
		return $app->json($data, 200);
		
	});
	
	$app->run();
	
	