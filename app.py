from flask import Flask, render_template, request, redirect, url_for, session
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_very_secret_key_here'  # Remember to set a real secret key for session management

# MongoDB URI
mongo_uri = "mongodb://Santi:12345@localhost/Usuarios"
client = MongoClient(mongo_uri)

# Access your database
db = client['Usuarios']

@app.route('/')
def home():
    return render_template('Vistas/inicio.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = db.users.find_one({"correo": email})
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
        db.users.insert_one({
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
        user_email = session['user']
        user_info = db.users.find_one({"correo": user_email})
        if user_info:
            # Passing user's name and email to the template
            return render_template('Vistas/Cuenta.html', name=user_info['nombre'], email=user_email)
        else:
            return "User not found", 404
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


if __name__ == '__main__':
    app.run(debug=True)
