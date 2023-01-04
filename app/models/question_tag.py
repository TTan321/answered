from .db import db, environment, SCHEMA, add_prefix_for_prod

Question_Tag = db.Table(
    "questions_tags",

    db.Model.metadata,

    db.Column('id', db.Integer, primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')), nullable=True),
    db.Column('question_id', db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=True)
)

if environment == "production":
    Question_Tag.schema = SCHEMA
