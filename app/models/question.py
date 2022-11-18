from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date

class Question(db.Model):
    __tablename__ = "questions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    question = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.Date, default=date.today())
    updated_at = db.Column(db.Date, default=date.today())
    user = db.relationship('User', back_populates='questions')
    answers = db.relationship('Answer', back_populates='question', cascade='all, delete')
    tag_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')), nullable=False)
    tag = db.relationship('Tag', back_populates='questions')

    def to_dict_question(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'question': self.question,
            'tagId': self.tag_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }

    def to_dict_question_rel(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'question': self.question,
            'tagId': self.tag_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'user': self.user.to_dict(),
            'answers': [answer.to_dict_answer() for answer in self.answers],
            'tag': self.tag.to_dict_tag()
        }
