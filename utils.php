<?php
	
	use Lcobucci\JWT\Builder as JWTBuilder;
	use Lcobucci\JWT\Parser as JWTParser;
	use Lcobucci\JWT\ValidationData as JWTValidator;
	use Silex\Provider\DoctrineServiceProvider as DoctrineProvider;
	
	function createJWT( $userID ){
	
	
	}
	
	function logIn( $email, $password, $app ){
		
		if ( !$email ) {
			return [ 'error' => 'Please provide your email.' ];
		}
		if ( !$password ) {
			return [ 'error' => 'Please provide your password.' ];
		}
		
		$user = $app[ 'db' ]->fetchAssoc('SELECT * FROM users WHERE email = ?', [ $email ]);
		
		if ( $user === FALSE ) {
			return [ 'error' => 'User not found.' ];
		}
		
		if ( password_verify($password, $user[ 'password' ]) ) {
			
			return createJWT($user[ 'id' ]);
			
		}
		
		return [ 'error' => 'Login credentials are not correct.' ];
		
	}
	
	function createNewUser( $name, $email, $password, $app ){
		
		if ( !$name ) {
			return [ 'error' => 'Please provide your name.' ];
		}
		if ( !$email ) {
			return [ 'error' => 'Please provide your email.' ];
		}
		if ( !$password ) {
			return [ 'error' => 'Please provide your password.' ];
		}
		
		$rows = $app[ 'db' ]->fetchAll('SELECT * FROM users WHERE email = ?', [ $email ]);
		if ( $rows !== FALSE ) {
			return [ 'error' => 'Email already in use.' ];
		}
		
		$password = encryptPassword($password);
		
		$app[ 'db' ]->insert('users', [ 'username' => $name,
										'email'    => $email,
										'password' => $password,
										'data'     => "" ]);
		$ID = $app[ 'db' ]->lastInsertId();
		
		return [ 'JWT' => createJWT($ID) ];
		
	}
	
	function saveUserData( $JWT, $data, $app ){
		
		$ID = getUserIDFromJWT($JWT);
		
		$rowsAffected = $app[ 'db' ]->update('users', [ 'data' => $data ], [ 'id' => $ID ]);
		
		if ( $rowsAffected !== 1 ) {
			return [ 'error' => 'Something went wrong, please retry or contact the author.' ];
		}
		
		return [];
		
	}
	
	function fetchUserData( $JWT, $app ){
		
		$ID   = getUserIDFromJWT($JWT);
		$user = $app[ 'db' ]->fetchAssoc('SELECT * FROM users WHERE id = ?', [ $ID ]);
		
		return [ 'data' => $user[ 'data' ] ];
		
	}
	
	function getUserIDFromJWT( $JWT ){
		
		return 1;
		
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
																   'port'     => 3306 ] ]);
		
	}