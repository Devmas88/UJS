// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

//!! run SERVER/SOCKET_SERVER.js before this test.

TEST('CONNECT_TO_SOCKET_SERVER', function(ok) {
	'use strict';

	INIT_OBJECTS();

	// if you not want error listener.
	//
	//	CONNECT_TO_SOCKET_SERVER({
	//		host : 'localhost',
	//		port : 8124
	//	}, function(on, off, send) {
	//		...
	//	});

	CONNECT_TO_SOCKET_SERVER({
		host : 'localhost',
		port : 8124
	}, {
		error : function(error) {
			console.log('ERROR!');
		},
		success : function(on, off, send, disconnect) {

			on('message', function(data, ret) {

				ok(CHECK_ARE_SAME([data, {
					msg : 'message from server.'
				}]));

				ret('Thanks!');
			});

			send({
				methodName : 'message',
				data : {
					msg : 'message from client.'
				}
			}, function(retMsg) {
				ok(retMsg === 'Thanks!');
			});

			send({
				methodName : 'message',
				data : {
					msg : 'message from client.'
				}
			});

			send({
				methodName : 'login',
				data : {
					username : 'test',
					password : '1234'
				}
			});

			DELAY(1, function() {

				send({
					methodName : 'checkRole',
					data : 'USER'
				});
			});

			// when disconnected
			on('__DISCONNECTED', function() {
				console.log('DISCONNECTED!');
			});
			
			DELAY(3, disconnect);
		}
	});
});