from flask_wtf import FlaskForm
from wtforms import Stringfield, Integerfield
from wtforms.validators import DataRequired

class AnswerForm(FlaskForm):
    questionId = Integerfield('questionId', validators=[DataRequired()])
    answer = Stringfield('Answer', validators=[DataRequired()])
