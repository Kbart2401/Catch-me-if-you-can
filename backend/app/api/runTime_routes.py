from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Route, RunTime, db

runTime_routes = Blueprint('runtimes', __name__)

# Add new run time to route
@runTime_routes.route('/', methods=['POST'])
@login_required
def add_runtime():
  user_id = request.get_json('id')
  route_id = request.get_json('routeId')
  time = request.get_json('time')
  run_time = RunTime(
    user_id = user_id,
    route_id = route_id,
    time = time
  )
  db.session.add(run_time)
  db.session.commit()
  return run_time.to_dict()
