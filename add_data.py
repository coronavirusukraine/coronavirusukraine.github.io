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

def main():
    __argsActions = getAction()
    data = getData(__argsActions.data)
    dataAdd = getData(__argsActions.data_add)

    if check(dataAdd['date'], data):
    	return

    data.append(dataAdd)
    f = open(__argsActions.data, 'w')
    f.write(json.dumps(data))
    f.close()
    
    
if __name__ == '__main__':
	main()