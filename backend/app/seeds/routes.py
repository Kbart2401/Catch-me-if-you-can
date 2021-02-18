from werkzeug.security import generate_password_hash
from app.models import db, Route
import datetime 

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo_route = Route(id=1, name='my first run', route_coordinates=[[-82.968629,39.965927],[-82.949661,39.968005],[-82.941831,39.962666]],
                distance=3179, date_created=datetime.date(2021,1,24), user_creator=1)
    demo_route_two = Route(id=2, name='airport run', route_coordinates=[[-82.852638,39.978255],[-82.906888,40.018436],[-82.853224,39.978372]],
                distance=20321, date_created=datetime.date(2021,1,28), user_creator=1)
    demo_route_three = Route(id=3, name='river run', route_coordinates=[[-83.016106,39.95201],[-82.996177,39.939071]],
                distance=3874, date_created=datetime.date(2021,2,5), user_creator=1)
    demo_route_four = Route(id=4, name='river run', route_coordinates=[[-83.016106,39.95201],[-82.996177,39.939071]],
                distance=3874, date_created=datetime.date(2021,2,5), user_creator=1)
    demo_route_five = Route(id=5, name='river run', route_coordinates=[[-83.016106,39.95201],[-82.996177,39.939071]],
                distance=3874, date_created=datetime.date(2021,2,5), user_creator=1)
    demo_route_six = Route(id=6, name='river run', route_coordinates=[[-83.016106,39.95201],[-82.996177,39.939071]],
                distance=3874, date_created=datetime.date(2021,2,5), user_creator=1)
    demo_route_seven = Route(id=7, name='river run', route_coordinates=[[-83.016106,39.95201],[-82.996177,39.939071]],
                distance=3874, date_created=datetime.date(2021,2,5), user_creator=1)
    demo_route_eight = Route(id=8, name='river run', route_coordinates=[[-83.016106,39.95201],[-82.996177,39.939071]],
                distance=3874, date_created=datetime.date(2021,2,5), user_creator=1)

    db.session.add(demo_route)
    db.session.add(demo_route_two)
    db.session.add(demo_route_three)
    db.session.add(demo_route_four)
    db.session.add(demo_route_five)
    db.session.add(demo_route_six)
    db.session.add(demo_route_seven)
    db.session.add(demo_route_eight)
    
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()