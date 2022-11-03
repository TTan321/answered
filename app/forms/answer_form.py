from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class AnswerForm(FlaskForm):
    questionId = IntegerField('questionId', validators=[DataRequired()])
    answer = StringField('Answer', validators=[DataRequired()])
