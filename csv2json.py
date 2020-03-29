import argparse
import rw_csv
import json

def getAction():
	__parser = argparse.ArgumentParser(description='''csv to json''')
	__parser.add_argument('--csv', type=str, action='store', dest='csv', help='csv', required=True)
	return __parser.parse_args()

def getData(file):
	return rw_csv.read(file)

def createJsonData(data):
	def createDict(_id, data):
		day = 3
		for x in data:
			d[str(day)][_id] = x if x != '' else '0'
			day +=1

	def setData(key):
		return {
			"date": "%s-03-2020 10:00" % (key if int(key) > 9 else '0%s' % (key)),
			"confirmed": {_key:{'c': int(d[str(key)][_key]), 'd': 0, 'r': 0} for _key in d[str(key)].keys()}
		}

	d = {str(x):{} for x in range(3,30)}
	for x in data:
		createDict(x[0], x[2:])
	l = [setData(key) for key in d.keys()]
	return l

def main():
    __argsActions = getAction()
    data = getData(__argsActions.csv)
    data_json = createJsonData(data)
    f = open('data_begin.json', 'w')
    f.write(json.dumps(data_json))
    f.close()
    
if __name__ == '__main__':
	main()