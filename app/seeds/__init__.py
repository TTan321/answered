from flask.cli import AppGroup
from app.models.db import db, environment, SCHEMA
from .users import seed_users, undo_users
from .questions import seed_questions, undo_questions
from .answers import seed_answers, undo_answers

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.
        db.session.commit()
    seed_users()
    # Add other seed functions here
    # Add other seed functions here
    seed_questions()
    seed_answers()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_questions()
    undo_answers()
