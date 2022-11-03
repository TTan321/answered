from app.models import db, Question
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_questions():
    question1 = Question(
        user_id=1,
        question='How do you microwave bread?',
        created_at = date.today(),
        updated_at = date.today()
    )

    question2 = Question(
        user_id=1,
        question='If you could have any person become a member of your family, who would you choose?',
        created_at = date.today(),
        updated_at = date.today()
    )

    question3 = Question(
        user_id=2,
        question='If you could change one thing about your family, what would it be?',
        created_at = date.today(),
        updated_at = date.today()
    )

    question4 = Question(
        user_id=2,
        question='What is the strangest way you met one of your friends?',
        created_at = date.today(),
        updated_at = date.today()
    )

    question5 = Question(
        user_id=3,
        question='What is your current go-to song to dance to when nobody is around?',
        created_at = date.today(),
        updated_at = date.today()
    )

    question6 = Question(
        user_id=3,
        question='What did you learn from the last book you read?',
        created_at = date.today(),
        updated_at = date.today()
    )

    question7 = Question(
        user_id=4,
        question='What have you recently found to be ironic?',
        created_at = date.today(),
        updated_at = date.today()
    )

    question8 = Question(
        user_id=4,
        question='What is something you feel is unacceptable that is still being done today?',
        created_at = date.today(),
        updated_at = date.today()
    )

    question9 = Question(
        user_id=5,
        question='What do you think is the most complex aspect about yourself?',
        created_at = date.today(),
        updated_at = date.today()
    )

    question10 = Question(
        user_id=5,
        question="What's the best trick someone has ever played on you?",
        created_at = date.today(),
        updated_at = date.today()
    )

    question11 = Question(
        user_id=6,
        question="What's the biggest wager you've ever made?",
        created_at = date.today(),
        updated_at = date.today()
    )

    question12 = Question(
        user_id=6,
        question="If each person had a warning label, what would yours say?",
        created_at = date.today(),
        updated_at = date.today()
    )

    question13 = Question(
        user_id=7,
        question="What's the worst piece of advice you ever got from someone?",
        created_at = date.today(),
        updated_at = date.today()
    )

    question14 = Question(
        user_id=7,
        question="What is the next big purchase you're currently saving for?",
        created_at = date.today(),
        updated_at = date.today()
    )

    question15 = Question(
        user_id=8,
        question="What one thing would significantly make your life better?",
        created_at = date.today(),
        updated_at = date.today()
    )

    question16 = Question(
        user_id=8,
        question="Where's the next place you want to visit?",
        created_at = date.today(),
        updated_at = date.today()
    )

    question17 = Question(
        user_id=9,
        question="If you were to be famous for something, what would that be?",
        created_at = date.today(),
        updated_at = date.today()
    )

    question18 = Question(
        user_id=9,
        question="What have you recently realized you have been doing wrong?",
        created_at = date.today(),
        updated_at = date.today()
    )

    question19 = Question(
        user_id=10,
        question="What app or website completely changed your life?",
        created_at = date.today(),
        updated_at = date.today()
    )

    question20 = Question(
        user_id=10,
        question="What's an interesting fact that you recently learned?",
        created_at = date.today(),
        updated_at = date.today()
    )

    db.session.add(question1)
    db.session.add(question2)
    db.session.add(question3)
    db.session.add(question4)
    db.session.add(question5)
    db.session.add(question6)
    db.session.add(question7)
    db.session.add(question8)
    db.session.add(question9)
    db.session.add(question10)
    db.session.add(question11)
    db.session.add(question12)
    db.session.add(question13)
    db.session.add(question14)
    db.session.add(question15)
    db.session.add(question16)
    db.session.add(question17)
    db.session.add(question18)
    db.session.add(question19)
    db.session.add(question20)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_questions():
    db.session.execute('TRUNCATE questions RESTART IDENTITY CASCADE;')
    db.session.commit()
