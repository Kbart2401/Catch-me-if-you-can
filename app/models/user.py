from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

Rival = db.table(
    'rivals',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('rival_user_id', db.Integer, db.ForeignKey('users.id'))
)

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  first_name = db.Column(db.String(40), nullable = False)
  last_name = db.Column(db.String(40), nullable = False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  gender = db.Column(db.String(40))
  hashed_password = db.Column(db.String(255), nullable = False)
  routes = db.relationship('Route', back_populates='user')
  run_times = db.relationship('RunTime', back_populates='user')
  rivals = db.relationship('users', secondary='rivals', backref=db.backref('rivals', lazy='dynamic'))


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
      "last_name": self.username,
      "email": self.email,
      "gender": self.gender
    }
