from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Route, RunTime, db, rivals_table
from sqlalchemy.orm import aliased

user_routes = Blueprint('users', __name__)

# Get all users
@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}

# @user_routes.route('/<int:id>')
# def rival (id):
#     rival = User.query.filter_by(id=id)
#     return {"rival": [rival.to_dict()]}

# Restore user
@user_routes.route('/restore')
@login_required
def user():
    if current_user.is_authenticated:
        user = current_user
        # get user created routes
        data = Route.query.filter_by(user_creator=user.id).all()
        def route_to_dict(obj):
            return {"name": obj.name, "user_creator": obj.user_creator, 
            "route_coordinates": obj.route_coordinates, "date_created": obj.date_created}
        created_routes = map(route_to_dict, data)
        my_routes = tuple(created_routes)
        # get user rivals
        rivals = user.rivals
        if rivals:
            def to_obj(obj):
                return {"id": obj.id, "first_name": obj.first_name, "last_name": obj.last_name, 
                    "email": obj.email, "gender": obj.gender, "height":obj.height, "weight":obj.weight}
            new_rivals = map(to_obj, rivals)
            my_rivals = list(new_rivals)
        else:
            my_rivals = []
        # get total distance ran 
        total_distance = Route.query.join(RunTime).filter(RunTime.user_id == user.id).all()
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
