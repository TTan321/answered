from .db import db
from datetime import date

class Answer(db.Model):
    __tablename__ = "answers"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    answer = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.Date, default=date.today())
    updated_at = db.Column(db.Date, default=date.today())
    user = db.relationship('User', back_populates='answers')
    question = db.relationship('Question', back_populates='answers')

    def to_dict_answer(self):
        return {
            'id': self.id,
            'user_id':self.user_id,
            'questionId': self.question_id,
            'answer': self.answer,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'user': self.user.to_dict(),
            'question': self.question.to_dict_question()
        }
