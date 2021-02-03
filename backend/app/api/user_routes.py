from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Route, RunTime, db, rivals_table
from sqlalchemy.orm import aliased
from sqlalchemy import desc
from datetime import datetime


user_routes = Blueprint('users', __name__)

# Get all users


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}

# @user_routes.route('/<int:id>')
# @login_required
# def rival (id):
#     id = request.get_json().get('id')
#     rival = User.query.filter_by(id=id)
#     return {"rival": [rival.to_dict()]}

# Restore user


@user_routes.route('/dashboard/<int:id>')
def runCount(id):
    runs = RunTime.query.filter_by(user_id=id).count()
    recent_runs = RunTime.query.filter_by(user_id=id).order_by(
        desc(RunTime.date_ran)).all()
    user = User.query.get(id).to_dict()
    # userName = userName.to_dict()

    recent_runs = [run.to_dict() for run in recent_runs]
    recent_runs = [run for run in recent_runs if (
        (datetime.today() - run['date_ran']).days <= 7)]

    weekData = {
        'Mon': [],
        'Tue': [],
        'Wed': [],
        'Thu': [],
        'Fri': [],
        'Sat': [],
        'Sun': [],
    }

    for i in range(len(recent_runs)):
        currentDay = recent_runs[i]['date_ran'].weekday()
        currentDay = list(weekData.keys())[currentDay]
        weekData[currentDay].append(recent_runs[i])

    routes = [Route.query.get(run_time['route_id']).to_dict()
              for run_time in recent_runs]

    for i in range(len(recent_runs)):
        recent_runs[i]['route_name'] = routes[i]['name']
        recent_runs[i]['distance'] = routes[i]['distance']

    obj = {'run_count': runs, 'recent_run': recent_runs if (recent_runs) else None,
           'first_name': user['first_name'], 'last_name': user['last_name'], 'week_data': weekData, }

    return obj


@user_routes.route('/restore')
@login_required
def user():
    if current_user.is_authenticated:
        user = current_user

        # get user created routes
        data = Route.query.filter_by(user_creator=user.id).all()

        #added extra code here for turning created routes into a dict for easier access  
        keys = [route.id for route in data]
        my_routes = [route.to_dict() for route in data]
        dict_routes = dict(zip(keys, my_routes))

        runners = [RunTime.query.filter_by(
            route_id=route['id']).count() for route in my_routes]

        for i in range(len(my_routes)):
            my_routes[i]['runners'] = runners[i]

        # get user rivals
        rivals = user.rivals
        if rivals:
            def to_obj(obj):
                return {"id": obj.id, "first_name": obj.first_name, "last_name": obj.last_name,
                        "email": obj.email, "gender": obj.gender, "height": obj.height, "weight": obj.weight}
            new_rivals = map(to_obj, rivals)
            my_rivals = list(new_rivals)
        else:
            my_rivals = []

        # get total distance ran
        total_distance = Route.query.join(RunTime).filter(
            RunTime.user_id == user.id).all()
        if total_distance:
            if isinstance(total_distance, list):
                def distances(distance):
                    return distance.distance
                user_distances = map(distances, total_distance)
                user_total_distance_ran = sum(user_distances)
            else:
                user_total_distance_ran = total_distance.distance
        # get total running time
        total_times = RunTime.query.filter_by(user_id=user.id).all()
        if total_times:
            if isinstance(total_times, list):
                def run_times(total_time):
                    return total_time.time
                user_times = map(run_times, total_times)
                user_total_run_time = sum(user_times)
            else:
                user_total_run_time = total_times.time
            return {'user': user.to_dict(), "total_time": user_total_run_time,
                    "total_distance": user_total_distance_ran,
                    "rivals": my_rivals, "created_routes": dict_routes}
    return {'user': user.to_dict(), "rivals": my_rivals, "created_routes": dict_routes}
