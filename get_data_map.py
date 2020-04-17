import requests
import argparse
import re
import json

area = {
	'Вінницька область': "1",
	'Волинська область': "2",
	'Дніпропетровська область': "3",
	'Донецька область': "4",
	'Житомирська область': "5",
	'Закарпатська область': "6",
	'Запорізька область': "7",
	'Івано-Франківська область': "8",
	'Київська область': "9",
	'Кіровоградська область': "10",
	'Луганська область': "11",
	'Львівська область': "12",
	'Миколаївська область': "13",
	'Одеська область': "14",
	'Полтавська область': "15",
	'Рівненська область': "16",
	'Сумська область': "17",
	'Тернопільська область': "18",
	'Харківська область': "19",
	'Херсонська область': "20",
	'Хмельницька область': "21",
	'Черкаська область': "22",
	'Чернівецька область': "23",
	'Чернігівська область': "24",
	'м. Київ': "25"
}

url = 'https://moz.gov.ua/article/news/operativna-informacija-pro-poshirennja-koronavirusnoi-infekcii-2019-ncov-'

def getAction():
	__parser = argparse.ArgumentParser(description='''get day data from MOZ''')
	__parser.add_argument('--date', type=str, action='store', dest='date', help='date like 01-01-2020', required=True)
	# __parser.add_argument('-c', type=int, action='store', dest='c', help='total sum c', required=True)
	# __parser.add_argument('-d', type=int, action='store', dest='d', help='total sum d', required=True)
	# __parser.add_argument('-r', type=int, action='store', dest='r', help='total sum r', required=True)
	__parser.add_argument('--file', type=str, action='store', dest='file', help='filename json to save data', required=True)
	return __parser.parse_args()

def getHtml(url):
	req = requests.get(url)
	return req.status_code, req.text

def getDataOld(html):
	result = [(x[0].strip(),x[1]) for x in re.findall(r'<li>(.+)&mdash;[^\d]*(\d+)', html)]
	return result

def getData(html):
	def f(data):
		patern = re.compile(data + '.+&mdash;[^\d]*(\d+)')
		res = patern.findall(html)
		return (data, res[0])
	return list(map(f, area.keys()))

def getDataTotal(html):
	def f(text):
		patern = re.compile('(\d+) ' + text)
		res = patern.findall(html)
		return int(res[0])

	return {'c': f('лабораторно'), 'd': f('летальн'), 'r': f('пацієнт')}

def getDataJson(data, data_total, arg):
	return {
		"date": "%s 10:00" % (arg.date),
		"confirmed": {area[x[0]]:{"c": int(x[1]), "d": 0, "r": 0} for x in data},
		"total": {"c": data_total['c'], "d": data_total['d'], "r": data_total['r']}
	}

def main():
	__argsActions = getAction()
	code, html = getHtml(url)
	if code != 200:
		print('error get html')
		exit()
	data = getData(html)
	data_total = getDataTotal(html)
	# print(data_total)
	# exit()
	data_json = getDataJson(data, data_total, __argsActions)

	f = open(__argsActions.file, 'w')
	f.write(json.dumps(data_json))
	f.close()


if __name__ == '__main__':
	main()