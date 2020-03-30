import argparse
import json

def getAction():
	__parser = argparse.ArgumentParser(description='''add day data''')
	__parser.add_argument('--data', type=str, action='store', dest='data', help='data', required=True)
	__parser.add_argument('--data_add', type=str, action='store', dest='data_add', help='data add', required=True)
	return __parser.parse_args()

def getData(file):
	with open(file, 'r') as f:
		return json.load(f)

def check(date, data):
	l = [x for x in data if x['date'] == date]
	return len(l) > 0

def checkSum(data):
	def fSum(name):
		return sum([data['confirmed'][key][name] for key in data['confirmed'].keys()])
	def check(name):
		_sum = fSum(name)
		if _sum!=data['total'][name]:
			print('Error, total - %s and sum = %s' % (data['total'][name], _sum))
			error = True
	error = False
	check('c')
	check('d')
	check('r')
	if error: exit()

def update(data, dataAdd):
	return [x if x['date']!=dataAdd['date'] else dataAdd for x in data]


def main():
    __argsActions = getAction()
    data = getData(__argsActions.data)
    dataAdd = getData(__argsActions.data_add)

    checkSum(dataAdd)
    if check(dataAdd['date'], data):
    	data = update(data, dataAdd)
    else:
	    data.append(dataAdd)
    
    f = open(__argsActions.data, 'w')
    f.write(json.dumps(data))
    f.close()
    
    
if __name__ == '__main__':
	main()