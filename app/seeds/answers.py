from app.models import db, Answer
from datetime import date

# Adds a demo user, you can add other users here if you want
def seed_answers():
    answer1 = Answer(
        user_id=1,
        question_id=20,
        answer='I recently learned you are not supposed to rinse your mouth after brushing your teeth and you are only supposed to spit',
        created_at=date.today(),
        updated_at=date.today()
    )

    answer2 = Answer(
        user_id=2,
        question_id=20,
        answer="While watching discovery channel's shark week, I learned that killer whales attack sharks.",
        created_at=date.today(),
        updated_at=date.today()
    )

    answer3 = Answer(
        user_id=3,
        question_id=19,
        answer='The snkrs app has completely ruined my life, I am never selected for the releases. I HATE IT!',
        created_at=date.today(),
        updated_at=date.today()
    )

    answer4 = Answer(
        user_id=4,
        question_id=19,
        answer='I discovered call options on robinhood app and have completely lost my life savings on amazon calls.',
        created_at=date.today(),
        updated_at=date.today()
    )

    answer5 = Answer(
        user_id=5,
        question_id=17,
        answer='I want to be famous for being a superstar in the NFL. It is my dream to be a professional football player.',
        created_at=date.today(),
        updated_at=date.today()
    )


    db.session.add(answer1)
    db.session.add(answer2)
    db.session.add(answer3)
    db.session.add(answer4)
    db.session.add(answer5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_answers():
    db.session.execute('TRUNCATE answers RESTART IDENTITY CASCADE;')
    db.session.commit()
