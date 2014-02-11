/* globals require, exports */

/*
*	1 - 3.3v	1	2	5v
*	2C SDA		3	4	--
*	C SCL		5	6	Ground
*	PIO			7	8	TX
*	-			9	10	RX
*	PIO			11	12	GPIO
*	PIO			13	14	--
*	PIO			15	16	GPIO
*	-			17	18	GPIO
*	PI MOSI		19	20	--
*	PI MISO		21	22	GPIO
*	PI SCLK		23	24	SPI CE0
*	-			25	26	SPI CE1
*/

/*
* A simple node.js-based GPIO helper for the Raspberry Pi
* Author: Rakesh Pai
* URL: https://github.com/rakeshpai/pi-gpio
*/
var gpio = require('pi-gpio');

function forward()
{
	// Wheel 1 ?
	gpio.open(15, "output", function(err) {     // Open pin 15 for output
		if(err){ console.log("Error on gpio pin 16"); }
		gpio.write(15, 1, function() {          // Set pin 15 high (1)
			gpio.close(15);                     // Close pin 15
		});
	});
	// Wheel 2 ?
	gpio.open(16, "output", function(err) {     // Open pin 16 for output
		if(err){ console.log("Error on gpio pin 16"); }
		gpio.write(16, 1, function() {          // Set pin 16 high (1)
			gpio.close(16);                     // Close pin 16
		});
	});
}

function backward()
{
	// Wheel 1 ?
	gpio.open(15, "output", function(err) {     // Open pin 15 for output
		if(err){ console.log("Error on gpio pin 16"); }
		gpio.write(15, 1, function() {          // Set pin 15 high (1)
			gpio.close(15);                     // Close pin 15
		});
	});
	// Wheel 2 ?
	gpio.open(16, "output", function(err) {     // Open pin 16 for output
		if(err){ console.log("Error on gpio pin 16"); }
		gpio.write(16, 1, function() {          // Set pin 16 high (1)
			gpio.close(16);                     // Close pin 16
		});
	});
}

function left()
{
	// Wheel 1 ?
	gpio.open(15, "output", function(err) {     // Open pin 15 for output
		if(err){ console.log("Error on gpio pin 16"); }
		gpio.write(15, 1, function() {          // Set pin 15 high (1)
			gpio.close(15);                     // Close pin 15
		});
	});
}

function right()
{
	// Wheel 2 ?
	gpio.open(16, "output", function(err) {     // Open pin 16 for output
		if(err){ console.log("Error on gpio pin 16"); }
		gpio.write(16, 1, function() {          // Set pin 16 high (1)
			gpio.close(16);                     // Close pin 16
		});
	});
}

/* Globals */
global.robin.legs = {};
global.robin.legs.forward = forward;
global.robin.legs.backward = backward;
global.robin.legs.left = left;
global.robin.legs.right = right;
