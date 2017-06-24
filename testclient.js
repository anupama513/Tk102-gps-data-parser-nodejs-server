var http = require('http');

var options = {
  host: '127.0.0.1', //host the node is running on
  path: '/',
  port: '8080' //port the node is running on
};

callback = function(response) {
  var str = '';

console.log('test client started');
  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
  });
}

http.request(options, callback).end();
