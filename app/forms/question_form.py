from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class QuestionForm(FlaskForm):
    userId = IntegerField('userId')
    question = StringField('Question', validators=[DataRequired(), Length(min=20, max=250)])
