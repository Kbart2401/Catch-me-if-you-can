from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Route, RunTime, db

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
@route_routes.route('/', methods=['DELETE'])
@login_required
def remove_route():
    id = request.get_json().get('routeId')
    route = Route.query.get(id)
    db.session.delete(route)
    db.session.commit()
    return route.to_dict()

# Get all routes
@route_routes.route('/')
@login_required
def get_all_routes():
    routes = Route.query.all()
    return {"routes": [route.to_dict() for route in routes]}