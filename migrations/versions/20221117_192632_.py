"""empty message

Revision ID: 8975694b4d13
Revises: abbcd4f8dcfd
Create Date: 2022-11-17 19:26:32.609819

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '8975694b4d13'
down_revision = 'abbcd4f8dcfd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('image_url', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('questions', sa.Column('tag_id', sa.Integer(), nullable=True))
    op.alter_column('questions', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.create_foreign_key(None, 'questions', 'tags', ['tag_id'], ['id'])
    # ### end Alembic commands ###

    if environment == "production":
        op.execute(f"ALTER TABLE tags SET SCHEMA {SCHEMA};")


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'questions', type_='foreignkey')
    op.alter_column('questions', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.drop_column('questions', 'tag_id')
    op.drop_table('tags')
    # ### end Alembic commands ###
