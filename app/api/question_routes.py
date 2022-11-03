from flask import Blueprint, request
from app.models import db, Question
from ..forms.question_form import QuestionForm, EditQuestionForm
from flask_login import current_user
from datetime import date

question_routes = Blueprint('questions', __name__)

@question_routes('')
def get_questions():
    questions = Question.query.all()
    if len([question.to_dict_question() for question in questions]):
        return {'questions': [question.to_dict_question() for question in questions]}
    return {'error': 'query failed'}

@question_routes('', methods=['POST'])
def add_question():
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = Question()
        form.populate_obj(data)
        db.session.add(data)
        db.session.commit()
        return {'question': data.to_dict_question()}
    return form.errors


@question_routes('/<int:question_id>', methods=['PUT'])
def add_question(question_id):
    form = EditQuestionForm()
    user = current_user.to_dict()
    question = Question.query.get(question_id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        question.question = form.data['question']
        question.updated_at = date.today()
        db.session.commit()
        return {'question': question.to_dict_question()}
    return form.errors
