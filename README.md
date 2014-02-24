# Robin

Robin is the heart and soul of your Raspberry-pi robot.


______
### Making your own robot

Need the following:
- Raspberry-pi
- Wheels
- Webcam
- Microphone
- Battery

##### Install Raspbian
First you'll need to install the Raspbian image on your Raspberry-pi. The easiest way of doing this is by using the NOOBS image from Raspberry-pi.
Instructions can be found at http://www.raspberrypi.org/downloads

##### Install Robin
Now it's time to unleach the awesom Robin on your Raspberry-pi.
###### Downloading from github
```javascript
git clone https://github.com/HalleyInteractive/Robin.git
```
After it's finished downloading go to the install directory and run InstallRobin.sh
If you have installed downloaded Robin to another location then ~/Robin, you should change the APP_DIR variable in /install/startup-scripts/robin to the correct location.
```javascript
cd Robin/install
./InstallRobin.sh
```
###### Configure Robin

______

### Developing a plugin
Plugins for robin are written in Javascript and can easily be added. Developing a plugin is very easy.
Create a new javascript file and

Make the commands you want your plugin to respond to available for Robin by adding them to exports.extendedCommands. The text in command can contain regular expressions as well.
Add the function that handles the command in callback.

**Example:**
```javascript
exports.extendedCommands = [];
exports.extendedCommands['en-US'] =
[
	{command:"WHAT TIME IS IT", callback:time},
	{command:"DO YOU KNOW THE TIME", callback:time}
];
```

It is also possible to add the commands to exports.basicCommands.
By default Robin will listen to all the basic commands continuously. Extended commands will be listened to after calling Robin by its name.

In this example we can let Robin respon with the current time by defining the time function.

**Example:**
```javascript
function time()
{
	global.robin.mouth.say("The time is " + dateFormat(now, "h:MM") + " and " + dateFormat(now, "ss") + " seconds", null, false);
}
```
##### Robin Features
In your plugin you can use the following features from Robin

###### Database
Connection to ArangoDB  
*global.robin.brain.db*  

###### Settings
Contains the settings for Robin  
*global.robin.settings*  
* **global.robin.settings.name** Name that Robin should listen to
* **global.robin.settings.language** Language used for TTS and Speechrecognition
* **global.robin.settings.version** Version of Robin
* **global.robin.settings.lastCommand** last executed command
* **global.robin.settings.audiodevice** Id of the audiorecording device

###### Reload Settings
This will reload settings from the database.  
*global.robin.brain.reloadSettings*  

###### Start/Stop speech to text basic
Starts/Stops listening for basic commands  
*global.robin.ears.stt_basic_start*  
*global.robin.ears.stt_basic_stop*  

###### Start/Stop speech to text extended
Starts/Stops listening for extended commands  
*global.robin.ears.stt_extended_start*  
*global.robin.ears.stt_extended_stop*  

###### Save still image from the camera output
The image is saved to the tmp folder  
*global.robin.eyes.takeStill*  

###### Camera stream
This is the node-openvc camera stream  
*global.robin.eyes.stream*  

###### Say
The text passed to this funtion will be spoken by Robin.  
When Robin is already speaking it will be queued  
*global.robin.mouth.say*  
