from flask import Flask , render_template
import os
app = Flask(__name__)


app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route('/')
def home_page():
    return render_template("home_page.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
