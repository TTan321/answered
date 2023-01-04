
from flask import Blueprint, request
from app.models import db, Answer, Comment
from app.forms import CommentForm
from datetime import date


comment_routes = Blueprint('comments', __name__)


# Update a comment for answer
@comment_routes.route('/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    comment = Comment.query.get(comment_id)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.comment = form.data['comment']
        db.session.commit()
        answers = Answer.query.all()
        return {'answer': answers.to_dict_answer_rel()}
    return {'message': 'question or tag does not exist'}

# Delete a comment for answer
@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment:
        db.session.delete(comment)
        db.session.commit()
        answers = Answer.query.all()
        return {'answer': answers.to_dict_answer_rel()}
    return {'message': 'comment does not exist'}
