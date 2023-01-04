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

    id = db.Column(db.Integer, primaryKey=True)
    comment = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForiegnKey(add_prefix_for_prod('users.id')), nullable=True)
    answer_id = db.Column(db.Integer, db.ForiegnKey(add_prefix_for_prod('answers.id')), nullable=True)
