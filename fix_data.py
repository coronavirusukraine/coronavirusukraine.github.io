import argparse
import json
import add_data

def getAction():
	__parser = argparse.ArgumentParser(description='''fix data file, add total blocks''')
	__parser.add_argument('--file', type=str, action='store', dest='file', help='fixing file', required=True)
	return __parser.parse_args()

def fix(data):
	def fixData(data):
		__sum = sum([data['confirmed'][key]['c'] for key in data['confirmed'].keys()])
		if ('total' not in data):
			data['total'] = {"c": __sum, "d": 0, "r": 0}
		print(data['date'], __sum, data['total']['c'])
		

	return [fixData(x) for x in data]

def main():
	__argsActions = getAction()
	data = add_data.getData(__argsActions.file)
	fix(data)
	f = open(__argsActions.file, 'w')
	f.write(json.dumps(data))
	f.close()

if __name__ == '__main__':
	main()