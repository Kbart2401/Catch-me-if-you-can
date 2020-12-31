from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Route, RunTime, db

rival_routes = Blueprint('rivals', __name__)

# Add rivals
@rival_routes.route('/', methods=['POST'])
@login_required
def add_rival():
    id = request.get_json().get('id')
    rival_id = request.get_json().get('rival_id')
    user = User.query.get(id)
    rival = User.query.get(rival_id)
    user.rivals.append(rival)
    rival.rivals.append(user)
    db.session.add(user)
    db.session.add(rival)
    db.session.commit()
    return user.to_dict()

# Remove rivals
@rival_routes.route('/', methods=['DELETE'])
@login_required
def remove_rivals():
    id = request.get_json().get('id')
    rival_id = request.get_json().get('rival_id')
    user = User.query.get(id)
    rival = User.query.get(rival_id)
    user.rivals.remove(rival)
    rival.rivals.remove(user)
    db.session.add(user)
    db.session.add(rival)
    db.session.commit()
    return user.to_dict()
