console.log("TK102 TCP GPRS Gateway v0.1-dev");
console.log("Loading...");

var tk102 = require('./tk102');
var mysql = require('mysql');
var http = require('http');

var portNum = 8080;

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
	//service call
	request("https://ancloud.com/nodejscall?lat="+gps.lat+"&lng="+gps.lng+"&IMEI="+gps.IMEI, function(error, response, body) {
		  console.log(body);
		});

	
	console.log("\n TK102 TCP Gateway now running on port "+portNum);
});