<?php
	
	require_once __DIR__ . '/vendor/autoload.php';
	require_once __DIR__ . '/secrets.php';
	require_once __DIR__ . '/utils.php';
	
	use \Symfony\Component\HttpFoundation\Request;
	
	$app = new Silex\Application();
	connectToDB($app);
	
	$app[ 'debug' ] = IS_DEBUG;
	
	//Parse JSON body from request if provided
	$app->before(function ( Request $request ){
		
		if ( 0 === strpos($request->headers->get('Content-Type'), 'application/json') ) {
			$data = json_decode($request->getContent(), TRUE);
			$request->request->replace(is_array($data) ? $data : []);
		}
	});
	
	/*
	 * PUBLIC SECTION
	 * */
	
	$app->get('/{route}', function (){
		
		return file_get_contents('./frontend/dist/index.html');
		
	})
		->assert('route', '^(|app|features|about)$');
	
	/*
	 * API SECTION
	 * */
	
	$app->get('/fetch-user-data', function ( Request $request ) use ( $app ){
		
		$JWT = $request->query->get('JWT');
		
		try {
			$data = [ 'user' => fetchUserData($JWT, $app) ];
		} catch ( Exception $e ) {
			$data = [ 'error' => $e->getMessage() ];
		}
		
		return $app->json($data, 200);
		
	});
	
	$app->post('/save-user-data', function ( Request $request ) use ( $app ){
		
		$data = $request->request->get('data');
		$JWT  = $request->request->get('JWT');
		
		try {
			$data = saveUserData($JWT, $data, $app);
		} catch ( Exception $e ) {
			$data = [ 'error' => $e->getMessage() ];
		}
		
		return $app->json($data, 200);
		
	});
	
	$app->post('/signup', function ( Request $request ) use ( $app ){
		
		$name     = $request->request->get('name');
		$email    = $request->request->get('email');
		$password = $request->request->get('password');
		
		try {
			$data = [ 'JWT' => createNewUser($name, $email, $password, $app) ];
		} catch ( Exception $e ) {
			$data = [ 'error' => $e->getMessage() ];
		}
		
		return $app->json($data, 200);
		
	});
	
	$app->post('/signin', function ( Request $request ) use ( $app ){
		
		$email    = $request->request->get('email');
		$password = $request->request->get('password');
		
		try {
			$data = [ 'JWT' => signIn($email, $password, $app) ];
		} catch ( Exception $e ) {
			$data = [ 'error' => $e->getMessage() ];
		}
		
		return $app->json($data, 200);
		
	});
	
	$app->post('/signin-jwt', function ( Request $request ) use ( $app ){
		
		$JWT = $request->request->get('JWT');
		
		try {
			checkJWTToken($JWT);
			$data = [];
		} catch ( Exception $e ) {
			$data = [ 'error' => $e->getMessage() ];
		}
		
		return $app->json($data, 200);
		
	});
	
	$app->post('/renew-jwt', function ( Request $request ) use ( $app ){
		
		$JWT = $request->request->get('JWT');
		
		try {
			$data = [ 'JWT' => renewJWTString($JWT) ];
		} catch ( Exception $e ) {
			$data = [ 'error' => $e->getMessage() ];
		}
		
		return $app->json($data, 200);
		
	});
	
	$app->run();
	
	