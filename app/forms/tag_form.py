from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class TagForm(FlaskForm):
    name = StringField('Tag Name', validators=[DataRequired()])
    image_url = StringField('ImageUrl', validators=[DataRequired()])
