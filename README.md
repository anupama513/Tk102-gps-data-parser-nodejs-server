

# TK102 GPS PARSER & NODE SERVER
Listen,receive and parse GPS data from TK102 trackers

Tk102 is a gps tracker which gives accurate co-ordinates. It can post the data through SMS or even through internet via configured host and port.
Here we are presenting a node server which listens to a port, parses the GPRMC data.<br> Post processing, you can either store it in a database or can post the data to any web service.

  
## Usage
Step 1: Install `npm` <br/>
Step 2: Install `nodejs` <br/> //Make sure mysql module is available in node_modules
Step 3: Running the application<br/>
$ `node reachtoday_updatedatabase.js` <br/> //run reachtoday_updateservice.js if you want to post the data to a service
#### you should see the below output<br/>
TK102 TCP GPRS Gateway v0.1-dev<br/>
Loading...<br/>
Setting up mysql connection..<br/>
Setting up tk102 interface..<br/>
This port is listening...<br/>

## Testing the application 
Make sure the server is running. Now run `testclient.js`<br/> 
$ `node testclient.js`<br/>
If you are using reachtoday_updatedatabase.js<br/>
make sure the database name, table name with correct columns are available <br/>
If you are using reachtoday_updateservice.js, make sure the service is running on the specified host<br/>

Here we have provided the tk102 tracker setup commands for ip routing from tk102 tracker to a listening port.

## Commands for TK102 GPS Tracker 
=======================================
After installing the simcard<br> // Place the simcard in the simcard slot.
Step 1: Check the signal and activate tk102 tracker with the commands below:<br/>
Send the Message from your mobile to the inserted sim number (called as tk102-sim from now on...)<br/>
Message: `begin123456`<br>
123456 is pin:can be any six digit number which you can remember. Here we are using 123456 to make things easy :)<br>
Response:begin Ok!<br>
This response says your gps device is working fine<br/>

Step 2: Call the gps tracker (tk102-sim) for 5 times, then your number will become trusted number for receiving SOS or any gps co-ordinate messages on your mobile<br>
Note: Maximum 5 numbers can be added to the trusted group <br>

Step 3: Set up apn<br>
Different networks have different apn. If you are in India, for example:<br>
apn for airtel: airtelgprs.com<br>
apn for bsnl: bsnlnet<br>
Send a message to tk102-sim from your trusted mobile number as shown below:<br>
Message: `apn123456 bsnlnet`<br>
Response: apnOK!<br>

Step 4: Check GPRS status of the device, Send a message: <br/>
Message: `GPRS123456`<br>
Response: GPRS OK<br>

Step 5: Setup the IP and port on which our node-server is listening. Remember you can only configure an IP. You cannot configure any domain on this version of gps-tracker. <br>
Send a message as shown below to configure IP address and port number:<br>
Message: `adminip123456 IPAddress port-number`<br>
Response :ADMINIP OK<br>

Now if you see in your console of our node-server, you should be able to see the parsed data in the console.
