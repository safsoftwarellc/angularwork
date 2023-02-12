from flask import Flask, request, jsonify, render_template
import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/aaaaa')
def sample_test():
    return '{"Welcome":"Hotel Management Application"}'

@app.route('/')
def root():
    return render_template('index.html')

"""
How to run Falsk app
    - source hotel_env/bin/activate (From Environments)
    - flask --app hotel_app.py run (Just Run only)
    - flask --app hotel_app.py --debug run (for debug mode)
"""

user_info = {
    'admin': {
        'firstName': 'admin',
        'lastName': 'admin',
        'DOB': '08/30/1988',
        'gender':'Male',
        'email':'admin@gmail.com',
        'phone': '+1-704-000-9999'
    },
    'user': {
        'firstName': 'user',
        'lastName': 'user',
        'DOB': '08/30/1995',
        'gender':'Female',
        'email':'user@gmail.com',
        'phone': '+1-704-000-9998'
    }
}
menu_info = {
    'Veg':[
        {'name': 'Hyderabadi Veg Dum Biryani',                  'price': '$25.00'},
        {'name': 'Hyderabad Veg Dum Biryani Family Pack',       'price': '$70.00'},
        {'name': 'Ulavacharu Veg Dum Biryani',                  'price': '$24.00'},
        {'name': 'Ulavacharu Veg Dum Biryani Family Pack ',     'price': '$55.00'},
        {'name': 'Gongura Veg Biryani ',                        'price': '$28.00'},
        {'name': 'Gongura Veg Biryani Family Pack ',            'price': '$65.00'},
        {'name': 'Avakai Veg Biryani',                          'price': '$25.00'},
        {'name': 'Avakai Veg Briyani Family Pack',              'price': '$55.00'},
        {'name': 'Gobi 65 Biryani',                             'price': '$25.00'},
        {'name': 'Paneer Biryani',                              'price': '$25.00'},
    ],

    'Non-Veg': [
        {'name': 'Hyderabadi Chicken Dum Biryani',                  'price': '$25.00'},
        {'name': 'Hyderabad Chicken Dum Biryani Family Pack',       'price': '$70.00'},
        {'name': 'Ulavacharu Chicken Dum Biryani',                  'price': '$24.00'},
        {'name': 'Ulavacharu Chicken Dum Biryani Family Pack ',     'price': '$55.00'},
        {'name': 'Gongura Chicken Biryani ',                        'price': '$28.00'},
        {'name': 'Gongura Chicken Biryani Family Pack ',            'price': '$65.00'},
        {'name': 'Avakai Chicken Biryani',                          'price': '$25.00'},
        {'name': 'Avakai Chicken Briyani Family Pack',              'price': '$55.00'},
        {'name': 'Bawarchi Special Boneless Chicken Biryani',       'price': '$25.00'},
        {'name': 'Chicken 65 Biryani Family Pack',                  'price': '$25.00'}
    ]

}

orders_info = {
    202212100: {
        'date': '12/28/2022',
        'details': [
            {'item': 'Gongura Chicken Biryani Family Pack',             'qty': 1,  'price': '$25'},
            {'item': 'Bawarchi Special Boneless Chicken Biryani',       'qty': 1,  'price': '$25'},
            {'item': 'Gobi 65 Biryani',                                 'qty': 1,  'price': '$25'},
            {'item': 'Ulavacharu Veg Dum Biryani',                      'qty': 1,  'price': '$25'},
            {'item': 'Avakai Veg Biryani',                              'qty': 1,  'price': '$25'},
            {'item': 'Gongura Chicken Biryani Family Pack',             'qty': 1,  'price': '$25'},
            {'item': 'Total',                                           'qty': 7,  'price': '$230'}
        ]
    }
}

next_order_number_in_list = 202212100

contactus_info = {
    'All_Messages': [
        {
            'from': 'dsfds@gmail.com',
            'subject': 'my first message',
            'message': 'hey thanks for the website'
        }
    ]
}

@app.route('/doLogin', methods=['GET'])
def check_login():
    userName=request.args.get('userName')
    password_d=request.args.get('password')

    if userName in user_info:
        return jsonify({'status':'True'})
    else:
        return jsonify({'status':'False'})


@app.route('/getUserInfo', methods=['GET'])
def get_user_profile():
    userName=request.args.get('userName')
    if userName in user_info:
        return jsonify(user_info.get(userName))
    else:
        return jsonify({'status':'{} - User Information Not found!'.format(userName)})


@app.route('/getMenu', methods=['GET'])
def get_menu_info_by_type():
    menuType=request.args.get('menuType')

    if menuType in menu_info:
        return jsonify(menu_info.get(menuType))
    else:
        return jsonify({'status':'{} - Menu Information Not found!'.format(menuType)})

@app.route('/getNextOrderNumber', methods=['GET'])
def get_next_order_number():
    global next_order_number_in_list
    next_order_number_in_list = next_order_number_in_list + 1
    return jsonify({'status': next_order_number_in_list})

@app.route('/createOrder', methods=['POST', 'PUT'])
def add_order():
    orderNumber=request.args.get('orderNumber')
    json_data = request.get_json()
    dString = datetime.date.today()
    orders_info[int(orderNumber)] = {
        'date': dString.strftime("%m/%d/%Y"),
        'details': json_data
    }
    return jsonify({'status':'{} - Order Created'.format(orderNumber)})

@app.route('/getOrderInfo', methods=['GET'])
def get_order_info():
    orderNumber=request.args.get('orderNumber')
    dateFrom_raw=request.args.get('dateFrom')
    dateTo_raw=request.args.get('dateTo')
    return get_order_info_from_orders_info(orderNumber, dateFrom_raw, dateTo_raw)


@app.route('/getAllOrders', methods=['GET'])
def get_all_orders():
    return get_all_orders_from_orders_info()


@app.route('/getOrderHistory', methods=['GET'])
def get_order_history():
    orderNumber=request.args.get('orderNumber')
    dateFrom_raw=request.args.get('dateFrom')
    dateTo_raw=request.args.get('dateTo')
    orders_from_order_info = []
    if(orderNumber!='' or dateFrom_raw !='' or dateTo_raw!=''):
        orders_from_order_info = get_order_info_from_orders_info(orderNumber, dateFrom_raw, dateTo_raw)
    else:
        orders_from_order_info = get_all_orders_from_orders_info()

    order_history_list = []

    for index in range(len(orders_from_order_info)):
        order = orders_from_order_info[index]
        for key in order.keys():
            order_date = order.get(key)['date']
            order_details = order.get(key)['details']
            for order_item in order_details:
                if(order_item['item'] == 'Total'):
                    order_history_list.append({
                        'sno': index+1,
                        'orderNumber': key,
                        'orderDate': order_date,
                        'orderAmount': order_item['price']
                    })
    return order_history_list


@app.route('/postContactUsMessage', methods=['POST', 'PUT'])
def post_contactus_info():
    json_data = request.get_json()
    contactus_info.get('All_Messages').append(json_data)
    return jsonify({'status':'Message Submitted'})



def get_all_orders_from_orders_info():
    orders_to_send = []
    for key in orders_info.keys():
        orders_to_send.append({key :  orders_info.get(key)})
    return orders_to_send


def get_order_info_from_orders_info(orderNumber, dateFrom_raw, dateTo_raw):

    orders_to_send = []
    if dateFrom_raw != '':
        dateFrom = datetime.datetime.strptime(dateFrom_raw, "%m/%d/%Y").date()
    else:
        dateFrom = ''
    if dateTo_raw != '':
        dateTo = datetime.datetime.strptime(dateTo_raw, "%m/%d/%Y").date()
    else:
        dateTo = ''

    if orderNumber != '':
        if int(orderNumber) in orders_info:
            orders_to_send.append({int(orderNumber) :  orders_info.get(int(orderNumber))})
        return orders_to_send
    if dateFrom != '' and dateTo == '':
        # Get all data after This Date
        for key in orders_info.keys():
            order_details = orders_info.get(key)
            order_date_raw = order_details.get('date')
            order_date = datetime.datetime.strptime(order_date_raw, "%m/%d/%Y").date()
            if order_date >= dateFrom:
                order_text = {
                   key :  order_details
                }
                orders_to_send.append(order_text)
        return orders_to_send
    elif dateFrom == '' and dateTo != '':
        # Get all data Before This Date
        for key in orders_info.keys():
            order_details = orders_info.get(key)
            order_date_raw = order_details.get('date')
            order_date = datetime.datetime.strptime(order_date_raw, "%m/%d/%Y").date()
            if order_date <= dateTo:
                order_text = {
                   key :  order_details
                }
                orders_to_send.append(order_text)
            return orders_to_send
    elif dateFrom != '' and dateTo != '':
        # Get all data Between These Dates
        for key in orders_info.keys():
            order_details = orders_info.get(key)
            order_date_raw = order_details.get('date')
            order_date = datetime.datetime.strptime(order_date_raw, "%m/%d/%Y").date()
            if order_date >= dateFrom and order_date <= dateTo:
                order_text = {
                   key :  order_details
                }
                orders_to_send.append(order_text)
            return orders_to_send
    else:
        return orders_to_send



if __name__ == '__main__':
    app.run(debug=True)
