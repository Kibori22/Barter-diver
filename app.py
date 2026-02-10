from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)

# Setup SQLite Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///barter.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database Model for Barter Items
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    offering = db.Column(db.String(100), nullable=False)  # What they have
    looking_for = db.Column(db.String(100), nullable=False) # What they want
    date_posted = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"Item('{self.title}', '{self.offering}')"

# Create the database within the application context
with app.app_context():
    db.create_all()

# Routes
@app.route('/')
def index():
    # Fetch all items sorted by newest first
    items = Item.query.order_by(Item.date_posted.desc()).all()
    return render_template('index.html', items=items)

@app.route('/add', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST':
        new_item = Item(
            title=request.form['title'],
            description=request.form['description'],
            offering=request.form['offering'],
            looking_for=request.form['looking_for']
        )
        db.session.add(new_item)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('add_item.html')

if __name__ == '__main__':
    app.run(debug=True)
