from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class QuestionForm(FlaskForm):
    userId = IntegerField('userId')
    question = StringField('Question', validators=[DataRequired()])
