from .db import db, environment, SCHEMA, add_prefix_for_prod

class Question_Tag(db.Model):
    __tablename__ = "questions_tags"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')), nullable=True)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=True)

    def to_dict_questions_tags(self):
        return {
            'id': self.id,
            'tag_id': self.tag_id,
            'question_id': self.question_id
        }
