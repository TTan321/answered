from flask_wtf import FlaskForm
from wtforms import Stringfield, Integerfield, DateField
from wtforms.validators import DataRequired

class AnswerForm(FlaskForm):
    userId = Integerfield('userId', validators=[DataRequired()])
    questionId = Integerfield('questionId', validators=[DataRequired()])
    answer = Stringfield('Answer', validators=[DataRequired()])

class EditAnswerForm(FlaskForm):
    userId = Integerfield('userId', validators=[DataRequired()])
    questionId = Integerfield('questionId', validators=[DataRequired()])
    answer = Stringfield('Answer', validators=[DataRequired()])
    updatedAt = DateField('Date', validators=[DataRequired()])
