from flask_wtf import FlaskForm
from wtforms import (StringField, SubmitField, PasswordField)


class RegisterForm(FlaskForm):
    username = StringField("Username: ")

    password = PasswordField("Password:")
    password_confirm = PasswordField("Confirm Password: ")

    submit = SubmitField("Submit")

class LoginForm(FlaskForm):
    username = StringField("Username: ")

    password = PasswordField("Password: ")

    submit = SubmitField("Submit")
