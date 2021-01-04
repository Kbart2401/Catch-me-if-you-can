from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Route, RunTime, db, rivals_table
from sqlalchemy.orm import aliased
from sqlalchemy import desc


user_routes = Blueprint('users', __name__)

# Get all users


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}

# Restore user


@user_routes.route('/dashboard/<int:id>')
def runCount(id):
    runs = RunTime.query.filter_by(user_id=id).count()
    recent_run = RunTime.query.filter_by(user_id=id).order_by(
        desc(RunTime.date_ran)).limit(1).all()

    recent_run = [run.to_dict() for run in recent_run]
    # recent_run = recent_run[0]

    routes = [Route.query.get(run_time['route_id']).to_dict()
              for run_time in recent_run]

    print('\n AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', recent_run, '\n')

    for i in range(len(recent_run)):
        recent_run[i]['route_name'] = routes[i]['name']
        recent_run[i]['distance'] = routes[i]['distance']

    return{'run_count': runs, 'recent_run': recent_run[0]}


@user_routes.route('/restore')
@login_required
def user():
    if current_user.is_authenticated:
        user = current_user

        # get user created routes
        data = Route.query.filter_by(user_creator=user.id).all()

        my_routes = [route.to_dict() for route in data]
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
                    "rivals": my_rivals, "created_routes": my_routes}
    return {'user': user.to_dict(), "rivals": my_rivals, "created_routes": my_routes}
