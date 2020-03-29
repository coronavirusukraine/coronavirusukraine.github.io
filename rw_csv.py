import csv
def read(file_name, delimiter = ',', encoding = 'utf8'):
	csv_iter =  csv.reader(open(file_name, encoding=encoding), delimiter=delimiter)
	next(csv_iter)
	rows = [row for row in csv_iter]
	return rows

def write(data, name, title = False, delimiter = ','):
	f = open(name, 'w')
	if title:
		f.write('%s\n'% (title))
	for item in data:
		f.write('%s\n' % (delimiter.join(item)))
	f.close()