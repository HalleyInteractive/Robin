
import cv2
import sys
import time
from Nerves import Nerves
import numpy as np


class Eyes(Nerves):

	face_cascade_path = 'assets/haarcascade_frontalface_default.xml'
	face_cascade = None
	video_capture = None
	has_face = False
	face_center = {'x':0, 'y':0}
	looking = False;

	EVENT_START_LOOKING = "eyes.start.looking"
	EVENT_STOP_LOOKING = "eyes.stop.looking"
	EVENT_FACE_FOUND = "eyes.face.found"
	EVENT_FACE_LOST = "eyes.face.lost"
	EVENT_TAKE_SNAPSHOT = "eyes.take.snapshot"

	def __init__(self):
		Nerves.__init__(self)
		self.face_cascade = cv2.CascadeClassifier(self.face_cascade_path)
		self.addEventListener(self.EVENT_TAKE_SNAPSHOT, self.take_snapshot)

	def start_looking(self):
		self.video_capture = cv2.VideoCapture(0)
		self.looking = True
		self.dispatchEvent(self.EVENT_START_LOOKING)
		while self.looking:
			self.locate_face()

	def stop_looking(self):
		self.looking = False
		self.video_capture.release()
		cv2.destroyAllWindows()
		self.dispatchEvent(self.EVENT_STOP_LOOKING)

	def take_snapshot(self):
		ret, frame = self.video_capture.read()
		name = "snapshots/snapshot.jpg"
		cv2.imwrite(name, frame)
		self.stop_looking()

	def locate_face(self):
		ret, frame = self.video_capture.read()
		gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
		faces = self.face_cascade.detectMultiScale(
			gray,
			scaleFactor=1.1,
			minNeighbors=5,
			minSize=(30, 30),
			flags=cv2.cv.CV_HAAR_SCALE_IMAGE
		)

		frame_center_x = np.size(frame, 1) / 2
		frame_center_y = np.size(frame, 0) / 2

		if len(faces) > 0 and not self.has_face:
			self.has_face = True
			self.dispatchEvent(self.EVENT_FACE_FOUND)
		elif len(faces) == 0 and self.has_face:
			self.has_face = False
			self.dispatchEvent(self.EVENT_FACE_LOST)

		if len(faces) > 0:
			self.face_center['x'] = (faces[0][0] + (faces[0][2] / 2)) - frame_center_x
			self.face_center['y'] = (faces[0][1] + (faces[0][3] / 2)) - frame_center_y
			cv2.line(frame, (frame_center_x, frame_center_y),(frame_center_x + self.face_center['x'], frame_center_y + self.face_center['y']), (0, 255,0), 2)

		# Draw a rectangle around the faces
		for (x, y, w, h) in faces:
			cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 3)

		time.sleep(1)

		# Display the resulting frame
		cv2.imshow('Video', frame)

		if cv2.waitKey(1) & 0xFF == ord('q'):
			self.stop_looking()
