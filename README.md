

# TK102 GPS PARSER & NODE SERVER
Listen,receive and parse GPS data from TK102 trackers

Tk102 is a gps device which gives can post the data to a port listens on the configured port
Here we are presenting the node server which listens required port and parses the GPRMC data and 
process the data to post process where you can store it in database or else can post the data to any web service
   
## Usage
Step 1: Install NPM <br/>
Step 2: install nodejs <br/>
Make sure mysql module is available in node_moudles if in case running the reachtoday_updatebase.js<br/>
Step 3: Running the application<br/>
$ node reachtoday_updatedatabase.js (reachtoday_updateservice.js)<br/>
#### you can the below output<br/>
TK102 TCP GPRS Gateway v0.1-dev<br/>
Loading...<br/>
Setting up mysql connection..<br/>
Setting up tk102 interface..<br/>
This port is listening...<br/>

## Testing the application 
While running the server now<br/> 
$ node testclient.js<br/>
if you are using reachtoday_updatedatabase.js<br/>
make sure the database name, table name with correct columns are available <br/>
else if you are using reachtoday_updateservice.js<br/>
make sure the service is running on the specified host<br/>

