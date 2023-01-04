from flask import Blueprint, request
from app.models import db, Question, Answer, Tag
from ..forms.question_form import QuestionForm
from..forms.answer_form import AnswerForm
from flask_login import current_user
from sqlalchemy.orm import joinedload
from datetime import date

question_routes = Blueprint('questions', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field.title()} {error}')
    return errorMessages

# Get all questions
@question_routes.route('')
def get_questions():
    questions = Question.query.all()
    if len([question.to_dict_question() for question in questions]):
        return {'questions': [question.to_dict_question_rel() for question in questions]}
    return {'error': 'query failed'}

# Add a question
@question_routes.route('', methods=['POST'])
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
        return {'question': data.to_dict_question_rel()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Edit a question
@question_routes.route('/<int:question_id>', methods=['PUT'])
def edit_question(question_id):
    form = QuestionForm()
    question = Question.query.get(question_id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        question.question = form.data['question']
        question.updated_at = date.today()
        db.session.commit()
        return {'question': question.to_dict_question_rel()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Add an answer to a question
@question_routes.route('/<int:question_id>/answer', methods=['POST'])
def add_answer(question_id):
    form = AnswerForm()
    user = current_user.to_dict()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        data = Answer(
            user_id = user['id'],
            question_id = question_id,
            answer = form.data['answer']
        )
        db.session.add(data)
        db.session.commit()
        return {'answer': data.to_dict_answer_rel()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Add a tag to a question
@question_routes.route('/<int:question_id>/tag/<int:tag_id>', methods=['POST'])
def add_tag_to_question(question_id, tag_id):
    question = Question.query.get(question_id)
    tag = Tag.query.get(tag_id)
    if tag.id not in question.tags:
        question.tags.append(tag)
        db.session.commit()
        questions = Question.query.all()
        return {'questions': questions.to_dict_question_rel()}
    return {'message': 'question or tag does not exist'}

# Remove a tag from a question
@question_routes.route('/<int:question_id>/tag/<int:tag_id>', methods=['DELETE'])
def remove_tag_from_question(question_id, tag_id):
    # question_tag = Question.query.join(Tag).filter(Tag.id == question_tag_id).options(joinedload(Question.tags))
    # if question_tag:
    questions = Question.query.get(question_id)
    tag = Tag.query.get(tag_id)
    if tag in questions.tags:
        questions.tags.remove(tag)
        db.session.commit()
        new_questions = Question.query.all()
        return {'questions': new_questions.to_dict_question_rel()}
    return {'message': 'question or tag does not exist'}

# Delete a question
@question_routes.route('/<int:question_id>', methods=['DELETE'])
def delete_question(question_id):
    question = Question.query.get(question_id)
    if question:
        db.session.delete(question)
        db.session.commit()
        return {'message': 'question has been deleted', 'id': question_id}
    return {'message': 'this question does not exist'}
