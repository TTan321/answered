from .db import db
from datetime import datetime

class Question(db.Model):
    __tablename__ = "questions"
    id = db.Column(db.Integer, nullable=False, primaryKey=True)
    user_id = db.Column(db.Integer, ForeignKey=('user.id'), nullable=False)
    question = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.Date, default=datetime.today())
    updated_at = db.Column(db.Date, default=datetime.today())
    user = db.relationship('User', back_populates='questions')

    def to_dict_question(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'question': self.question,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'user': self.user.to_dict()
        }
