from flask import (Flask, render_template, session, 
                   redirect, url_for, g, request)
from flask_session import Session
from database import get_db, close_db
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

# You may not need 'forms.py' anymore since everything 
# can be done using JavaScript; remove later.
from forms import (RegisterForm, LoginForm)


app = Flask(__name__)

app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = "filesystem"
Session(app)

app.teardown_appcontext(close_db)


# ----------- Global Decorators ---------- #
@app.before_request
def load_logged_in_user():
    g.user = session.get('user_id', None)
    g.admin = session.get('admin_id', None)


def login_required(view):
    @wraps(view)
    def wrapped_view(*args, **kwargs):
        if g.user is None:
            return redirect(url_for('login_in', next=request.url))
        return view(*args, **kwargs)
    return wrapped_view


def admin_required(view):
    @wraps(view)
    def wrapped_view(*args, **kwargs):
        if g.admin is None:
            return render_template('login/access_denied.html')
        return view(*args, **kwargs)
    return wrapped_view

                   
# ------------ Default Routes ------------ #
@app.route("/")
def getting_homepage():
    return render_template('index.html', title="Home")


# ----------- Login Routes --------------- #
@app.route("/register", methods=["GET", "POST"])
def registering():
    form = RegisterForm()

    if request.method == 'POST':
        pass


@app.route("/login", methods=["GET", "POST"])
def login_in():
    form = LoginForm()

    if request.method == 'POST':
        pass

