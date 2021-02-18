from app.models import db, RunTime
import datetime 

# Adds a demo user, you can add other users here if you want


def seed_run_times():

    time_one = RunTime(user_id=1, route_id=3, time=21, date_ran=datetime.date(2021,2,13))
    time_two = RunTime(user_id=1, route_id=1, time=18, date_ran=datetime.date(2021,1,31))
    time_three = RunTime(user_id=1, route_id=8, time=98, date_ran=datetime.date(2021,2,17))
    time_four = RunTime(user_id=1, route_id=5, time=65, date_ran=datetime.date(2021,2,10))
    time_five = RunTime(user_id=2, route_id=4, time=119, date_ran=datetime.date(2021,2,2))
    time_six = RunTime(user_id=2, route_id=2, time=38, date_ran=datetime.date(2021,1,31))
    time_seven = RunTime(user_id=2, route_id=6, time=78, date_ran=datetime.date(2021,2,14))
    time_eight = RunTime(user_id=2, route_id=8, time=106, date_ran=datetime.date(2021,2,15))
    time_nine = RunTime(user_id=3, route_id=7, time=85, date_ran=datetime.date(2021,2,3))
    time_ten = RunTime(user_id=3, route_id=7, time=83, date_ran=datetime.date(2021,2,7))
    time_eleven = RunTime(user_id=3, route_id=5, time=69, date_ran=datetime.date(2021,2,11))
    time_twelve = RunTime(user_id=3, route_id=3, time=19, date_ran=datetime.date(2021,2,8))
    time_thirteen = RunTime(user_id=3, route_id=4, time=118, date_ran=datetime.date(2021,2,6))
    time_fourteen = RunTime(user_id=3, route_id=1, time=15, date_ran=datetime.date(2021,1,28))

    db.session.add(time_one)
    db.session.add(time_two)
    db.session.add(time_three)
    db.session.add(time_four)
    db.session.add(time_five)
    db.session.add(time_six)
    db.session.add(time_seven)
    db.session.add(time_eight)
    db.session.add(time_nine)
    db.session.add(time_ten)
    db.session.add(time_eleven)
    db.session.add(time_twelve)
    db.session.add(time_thirteen)
    db.session.add(time_fourteen)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_run_times():
    db.session.execute('TRUNCATE run_times;')
    db.session.commit()
