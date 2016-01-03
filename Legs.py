import RPi.GPIO as GPIO
from time import sleep
from Nerves import Nerves

class Legs(Nerves):

	motor_left = {
		'forward' : 23,
		'backward' : 24,
		'enable' : 25
	}

	motor_right = {
		'forward' : 17,
		'backward' : 27,
		'enable' : 22
	}

	DIRECTION_FORWARD = 'forward'
	DIRECTION_BACKWARD = 'backward'

	def __init__(self):
		GPIO.setmode(GPIO.BCM)
		GPIO.setup(self.motor_left.forward, GPIO.OUT)
		GPIO.setup(self.motor_left.backward, GPIO.OUT)
		GPIO.setup(self.motor_left.enable, GPIO.OUT)
		GPIO.setup(self.motor_right.forward, GPIO.OUT)
		GPIO.setup(self.motor_right.backward, GPIO.OUT)
		GPIO.setup(self.motor_right.enable, GPIO.OUT)

	def forward(self):
		set_motor(self.motor_left, self.DIRECTION_FORWARD)
		set_motor(self.motor_right, self.DIRECTION_FORWARD)

	def backward(self):
		set_motor(self.motor_left, self.DIRECTION_BACKWARD)
		set_motor(self.motor_right, self.DIRECTION_BACKWARD)

	def left(self):
		set_motor(self.motor_left, self.DIRECTION_BACKWARD)
		set_motor(self.motor_right, self.DIRECTION_FORWARD)

	def right(self):
		set_motor(self.motor_left, self.DIRECTION_FORWARD)
		set_motor(self.motor_right, self.DIRECTION_BACKWARD)

	def stop(self):
		GPIO.output(self.motor_left.enable, GPIO.HIGH)
		GPIO.output(self.motor_right.enable, GPIO.LOW)
		GPIO.cleanup()

	def set_motor(motor, direction):
		GPIO.output(motor.forward, GPIO.HIGH if direction is self.DIRECTION_FORWARD else GPIO.LOW)
		GPIO.output(motor.backward, GPIO.HIGH if direction is self.DIRECTION_BACKWARD else GPIO.LOW)
		GPIO.output(motor.enable, GPIO.HIGH)

legs = Legs()
legs.forward()
sleep(1)
legs.backward()
sleep(1)
legs.left()
sleep(1)
legs.right()
sleep(1)
legs.stop()
