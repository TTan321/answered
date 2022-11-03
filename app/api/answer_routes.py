from flask import Blueprint, request
from app.models import db, Answer


answer_routes = Blueprint('answers', __name__)

@answer_routes('')
def get_answers():
    answers = Answer.query.all()
    return {'answers': [answer.to_dict_answer for answer in answers]}
