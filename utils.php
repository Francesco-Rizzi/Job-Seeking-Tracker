<?php
	
	use Lcobucci\JWT\Builder as JWTBuilder;
	use Lcobucci\JWT\Parser as JWTParser;
	use Lcobucci\JWT\ValidationData as JWTValidatorData;
	use Lcobucci\JWT\Signer\Hmac\Sha256;
	use Silex\Provider\DoctrineServiceProvider as DoctrineProvider;
	
	function signIn( $email, $password, $app ){
		
		if ( !$email ) {
			throw new Exception('Please provide your email.');
		}
		if ( !$password ) {
			throw new Exception('Please provide your password.');
		}
		
		$user = $app[ 'db' ]->fetchAssoc('SELECT * FROM users WHERE email = ?', [ $email ]);
		
		if ( $user === FALSE ) {
			throw new Exception('User not found.');
		}
		
		if ( password_verify($password, $user[ 'password' ]) ) {
			
			return createJWT($user[ 'id' ]);
			
		}
		
		throw new Exception('Login credentials are not correct.');
		
	}
	
	function createNewUser( $name, $email, $password, $app ){
		
		if ( !$name ) {
			throw new Exception('Please provide your name.');
		}
		if ( !$email || !filter_var($email, FILTER_VALIDATE_EMAIL) ) {
			throw new Exception('Please provide a valid email.');
		}
		if ( !$password ) {
			throw new Exception('Please provide your password.');
		}
		
		$rows = $app[ 'db' ]->fetchAll('SELECT * FROM users WHERE email = ?', [ $email ]);
		
		if ( count($rows) ) {
			throw new Exception('Email already in use.');
		}
		
		$password = encryptPassword($password);
		
		$app[ 'db' ]->insert('users', [ 'username'     => $name,
										'email'        => $email,
										'password'     => $password,
										'data'         => '[]',
										'createdAt'    => time(),
										'lastUpdateAt' => time() ]);
		$ID = $app[ 'db' ]->lastInsertId();
		
		return createJWT($ID);
		
	}
	
	function saveUserData( $JWT, $data, $app ){
		
		$ID = getUserIDFromJWTString($JWT);
		
		$rowsAffected = $app[ 'db' ]->update('users', [ 'data'         => $data,
														'lastUpdateAt' => time() ], [ 'id' => $ID ]);
		
		/*if ( $rowsAffected !== 1 ) { //sometimes if data is equal (ex. 2 call with the same data at the same time, the row count will be 0
			throw new Exception('Something went wrong, please retry or contact the author.');
		}*/
		
		return [ 'success' => TRUE ];
		
	}
	
	function fetchUserData( $JWT, $app ){
		
		$ID   = getUserIDFromJWTString($JWT);
		$user = $app[ 'db' ]->fetchAssoc('SELECT * FROM users WHERE id = ?', [ $ID ]);
		
		if ( $user === FALSE ) {
			throw new Exception('User not found.');
		}
		
		return [ 'name' => $user[ 'username' ],
				 'data' => $user[ 'data' ] ];
		
	}
	
	function encryptPassword( $password ){
		
		return password_hash($password, PASSWORD_BCRYPT);
		
	}
	
	function connectToDB( $app ){
		
		$app->register(new DoctrineProvider(), [ 'db.options' => [ 'dbname'   => DB_NAME,
																   'user'     => DB_USER,
																   'password' => DB_PASSWORD,
																   'host'     => 'localhost',
																   'driver'   => 'pdo_mysql',
																   'charset'  => 'utf8mb4',
																   'port'     => 3306 ] ]);
		
	}
	
	
	/*
	 * JWT SECTION
	 * */
	
	function createJWT( $userID ){
		
		$signer              = new Sha256();
		$expirationTimestamp = time() + 3600; //1 hour
		
		$token = ( new JWTBuilder() )->setIssuer($_SERVER[ 'SERVER_NAME' ])
									 ->setAudience($_SERVER[ 'SERVER_NAME' ])
									 ->setIssuedAt(time())
									 ->setNotBefore(time())
									 ->setExpiration($expirationTimestamp)
									 ->set('uid', $userID)
									 ->set('exp', $expirationTimestamp)
									 ->sign($signer, JWT_SECRET)
									 ->getToken();
		
		return (string) $token;
		
	}
	
	function getJWTTokenFromString( $JWTString ){
		
		if(!$JWTString){
			throw new Exception('Invalid token.');
		}
		
		return ( new JWTParser() )->parse((string) $JWTString);
		
	}
	
	function checkJWTToken( $JWT ){
		
		if ( is_string($JWT) ) {
			$JWT = getJWTTokenFromString($JWT);
		}
		
		$signer = new Sha256();
		
		if ( !$JWT->verify($signer, JWT_SECRET) ) {
			throw new Exception('Untrusted token.');
		}
		
		$data = new JWTValidatorData();
		$data->setIssuer($_SERVER[ 'SERVER_NAME' ]);
		$data->setAudience($_SERVER[ 'SERVER_NAME' ]);
		
		if ( !$JWT->validate($data) ) {
			throw new Exception('Expired token.');
		}
		
		return TRUE;
		
	}
	
	function getUserIDFromJWTString( $JWTString ){
		
		$JWT = getJWTTokenFromString($JWTString);
		checkJWTToken($JWT);
		
		return $JWT->getClaim('uid');
		
	}
	
	function renewJWTString( $JWTString ){
		
		$ID = getUserIDFromJWTString($JWTString);
		return createJWT($ID);
		
	}