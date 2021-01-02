from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Route, RunTime, db

runTime_routes = Blueprint('runtimes', __name__)

# Add new run time to route
@runTime_routes.route('/', methods=['POST'])
@login_required
def add_runtime():
    user_id = request.get_json().get('id')
    route_id = request.get_json().get('routeId')
    time = request.get_json().get('time')
    run_time = RunTime(
        user_id=user_id,
        route_id=route_id,
        time=time
    )
    db.session.add(run_time)
    db.session.commit()
    return run_time.to_dict()

# Search for all runTimes associated with specific route
@runTime_routes.route('/<int:route_id>')
@login_required
def get_runtimes_for_route(route_id):
    