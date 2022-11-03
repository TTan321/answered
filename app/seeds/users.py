from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', firstname='Demo', lastname='user', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', firstname='Marnie', lastname='Pie', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', firstname='Bobbie', lastname='Hill', password='password')
    john = User(
        username='john', email='john@aa.io', firstname='john', lastname='doe', password='password')
    jane = User(
        username='jane', email='jane@aa.io', firstname='jane', lastname='doe', password='password')
    jaylen = User(
        username='jaylen', email='jaylen@aa.io', firstname='jaylen', lastname='waddle', password='password')
    mark = User(
        username='mark', email='mark@aa.io', firstname='mark', lastname='andrews', password='password')
    kirk = User(
        username='kirk', email='kirk@aa.io', firstname='kirk', lastname='cousins', password='password')
    austin = User(
        username='austin', email='austin@aa.io', firstname='austin', lastname='ekeler', password='password')
    aj = User(
        username='aj', email='aj@aa.io', firstname='aj', lastname='brown', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(john)
    db.session.add(jane)
    db.session.add(jaylen)
    db.session.add(mark)
    db.session.add(kirk)
    db.session.add(austin)
    db.session.add(aj)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
