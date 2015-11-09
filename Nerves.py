
class Nerves(object):

	def __init__(self):
		self.events = {}
		print "Nerves"

	def addEventListener(event, callback):
		if event not in self.events:
			self.events[event] = []
		self.events[event].append(callback)
		return True

	def removeEventListener(event, callback):
		if event not in self.events:
			return False
		self.events[event].remove(callback)
		return True

	def dispatchEvent(event):
		if event in self.events:
			for callback in self.events[event]:
				callback()
		return True
