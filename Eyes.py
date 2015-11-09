
import cv2
import sys
import time
from Nerves import Nerves


class Eyes(Nerves):

	face_cascade_path = 'assets/haarcascade_frontalface_default.xml'
	face_cascade = None
	video_capture = None
	has_face = False
	face_centre = {'x':0, 'y':0}
	looking = False;

	EVENT_START_LOOKING = "eyes.start.looking"
	EVENT_STOP_LOOKING = "eyes.stop.looking"
	EVENT_FACE_FOUND = "eyes.face.found"
	EVENT_FACE_LOST = "eyes.face.lost"

	def __init__(self):
		Nerves.__init__(self)
		self.face_cascade = cv2.CascadeClassifier(self.face_cascade_path)

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

		if len(faces) > 0 and not self.has_face:
			self.has_face = True
			self.dispatchEvent(self.EVENT_FACE_FOUND)
		elif len(faces) == 0 and self.has_face:
			self.has_face = False
			self.dispatchEvent(self.EVENT_FACE_LOST)


		# Draw a rectangle around the faces
		for (x, y, w, h) in faces:
			cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 3)

		time.sleep(1)

		# Display the resulting frame
		cv2.imshow('Video', frame)

		if cv2.waitKey(1) & 0xFF == ord('q'):
			self.stop_looking()
