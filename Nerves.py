
class Nerves(object):

	events = {}

	def __init__(self):
		pass

	@staticmethod
	def addEventListener(event, callback):
		if event not in Nerves.events:
			Nerves.events[event] = []
		Nerves.events[event].append(callback)
		return True

	@staticmethod
	def removeEventListener(event, callback):
		if event not in Nerves.events:
			return False
		Nerves.events[event].remove(callback)
		return True

	@staticmethod
	def dispatchEvent(event):
		if event in Nerves.events:
			for callback in Nerves.events[event]:
				callback()
		return True
