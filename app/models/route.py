from .db import db


class Route(db.Model):
  __tablename__ = 'routes'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(40), nullable=False)
  user_creator = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  user = db.relationship('User', back_populates='routes')
  route_coordinates = db.Column(db.ARRAY(db.Integer))
  date_created = db.Column(db.Date())
  routes = db.relationship('Route', back_populates='routes')

  def to_dict(self):
    return {
        "id": self.id,
        "name": self.name,
        "user_creator": self.userCreator,
        "route_coordinates": self.routeCoordinates,
        "date_created": self.dateCreated
    }
