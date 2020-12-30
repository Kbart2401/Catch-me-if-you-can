from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Route, RunTime, db

user_routes = Blueprint('users', __name__)

# Get all users
@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}

# Restore user
@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
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
        return {'user': user.to_dict(), "total_time": user_total_run_time}
    return {'user': user.to_dict()}


# Add running route
# @user_routes.route('/')