from flask import Blueprint, request
from app.models import db, Answer, Comment
from app.forms import AnswerForm, CommentForm
from datetime import date


answer_routes = Blueprint('answers', __name__)

# Get all answers
@answer_routes.route('')
def get_answers():
    answers = Answer.query.all()
    return {'answers': [answer.to_dict_answer_rel() for answer in answers]}

# Edit an answer by answer id
@answer_routes.route('/<int:answer_id>', methods=['PUT'])
def edit_answer(answer_id):
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        answer = Answer.query.get(answer_id)
        answer.answer = form.data['answer']
        answer.updated_at = date.today()
        db.session.commit()
        return {'answer': answer.to_dict_answer_rel()}
    return form.errors

#  Delete an answer by answer id
@answer_routes.route('<int:answer_id>', methods=['DELETE'])
def delete_answer(answer_id):
    answer = Answer.query.get(answer_id)
    if answer:
        db.session.delete(answer)
        db.session.commit()
        return {'id': answer_id}
    return {'message': 'answer with requested id does not exist'}

# Add a comment to an answer
@answer_routes.route('/<int:answer_id>/user/<int:user_id>', methods=['POST'])
def add_tag_to_question(answer_id, user_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = Comment(
            comment = form.data['comment'],
            user_id = user_id,
            answer_id = answer_id
        )
        db.session.add(data)
        db.session.commit()
        answers = Answer.query.all()
        return {'comments': answers.to_dict_answer_rel()}
    return {'message': 'question or tag does not exist'}
