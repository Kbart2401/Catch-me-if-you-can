from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Route, RunTime, db
# from sqlalchemy.orm import relationship, sessionmaker, joinedload

route_routes = Blueprint('routes', __name__)

# Add a new route


@route_routes.route('/', methods=['POST'])
@login_required
def new_route():
    user_creator = request.get_json().get('id')
    name = request.get_json().get('name')
    route_coordinates = request.get_json().get('routeCoordinates')
    distance = request.get_json().get('distance')
    date_created = request.get_json().get('dateCreated')
    route = Route(
        name=name,
        user_creator=user_creator,
        route_coordinates=route_coordinates,
        distance=distance,
        date_created=date_created
    )
    db.session.add(route)
    db.session.commit()
    return route.to_dict()

# Delete a created route


@route_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def remove_route(id): 
    route = Route.query.get(id)
    db.session.delete(route)
    db.session.commit()
    return route.to_dict()

# Get all routes


@route_routes.route('/')
@login_required
def get_all_routes():
    routes = Route.query.all()
    keys = [route.id for route in routes]
    values = [route.to_dict() for route in routes]
    routes = dict(zip(keys, values))
    return {"routes": routes}

# Get specific route


@route_routes.route('/<int:id>')
def get_specific_route(id):
    route = Route.query.get(id)
    routeInfo = route.to_dict()

    user = User.query.get(route.user_creator)

    run_times = RunTime.query.filter(RunTime.route_id == id).order_by(
        'time').limit(10)
    runList = [run_time.to_dict() for run_time in run_times]

    runUsers = [(User.query.get(run_time['user_id'])).to_dict()['first_name']
                for run_time in runList]

    for i in range(len(runList)):
        runList[i]['user_name'] = runUsers[i]

    routeInfo['run_times'] = runList
    routeInfo['runCount'] = RunTime.query.filter_by(route_id=id).count()
    routeInfo['user'] = user.first_name
    routeInfo['user_email'] = user.email
    return routeInfo
