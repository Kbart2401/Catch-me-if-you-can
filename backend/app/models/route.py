from .db import db
import datetime


class Route(db.Model):
  __tablename__ = 'routes'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(40), nullable=False)
  user_creator = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  user = db.relationship('User', back_populates='routes', primaryjoin='User.id==Route.user_creator')
  route_coordinates = db.Column(db.ARRAY(db.Float))
  distance = db.Column(db.Float, nullable=False)
  date_created = db.Column(db.Date, default=datetime.datetime.today())
  run_times = db.relationship('RunTime', back_populates='route')

  def to_dict(self):
    return {
        "id": self.id,
        "name": self.name,
        "user_creator": self.user_creator,
        "route_coordinates": self.route_coordinates,
        "distance": self.distance,
        "date_created": self.date_created
    }
