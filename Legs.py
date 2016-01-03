import RPi.GPIO as GPIO
from time import sleep
from Nerves import Nerves

class Legs(Nerves):

	motor_left_forward = 23
	motor_left_backward = 24
	motor_left_enable = 25

	motor_right_forward = 17
	motor_right_backward = 27
	motor_right_enable = 22

	def __init__(self):
		GPIO.setmode(GPIO.BCM)
		GPIO.setup(self.motor_left_forward, GPIO.OUT)
		GPIO.setup(self.motor_left_backward, GPIO.OUT)
		GPIO.setup(self.motor_left_enable, GPIO.OUT)
		GPIO.setup(self.motor_right_forward, GPIO.OUT)
		GPIO.setup(self.motor_right_backward, GPIO.OUT)
		GPIO.setup(self.motor_right_enable, GPIO.OUT)

	def forward(self):
		GPIO.output(self.motor_left_forward, GPIO.HIGH)
		GPIO.output(self.motor_left_backward, GPIO.LOW)
		GPIO.output(self.motor_right_forward, GPIO.HIGH)
		GPIO.output(self.motor_right_backward, GPIO.LOW)

		GPIO.output(self.motor_left_enable, GPIO.HIGH)
		GPIO.output(self.motor_right_enable, GPIO.HIGH)

	def backward(self):
		GPIO.output(self.motor_left_forward, GPIO.LOW)
		GPIO.output(self.motor_left_backward, GPIO.HIGH)
		GPIO.output(self.motor_right_forward, GPIO.LOW)
		GPIO.output(self.motor_right_backward, GPIO.HIGH)

		GPIO.output(self.motor_left_enable, GPIO.HIGH)
		GPIO.output(self.motor_right_enable, GPIO.HIGH)

	def left(self):
		GPIO.output(self.motor_left_forward, GPIO.HIGH)
		GPIO.output(self.motor_left_backward, GPIO.LOW)
		GPIO.output(self.motor_right_forward, GPIO.LOW)
		GPIO.output(self.motor_right_backward, GPIO.HIGH)

		GPIO.output(self.motor_left_enable, GPIO.HIGH)
		GPIO.output(self.motor_right_enable, GPIO.HIGH)

	def right(self):
		GPIO.output(self.motor_left_forward, GPIO.LOW)
		GPIO.output(self.motor_left_backward, GPIO.HIGH)
		GPIO.output(self.motor_right_forward, GPIO.HIGH)
		GPIO.output(self.motor_right_backward, GPIO.LOW)

		GPIO.output(self.motor_left_enable, GPIO.HIGH)
		GPIO.output(self.motor_right_enable, GPIO.HIGH)

	def stop(self):
		GPIO.output(self.motor_left_enable, GPIO.HIGH)
		GPIO.output(self.motor_right_enable, GPIO.LOW)
		GPIO.cleanup()
