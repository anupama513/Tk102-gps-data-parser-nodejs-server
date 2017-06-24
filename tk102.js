/*
Name:         TK102
Description:  TK102 GPS Data Parser and server for Node.js
Source:       
License:      Unlicense / Public Domain

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.
 */


//INIT
var net = require('net'),
EventEmitter = require('events').EventEmitter

var tk102 = new EventEmitter()

//defaults
tk102.settings = {
	ip:		'0.0.0.0',	// default listen on all IPs
	port:		8080,		// 0 = random, 'listening' event reports port
	connections:	3,		// 10 simultaneous connections
	timeout:	5		// 10 seconds idle timeout
}

//Create server
tk102.createServer = function( vars ) {

	// override settings
	if( typeof vars == 'object' && Object.keys(vars).length >= 1 ) {
		for( var key in vars ) {
			tk102.settings[ key ] = vars[ key ]
		}
	}

	// start server
	tk102.server = net.createServer( function( socket ) {
		console.log('creating server in tk102.js...');
		// socket idle timeout
		if( tk102.settings.timeout > 0 ) {
			socket.setTimeout( tk102.settings.timeout * 1000, function() {
				tk102.emit( 'timeout', socket )
				socket.end()
				socket.destroy()
			})
		}

	}).listen( tk102.settings.port, tk102.settings.ip, function() {
		console.log('This port is listening...');
		tk102.emit( 'listening', tk102.server.address() )
	})

	// maximum number of slots
	tk102.server.maxConnections = tk102.settings.connections

	// inbound connection
	tk102.server.on( 'connection', function( socket ) {
		socket.setEncoding( 'utf8' )
		var data = ''
			socket.on( 'data', function( chunk ) {
				data += chunk;
				//This dummy data comment it when you are getting data dynamically
				data = '(027028641389BR00160123A1428.4284N07850.1819E020.90557101.200000000000L00000000)';
				var gps = {}
				gps = tk102.parse( data )
				if( data != '' ) {
					
					var gps = tk102.parse( data )
					console.log(gps)
					if( gps ) {
						tk102.emit( 'trackGPS', gps )
					} else {
						tk102.emit( 'fail', {
							reason:	'Cannot parse GPS data from device',
							socket:	socket,
							input:	data
						})
					}
				}
			})
	})
}
tk102.parse = function (raw){
	var IMEI = raw.substring (3,raw.indexOf('B'));
	console.log('IMEI'+IMEI)
	var Nbound = raw.substring(raw.indexOf('A')+1,raw.indexOf('N'));

	var Ebound = raw.substring(raw.indexOf('N')+2,raw.indexOf('E'));

	var latitude =  parseFloat(parseInt(Nbound.substring(0,2))+parseFloat(Nbound.substring(2,Nbound.length))/60).toFixed(5)
	var longitude =   parseFloat(parseInt(Ebound.substring(0,2))+parseFloat(Ebound.substring(2,Ebound.length))/60).toFixed(5)
	var gps ={
		'lat': latitude,
		'lng': longitude,
		'IMEI' : IMEI
	}
	return gps
}


//Clean geo positions, with 6 decimals
tk102.fixGeo = function( one, two ) {
	var minutes = one.substr(-7, 7)
	var degrees = parseInt( one.replace( minutes, '' ), 10 )
	var one = degrees + (minutes / 60)

	var one = parseFloat( (two == 'S' || two == 'W' ? '-' : '') + one )
	return Math.round( one * 1000000 ) / 1000000
}

tk102.fixFakeGeo = function( one, two ) {
	var minutes = one.substr(-9, 9)
	var degrees = parseInt( one.replace( minutes, '' ), 10 )
	var one = degrees + (minutes / 60)

	var one = parseFloat( (two == 'S' || two == 'W' ? '-' : '') + one )
	return Math.round( one * 1000000 ) / 1000000
}

//ready
module.exports = tk102