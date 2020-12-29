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
    hashed_password = db.Column(db.String(255), nullable=False)
    routes = db.relationship('Route', back_populates='user')
    run_times = db.relationship('RunTime', back_populates='user')
    # rivals = db.relationship('User', secondary=rivals_table, backref=db.backref('rivals', lazy='dynamic'))
    # rivals = db.relationship('User', secondary=rivals_table, backref='rivals', foreign_keys='[rivals.c.user_id, rivals.c.rival_user_id]')
    # rivals = db.relationship('User', secondary=rivals_table, primaryjoin=('User.id==rivals_table.c.user_id'), backref=db.backref('rivals', lazy='dynamic'),
    #                          secondaryjoin=('User.id==rivals_table.c.rivals_user_id'))
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
            "gender": self.gender
        }

    def __repr__(self):
        return '<parent> {}'.format(self.id)


# user1 = User(first_name='Kyle', last_name='Bart',
#              email='kyle@gmail.com', gender='male', password='password')
# user2 = User(first_name='Aaron', last_name='H',
#              email='aaron@gmail.com', gender='male', password='password')
# db.session.add(user1)
# db.session.add(user2)
# db.session.commit()
# user1.rivals.append(user2)
# user2.rivals.append(user1)
# db.session.commit()
