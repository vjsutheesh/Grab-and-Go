from flask import Flask, request, redirect, url_for, json, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

user_details = []
feedback_data = []
select_item=[]
selected_Item = []
details =[]
delivery=[]
delivery_item =[]

@app.route('/getdata', methods=["GET", "POST"])
def get_data():
    if request.json:
        data = request.get_json()
        print(data)
        user_details.append(data)
        print(user_details)
        return redirect(url_for("home"))


@app.route('/data', methods=["GET", "POST"])
def home():
    return user_details


@app.route('/getfeedback', methods=["GET", "POST"])
def get_feedback():
    if request.json:
        data = request.get_json()
        print(data)
        feedback_data.append(data)
        print(feedback)

        return redirect(url_for("feedback"))


@app.route('/feedback', methods=["GET", "POST"])
def feedback():
    return feedback_data


@app.route('/MenuList/<string:hotelName>', methods=["GET", "POST"])
def hotel_menu(hotelName: str):
    Menu_List = []
    VasanthamMenu = [{'DishName': "Biriyani", 'price': 100, 'quantity': 0}, {'DishName': "Fried rice", 'price': 80, 'quantity': 0}, {'DishName': "Noodles", 'price': 80, 'quantity': 0}, {'DishName': "Veg-Meals", 'price': 70, 'quantity': 0},
                     {'DishName': "Non-veg Meals", 'price': 120, 'quantity': 0}, {'DishName': "Dosai", 'price': 10, 'quantity': 0}, {'DishName': "Parotta", 'price': 10, 'quantity': 0}, {'DishName': "kothu-Parotta", 'price': 80, 'quantity': 0}]
    JallikattuMenu = [{'DishName': "Biriyani", 'price': 100, 'quantity': 0}, {'DishName': "Fried rice", 'price': 80, 'quantity': 0}, {'DishName': "Noodles", 'price': 80, 'quantity': 0}, {'DishName': "Veg-Meals", 'price': 70, 'quantity': 0},
                      {'DishName': "Non-veg Meals", 'price': 120, 'quantity': 0}, {'DishName': "Dosai", 'price': 10, 'quantity': 0}, {'DishName': "Parotta", 'price': 10, 'quantity': 0}, {'DishName': "kothu-Parotta", 'price': 80, 'quantity': 0}]
    TeaTimeMenu = [{'DishName': "Biriyani", 'price': 100, 'quantity': 0}, {'DishName': "Fried rice", 'price': 80, 'quantity': 0}, {'DishName': "Noodles", 'price': 80, 'quantity': 0}, {'DishName': "Veg-Meals", 'price': 70, 'quantity': 0},
                   {'DishName': "Non-veg Meals", 'price': 120, 'quantity': 0}, {'DishName': "Dosai", 'price': 10, 'quantity': 0}, {'DishName': "Parotta", 'price': 10, 'quantity': 0}, {'DishName': "kothu-Parotta", 'price': 80, 'quantity': 0}]
    A1BiriyaniMenu = [{'DishName': "Biriyani", 'price': 100, 'quantity': 0}, {'DishName': "Fried rice", 'price': 80, 'quantity': 0}, {'DishName': "Noodles", 'price': 80, 'quantity': 0}, {'DishName': "Veg-Meals", 'price': 70, 'quantity': 0},
                      {'DishName': "Non-veg Meals", 'price': 120, 'quantity': 0}, {'DishName': "Dosai", 'price': 10, 'quantity': 0}, {'DishName': "Parotta", 'price': 10, 'quantity': 0}, {'DishName': "kothu-Parotta", 'price': 80, 'quantity': 0}]
    if (hotelName == "Vasantham"):
        Menu_List = VasanthamMenu
    if (hotelName == "Jallikattu"):
        Menu_List = JallikattuMenu
    if (hotelName == "Tea-Time"):
        Menu_List = TeaTimeMenu
    if (hotelName == "A1-Biriyani"):
        Menu_List = A1BiriyaniMenu
    return Menu_List


@app.route('/HotelDesc/<string:hotelName>', methods=['GET', 'POST'])
def hotel_desc(hotelName: str):
    hotel_desc = []
    vasanthamDesc = [{'hotelName': "Vasantham", 'rating': 3.5,
                      'Desc': "( Veg and Non-Veg )", 'location': "Omalur road , opposite to GCE "}]
    jallikattuDesc = [{'hotelName': "Jallikattu", 'rating': 4.0,
                       'Desc': "Hotel Jallikattu is very busy in 7:00 to 9:00 in nights", 'location': "Omalur road , opposite to GCE "}]
    teatimeDesc = [{'hotelName': "Tea-Time", 'rating': 4.5,
                    'Desc': "Veg and Non-Veg", 'location': "Omalur road , opposite to GCE "}]
    a1biriyaniDesc = [{'hotelName': "A1-Biriyani", 'rating': 4.7,
                       'Desc': "Hotel A1-Biriyani is very busy in 7:00 to 9:00 in nights", 'location': "Omalur road , opposite to GCE "}]
    if (hotelName == "Vasantham"):
        hotel_desc = vasanthamDesc
    if (hotelName == "Jallikattu"):
        hotel_desc = jallikattuDesc
    if (hotelName == "Tea-Time"):
        hotel_desc = teatimeDesc
    if (hotelName == "A1-Biriyani"):
        hotel_desc = a1biriyaniDesc
    return hotel_desc


@app.route('/selectedItem', methods=['POST', 'GET'])
def get_Items():
    get_item = request.get_json()
    select_item.clear()
    select_item.append(get_item)
    print("hello")
    print(select_item)
    return select_item


@app.route('/cartItems', methods=['GET', 'POST'])
def get_Cart():
    cart_item=[]
    for data in select_item:
        print("hai")
        print(data)
        for i in data:
            if i['quantity'] > 0 :
                cart_item.append(i)
                selected_Item.append(cart_item)
    print("cart items :")
    print(cart_item)
    return cart_item
@app.route('/postadmin',methods=['POST'])
def post_Admin():
    get_item = request.get_json()
    details.clear()
    details.append(get_item)
    return details
@app.route('/getadmin',methods=['GET'])
def get_Admin():
    return details
@app.route('/inadmin',methods=['POST'])
def in_delivery():
    get_item = request.get_json()
    delivery.clear()
    delivery_item.clear()
    delivery.append(get_item)
    return delivery
@app.route('/outadmin',methods=['GET'])
def out_delivery():
    delivery_item.clear()
    for i in delivery:
        delivery_item.append(i)
    print(delivery_item)
    return delivery_item

