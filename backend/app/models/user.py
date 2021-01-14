from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

rivals_table = db.Table(
    'rivals',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(
        'users.id'), primary_key=True),
    db.Column('rival_user_id', db.Integer,
              db.ForeignKey('users.id'), primary_key=True)
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    gender = db.Column(db.String(40))
    height = db.Column(db.Integer)
    weight = db.Column(db.Float, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    routes = db.relationship('Route', back_populates='user')
    run_times = db.relationship('RunTime', back_populates='user')
    rivals = db.relationship('User', secondary=rivals_table, primaryjoin=id==rivals_table.c.user_id, secondaryjoin=id==rivals_table.c.rival_user_id )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "gender": self.gender,
            "height": self.height,
            "weight": self.weight
        }

    def __repr__(self):
        return '<User> {}'.format(self.id)
