# Robin

Robin is the heart and soul of your Raspberry-pi robot.

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
git clone https://github.com/HalleyInteractive/Robin.git

After it's finished downloading go to the install directory and run InstallRobin.sh
```javascript
cd Robin/install
./InstallRobin.sh
```
###### Configure Robin



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
