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
    date_created = request.get_json().get('dateCreated')
