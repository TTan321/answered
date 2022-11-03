from flask_wtf import FlaskForm
from wtforms import Stringfield
from wtforms.validators import DataRequired

class QuestionForm(FlaskForm):
    question = Stringfield('Question', validators=[DataRequired()])
