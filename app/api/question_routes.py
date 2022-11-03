from flask import Blueprint, request
from app.models import db, Question, Answer
from ..forms.question_form import QuestionForm
from..forms.answer_form import AnswerForm
from flask_login import current_user
from datetime import date

question_routes = Blueprint('questions', __name__)

# Get all questions
@question_routes('')
def get_questions():
    questions = Question.query.all()
    if len([question.to_dict_question() for question in questions]):
        return {'questions': [question.to_dict_question() for question in questions]}
    return {'error': 'query failed'}

# Add a question
@question_routes('', methods=['POST'])
def add_question():
    form = QuestionForm()
    user = current_user.to_dict()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = Question(
            user_id = user['id'],
            question = form.data['question']
        )
        db.session.add(data)
        db.session.commit()
        return {'question': data.to_dict_question()}
    return form.errors


# Edit a question
@question_routes('/<int:question_id>', methods=['PUT'])
def edit_question(question_id):
    form = QuestionForm()
    question = Question.query.get(question_id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        question.question = form.data['question']
        question.updated_at = date.today()
        db.session.commit()
        return {'question': question.to_dict_question()}
    return form.errors

# Add an answer to a question
@question_routes('/<int:question_id>/answer', methods=['POST'])
def add_answer():
    form = AnswerForm()
    user = current_user.to_dict()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        data = Answer(
            user_id = user['id'],
            question_id = form.data['questionId'],
            answer = form.data['answer']
        )
        db.session.add(data)
        db.session.commit()
        return {'answer': data.to_dict_answer()}
    return form.errors

# Delete a question
@question_routes('/<int:question_id>', methods=['DELETE'])
def delete_question(question_id):
    question = Question.query.get(question_id)
    if question:
        db.session.delete(question)
        db.session.commit()
        return {'message': 'question has been deleted', 'id': question.to_dict_question().id}
    return {'message': 'this question does not exist'}
