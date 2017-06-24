console.log("TK102 TCP GPRS Gateway v0.1-dev");
console.log("Loading...");

var tk102 = require('./tk102');
var mysql = require('mysql');
var http = require('http');

var portNum = 8080;

console.log("Setting up mysql connection..")

var dbPool  = mysql.createPool({
	host     : '127.0.0.1',
	database : 'reachtoday', 
	user     : 'root',
	password : 'soft123',
	port : 3306,
	connectionLimit : 2
});

console.log("Setting up tk102 interface..")

tk102.createServer({
	port: portNum
});
tk102.on('trackGPS', function(gps) {
	console.log(gps)
	var recentPosition = {};
	recentPosition['lat'] = gps.lat;
	recentPosition['lng'] = gps.lng;
	recentPosition['IMEI'] = gps.IMEI;
	dbPool.getConnection(function(err, connection) {
		if (err) {
			console.log('error 1:: '+err);
			throw err;
		}
		connection.query('INSERT INTO gps_table(lat,lng,IMEI) values("'+gps.lat+'","'+gps.lng+'","'+gps.IMEI+'")', function(err, rows, fields) {
			if (err){ 
				console.log('error 2:: '+err);
				throw err;}
			connection.release();
		});
		http.emit( 'data', gps )
	});


	console.log("\n TK102 TCP Gateway now running on port "+portNum);
});