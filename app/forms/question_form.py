from flask_wtf import FlaskForm
from wtforms import Stringfield, Integerfield, DateField
from wtforms.validators import DataRequired

class QuestionForm(FlaskForm):
    userId = Integerfield('userId', validators=[DataRequired()])
    question = Stringfield('Question', validators=[DataRequired()])

class EditQuestionForm(FlaskForm):
    userId = Integerfield('userId', validators=[DataRequired()])
    question = Stringfield('Question', validators=[DataRequired()])
    updatedAt = DateField('Date', validators=[DataRequired()])
