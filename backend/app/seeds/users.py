from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = User(first_name='Dwayne', last_name='Johnson', email='demo@aa.io',
                gender='male', height=180, weight=120, password='password')
    demo_two = User(first_name='Sarah', last_name='Jane', email='sj@sj.io',
                gender='female', height=160, weight=65, password='password')
    demo_three = User(first_name='Georgie', last_name='Burns', email='gb@gb.io',
                gender='male', height=210, weight=85, password='password')

    db.session.add(demo)
    db.session.add(demo_two)
    db.session.add(demo_three)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
