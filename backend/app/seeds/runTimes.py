from app.models import db, RunTime
import datetime 

# Adds a demo user, you can add other users here if you want


def seed_run_times():

    time_one = RunTime(user_id=1, route_id=3, time=21, date=datetime.date(2021,2,13))
    time_two = RunTime(user_id=1, route_id=1, time=18, date=datetime.date(2021,1,31))
    time_three = RunTime(user_id=1, route_id=8, time=98, date=datetime.date(2021,2,17))
    time_three = RunTime(user_id=1, route_id=5, time=65, date=datetime.date(2021,2,10))
    time_three = RunTime(user_id=2, route_id=4, time=45, date=datetime.date(2021,2,2))
    time_three = RunTime(user_id=2, route_id=2, time=38, date=datetime.date(2021,1,31))
    time_three = RunTime(user_id=2, route_id=6, time=78, date=datetime.date(2021,2,14))
    time_three = RunTime(user_id=2, route_id=8, time=106, date=datetime.date(2021,2,15))
    time_three = RunTime(user_id=3, route_id=7, time=85, date=datetime.date(2021,2,3))
    time_three = RunTime(user_id=3, route_id=7, time=83, date=datetime.date(2021,2,7))
    time_three = RunTime(user_id=3, route_id=5, time=69, date=datetime.date(2021,2,11))
    time_three = RunTime(user_id=3, route_id=3, time=19, date=datetime.date(2021,2,8))
    time_three = RunTime(user_id=3, route_id=4, time=49, date=datetime.date(2021,2,6))
    time_three = RunTime(user_id=3, route_id=1, time=15, date=datetime.date(2021,1,28))

    db.session.add(demo)
    db.session.add(demo_two)
    db.session.add(demo_three)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_run_times():
    db.session.execute('TRUNCATE run_times;')
    db.session.commit()
