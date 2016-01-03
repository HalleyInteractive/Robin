import time
import RPi.GPIO as GPIO
from Nerves import Nerves

class Aura(Nerves):

	gpio_trig = 17
	gpio_echo = 27
	scan_interval = 1 # in seconds
	scanning = False
	distance = 0
	treshold = 10
	too_close = False

	EVENT_OBJECT_CLOSE = "eyes.object.close"
	EVENT_OBJECT_CLEAR = "eyes.object.clear"

	def __init__(self):
		Nerves.__init__(self)
		GPIO.setwarnings(False)
		GPIO.setmode(GPIO.BCM)
		GPIO.setup(self.gpio_trig, GPIO.OUT)
		GPIO.setup(self.gpio_echo, GPIO.IN)

	def start_scanning(self):
		self.scanning = True
		self.scan()

	def stop_scanning(self):
		self.scanning = False
		GPIO.cleanup()

	def scan(self):
		if self.scanning:
			self.distance = self.get_distance()
			self.check_distance(self.distance)
			time.sleep(self.scan_interval)
			self.scan()

	def get_distance(self):
		GPIO.output(self.gpio_trig, GPIO.LOW)
		time.sleep(0.3)
		GPIO.output(self.gpio_trig, True)
		time.sleep(0.00001)
		GPIO.output(self.gpio_trig, False)
		while GPIO.input(self.gpio_echo) == 0:
			signaloff = time.time()
		while GPIO.input(self.gpio_echo) == 1:
			signalon = time.time()
		timepassed = signalon - signaloff
		return timepassed * 17000

	def check_distance(self, distance):
		#print "Distance: %s" % round(distance, 2)
		if distance < self.treshold and not self.too_close:
			self.dispatchEvent(self.EVENT_OBJECT_CLOSE)
			self.too_close = True
		elif distance > self.treshold and self.too_close:
			self.dispatchEvent(self.EVENT_OBJECT_CLEAR)
			self.too_close = False
