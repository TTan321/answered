from .db import db, environment, SCHEMA, add_prefix_for_prod

# comments = db.Table(
#     "comments",

#     db.Model.metadata,

#     db.Column('id', db.Integer, primary_key=True),
#     db.Column('comment', db.String(1000), nullable=False)
#     db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=True),
#     db.Column('answer_id', db.Integer, db.ForeignKey(add_prefix_for_prod('answers.id')), nullable=True)
# )

# if environment == "production":
#     comments.schema = SCHEMA

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=True)
    answer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('answers.id')), nullable=True)
    user = db.relationship('User', back_populates='comments')
    answers = db.relationship('Answer', back_populates='comments')

    def to_dict_comment(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'user_id': self.user_id,
            'answer_id': self.answer_id
        }

    def to_dict_comment_rel(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'user_id': self.user_id,
            'answer_id': self.answer_id,
            'user': self.user,
            'answers': [answer.to_dict_answer() for answer in self.answers]
        }
