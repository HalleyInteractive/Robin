from Aura import Aura
import RPi.GPIO as GPIO

class LedTest(object):

	green = 22
	red = 23
	aura = None

	def __init__(self):
		GPIO.setwarnings(False)
		GPIO.setmode(GPIO.BCM)
		GPIO.setup(self.green, GPIO.OUT)
		GPIO.setup(self.red, GPIO.OUT)

		self.green_on()

		self.aura = Aura()
		self.aura.addEventListener(Aura.EVENT_OBJECT_CLOSE, self.red_on)
		self.aura.addEventListener(Aura.EVENT_OBJECT_CLEAR, self.green_on)
		self.aura.start_scanning()

	def green_on(self):
		self.set_green_light(True)
		self.set_red_light(False)

	def red_on(self):
		self.set_green_light(False)
		self.set_red_light(True)

	def set_green_light(self, status):
		GPIO.output(self.green, status)

	def set_red_light(self, status):
		GPIO.output(self.red, status)

leds = LedTest()
