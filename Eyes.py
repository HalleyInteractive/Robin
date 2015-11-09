
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

	def __init__(self):
		Nerves.__init__(self)
		self.face_cascade = cv2.CascadeClassifier(self.face_cascade_path)
		print "Robin Eyes"

	def start_looking(self):
		# Start looking for faces
		self.video_capture = cv2.VideoCapture(0)
		#self.looking = True
		self.dispatchEvent('start')
		while self.looking:
			self.locate_face()

	def stop_looking(self):
		# Stop looking for faces
		self.looking = False
		self.video_capture.release()
		cv2.destroyAllWindows()

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

		# Draw a rectangle around the faces
	    for (x, y, w, h) in faces:
	        cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 3)

		#time.sleep(1)

	    # Display the resulting frame
	    cv2.imshow('Video', frame)

	    if cv2.waitKey(1) & 0xFF == ord('q'):
	        self.stop_looking()

def joe():
	print "Starting"

test = Eyes()
test.addEventListener('start', joe)
test.start_looking()
