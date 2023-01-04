from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    comment = StringField('Comment', validators=[DataRequired()])
    user_id = IntegerField('User Id', validators=[DataRequired()])
    answer_id = IntegerField('Answer Id', validators=[DataRequired()])
