import time
from Eyes import Eyes

def faceFoundHandler():
	print "FACE FOUND"

def faceLostHandler():
	print "FACE LOST"

eyes = Eyes()
eyes.addEventListener(Eyes.EVENT_FACE_FOUND, faceFoundHandler)
eyes.addEventListener(Eyes.EVENT_FACE_LOST, faceLostHandler)
eyes.start_looking()

time.sleep(5)
Eyes.dispatchEvent(Eyes.EVENT_TAKE_SNAPSHOT)
print "SNAPPIE"
