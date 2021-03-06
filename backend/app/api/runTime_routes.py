from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Route, RunTime, db
from sqlalchemy import desc

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


@runTime_routes.route('/routes/<int:route_id>')
@login_required
def get_runtimes_for_route(route_id):
    run_times = RunTime.query.filter_by(route_id=route_id)
    return {"run_times": [run_time.to_dict() for run_time in run_times]}

# Search for all runTimes associated with user


@runTime_routes.route('/users/<int:id>')
@login_required
def get_runtimes_for_user(id):
    run_times = RunTime.query.filter_by(user_id=id).order_by(
        desc(RunTime.date_ran)).limit(10).all()

    run_times = [run_time.to_dict() for run_time in run_times]

    routes = [Route.query.get(run_time['route_id']).to_dict()
              for run_time in run_times]

    for i in range(len(run_times)):
        run_times[i]['route_name'] = routes[i]['name']
        run_times[i]['distance'] = routes[i]['distance']

    return {"run_times": run_times, }
