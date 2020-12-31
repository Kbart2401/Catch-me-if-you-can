"""Initial migration

Revision ID: ceb97df8c756
Revises: 
Create Date: 2020-12-30 12:46:48.680148

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ceb97df8c756'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('gender', sa.String(length=40), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('rivals',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('rival_user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['rival_user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'rival_user_id')
    )
    op.create_table('routes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('user_creator', sa.Integer(), nullable=False),
    sa.Column('route_coordinates', sa.ARRAY(sa.Integer()), nullable=True),
    sa.Column('date_created', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['user_creator'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('runTimes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('route_id', sa.Integer(), nullable=False),
    sa.Column('time', sa.Integer(), nullable=True),
    sa.Column('date_ran', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['route_id'], ['routes.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('runTimes')
    op.drop_table('routes')
    op.drop_table('rivals')
    op.drop_table('users')
    # ### end Alembic commands ###
