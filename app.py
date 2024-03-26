from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_very_secret_key_here'  # Remember to set a real secret key for session management

# MongoDB URI
mongo_uri = "mongodb://Santi:12345@localhost/"

# Cliente de MongoDB
client = MongoClient(mongo_uri)

# Acceder a la base de datos de Usuarios
db_usuarios = client['Usuarios']

# Acceder a la base de datos de Productos
db_productos = client['Productos']

@app.route('/')
def home():
    return render_template('Vistas/inicio.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = db_usuarios.users.find_one({"correo": email})
        if user and check_password_hash(user['contraseña'], password):
            session['user'] = email
            return redirect(url_for('home_1'))
        else:
            return "Invalid credentials", 401
    return render_template('Vistas/login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        name = request.form.get('name')
        hashed_password = generate_password_hash(password)
        db_usuarios.users.insert_one({
            "nombre": name,
            "correo": email,
            "contraseña": hashed_password
        })
        return redirect(url_for('home'))
    else:
        return render_template('Vistas/register.html')

@app.route('/home-1')
def home_1():
    if 'user' in session:
        return render_template('Vistas/home-1.html')
    else:
        return redirect(url_for('login'))
    
@app.route('/categorias/alimento')
def alimento():
    if 'user' in session:
        return render_template('Vistas/alimento.html')
    else:
        return redirect(url_for('login'))

@app.route('/categorias/snacks')
def snacks():
    if 'user' in session:
        return render_template('Vistas/snacks.html')
    else:
        return redirect(url_for('login'))

@app.route('/categorias/farmapet')
def farmapet():
    if 'user' in session:
        return render_template('Vistas/Farmapet.html')
    else:
        return redirect(url_for('login'))

@app.route('/categorias/cuidado')
def cuidado():
    if 'user' in session:
        return render_template('Vistas/Cuidadohigiene.html')
    else:
        return redirect(url_for('login'))
    
@app.route('/miscompras')
def miscompras():
    if 'user' in session:
        return render_template('Vistas/mis_compras.html')
    else:
        return redirect(url_for('login'))
    
@app.route('/promociones')
def promociones():
    if 'user' in session:
        return render_template('Vistas/Promociones.html')
    else:
        return redirect(url_for('login'))
    
@app.route('/forgetpw')
def forgetpw():
    if 'user' in session:
        return render_template('Vistas/forgetpw.html')
    else:
        return redirect(url_for('login'))

@app.route('/cuenta')
def cuenta():
    if 'user' in session:
        message = request.args.get('message', None)
        user_email = session['user']
        user_info = db_usuarios.users.find_one({"correo": user_email})
        if user_info:
            # Add the message to the template rendering
            return render_template('Vistas/Cuenta.html',
                                   name=user_info['nombre'],
                                   email=user_info['correo'],
                                   direccion=user_info.get('direccion', 'No especificada'),
                                   ciudad=user_info.get('ciudad', 'No especificada'),
                                   pais=user_info.get('pais', 'No especificado'),
                                   message=message)
        else:
            return "Usuario no encontrado", 404
    else:
        return redirect(url_for('login'))


@app.route('/membresia')
def membresia():
    if 'user' in session:
        return render_template('Vistas/Membresia.html')
    else:
        return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.clear()  # This removes all items from the session
    return redirect(url_for('login'))

@app.route('/guardar_direccion', methods=['POST'])
def guardar_direccion():
    if 'user' in session:
        user_email = session['user']
        direccion = request.form['direccion']
        ciudad = request.form['ciudad']
        pais = request.form['pais']
        
        # Update the user's address
        result = db_usuarios.users.update_one(
            {"correo": user_email},
            {"$set": {"direccion": direccion, "ciudad": ciudad, "pais": pais}}
        )
        
        if result.matched_count > 0:
            # Redirect with a success message
            return redirect(url_for('cuenta', message='address_saved'))
        else:
            # Redirect with a failure message
            return redirect(url_for('cuenta', message='no_user_found'))
    else:
        # Redirect with a message indicating the user is not logged in
        return redirect(url_for('login', message='not_logged_in'))
    
@app.route('/producto')
def producto():
    if 'user' in session:
        # Usar db_productos para consultar información de productos
        products = list(db_productos.products.find({"categoria": "Agility Gold"}, {"_id": 0}))
        return render_template('Vistas/producto.html', products=products)
    else:
        return redirect(url_for('login'))

@app.route('/get-products', methods=['GET'])
def get_products():
<<<<<<< HEAD
    products = list(db_productos.products.find({}, {"_id": 0}).limit(20))  # Limita a 5 para la prueba
=======
    products = list(db_productos.products.find({}, {"_id": 0}).limit(15))  # Limita a 5 para la prueba
>>>>>>> bd523b841ed42e5c53f97b02bbfc0dcada68fc17
    return jsonify(products)




@app.route('/get-product-details/<codigo_producto>', methods=['GET'])
def get_product_details(codigo_producto):
    try:
        # Convertir a entero si el código del producto es numérico en la base de datos
        codigo_producto = int(codigo_producto)
    except ValueError:
        # Manejar el error si no es un número
        return jsonify({"error": "Código de producto inválido"}), 400

    product_details = db_productos.products.find_one({"codigo_producto": codigo_producto}, {"_id": 0})
    return jsonify(product_details if product_details else {})






if __name__ == '__main__':
    app.run(debug=True)
