from .db import db


class RunTime(db.Model):
  __tablename__ = 'runTimes'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  route_id = db.Column(db.Integer, db.ForeignKey('routes.id'), nullable=False)
  time = db.Column(db.Integer)
  date_ran = db.Column(db.DateTime)
  user = db.relationship('User', back_populates='run_times')
  route = db.relationship('Route', back_populates='run_times')

  def to_dict(self):
    return {
        "user_id": self.user_id,
        "route_id": self.route_id,
        "time": self.time,
        "date_ran": self.date_ran,
    }

  
