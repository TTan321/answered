from flask import Blueprint, request
from app.models import db, Tag
from ..forms.tag_form import TagForm
from flask_login import current_user

tag_routes = Blueprint('tags', __name__)

# Get all tags
@tag_routes.route('')
def get_tags():
    tags = Tag.query.all()
    if len([tag.to_dict_tag() for tag in tags]):
        return {'tags': [tag.to_dict_tag_rel() for tag in tags]}
    return {'error': 'query failed'}

# Add a tag
@tag_routes.route('', methods=['POST'])
def add_tag():
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        tagExist = Tag.query.filter(Tag.name == form.data['name'])
        if tagExist:
            return {'message':'name exist for'}
        else:
            data = Tag(
                name = form.data['name']
                image_url = form.data['image_url']
            )
            db.session.add(data)
            db.session.commit()
            return {'tag': data.to_dict_tag_rel()}
    return form.errors
