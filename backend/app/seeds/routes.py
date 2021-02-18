from werkzeug.security import generate_password_hash
from app.models import db, Route
import datetime 

# Adds a demo user, you can add other users here if you want


def seed_routes():

    demo_route = Route(name='my first run', route_coordinates=[[-82.968629,39.965927],[-82.949661,39.968005],[-82.941831,39.962666]],
                distance=3179, date_created=datetime.date(2021,1,24), user_creator=1)
    demo_route_two = Route(name='airport run', route_coordinates=[[-82.852638,39.978255],[-82.906888,40.018436],[-82.853224,39.978372]],
                distance=20321, date_created=datetime.date(2021,1,28), user_creator=1)
    demo_route_three = Route(name='river run', route_coordinates=[[-83.016106,39.95201],[-82.996177,39.939071]],
                distance=3874, date_created=datetime.date(2021,2,5), user_creator=1)
    demo_route_four = Route(name='downtown run', route_coordinates=[[-83.719295,39.913608],[-83.007835,39.952198]],
                distance=65839, date_created=datetime.date(2021,1,31), user_creator=2)
    demo_route_five = Route(name='to the lake run', route_coordinates=[[-82.826047,39.909527],[-82.508618,39.922438]],
                distance=30124, date_created=datetime.date(2021,2,8), user_creator=2)
    demo_route_six = Route(name='down south run', route_coordinates=[[-82.980352,39.978058],[-82.984821,39.887454],[-83.062447,39.921283],[-82.98763,39.980262]],
                distance=35119, date_created=datetime.date(2021,2,12), user_creator=2)
    demo_route_seven = Route(name='west to east run', route_coordinates=[[-83.174023,40.107444],[-82.803521,40.097689]],
                distance=34132, date_created=datetime.date(2021,2,1), user_creator=3)
    demo_route_eight = Route(name='outskirts run', route_coordinates=[[-82.953814,40.058618],[-82.80684,40.052847],[-82.790867,39.93162],[-82.878128,39.913224]],
                distance=37281, date_created=datetime.date(2021,2,14), user_creator=3)

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


def undo_routes():
    db.session.execute('TRUNCATE routes;')
    db.session.commit()