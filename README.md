

# TK102 GPS PARSER & NODE SERVER
Listen,receive and parse GPS data from TK102 trackers

Tk102 is a gps device which gives can post the data to a port listens on the configured port
Here we are presenting the node server which listens required port and parses the GPRMC data and 
process the data to post process where you can store it in database or else can post the data to any web service

Here we have provided the tk102 tracker setup commands of ip routing of gps data from tk102 tracker to a listening port.
   
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

## Commands for TK102 GPS Tracker 
=======================================
After installing the simcard<br>
Step 1: Check the single as well tk102 tracker activation with below<br/>
Send the Message from your mobile to the inserted sim number into tk102 traker<br/>
Message: begin123456<br>
123456 is pin:can be any six digit number which you can remember Here using 123456 for easy :)<br>
Response:begin Ok!<br>
This reposone says your gps device is working fine<br/>

Step 2: Now if you call the gps tracker installed sim number for 5 times then your number will be the trusted registered number for receiving the SOS or any co-ordinate messages to your mobile<br>
Maximun 5 numbers can be added to the trusted group <br>

Step 3: Set the apn<br>
Based on the network we will have different apn<br>
apn for airtel is: airtelgprs.com<br>
apn for bsnl is:bsnlnet<br>
Now send a message for setting the appropriate apn like below<br>
Message:  apn123456 bsnlnet<br>
Respone:apnOK!<br>

Step 4:Check GPS status of the device<br/>
send a message like below<br/>
Message: GPRS123456<br>
Response:GPRS OK<br>

Step 5: Setup the Ip where the Node is listening for Tk102 GPS tracker<br>
Send a message as below<br>
Message: adminip123456 IpAddress port<br>
Response :ADMINIP OK<br>

Now if you see in your console of NodeJs running i mean the above application running you can see the parsed data in the console
