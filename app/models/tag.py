from .db import db, environment, SCHEMA, add_prefix_for_prod

class Tag(db.Model):
    __tablename__ = "tags"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    image_url = db.Column(db.String)
    questions = db.relationship('Question', back_populates='tags', secondary='questions_tags',)

    def to_dict_tag(self):
        return {
            'id': self.id,
            'name': self.name,
            'image_url': self.image_url,
        }

    def to_dict_tag_rel(self):
        return {
            'id': self.id,
            'name': self.name,
            'image_url': self.image_url,
            'questions': [question.to_dict_question_rel() for question in self.questions]
        }
