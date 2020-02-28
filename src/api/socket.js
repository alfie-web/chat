import io from 'socket.io-client';

const socket = io("http://localhost:5555");
















// const socket = io("http://localhost:5555", {
// 	transportOptions: {
// 		polling: {
// 			extraHeaders: {
// 				// 'Access-Control-Allow-Origin': '*'
// 				// 'withCredentials': true
// 				token: window.localStorage.token
// 			}
// 		}
// 	}
// });

// const socket = io("http://localhost:5555", {
// 	query: {
// 		token: window.localStorage.token
// 	}
// });







// socket.on('test', function(msg) {
// 	console.log('message' + msg);
// })

// socket.on('SERVER:NEW_MESSAGE', function(msg) {
// 	console.log('message', msg);
// })

export default socket;