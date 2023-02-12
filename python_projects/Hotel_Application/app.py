from datetime import datetime, timedelta


print('"{}":{}'.format('32432432', '{"date":"1/1/2020", "name":"Sunil"}'))


dString = datetime.date.today()
print(dString)

xDate = dString.strftime("%m/%d/%Y")


dString1 = datetime.date.today() - timedelta(days=1)
print((dString-dString1).days)

yDate = datetime.datetime.strptime(xDate, "%m/%d/%Y").date()
print(yDate)


