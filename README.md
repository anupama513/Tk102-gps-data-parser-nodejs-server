

# TK102_GPS_PARSER & NODE_SERVER

Tk102 is a gps device which gives can post the data to a port listens on the configured port
Here we are presenting the node server which listens required port and parses the GPRMC data and 
process the data to post process where you can store it in database or else can post the data to any web service
   

## Usage
Step 1: Install NPM

Step 2: install nodejs
Make sure mysql module is available in node_moudles if in case running the reachtoday_updatebase.js
Step 3: Running the application
$ node reachtoday_updatedatabase.js (reachtoday_updateservice.js)
### you can the below output
TK102 TCP GPRS Gateway v0.1-dev
Loading...
Setting up mysql connection..
Setting up tk102 interface..
This port is listening...

##Testing the application 
While running the server now 
$ node testclient.js
if you are using reachtoday_updatedatabase.js
make sure the database name, table name with correct columns are available 
else if you are using reachtoday_updateservice.js
make sure the service is running on the specified host

