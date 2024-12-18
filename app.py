from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save_score', methods=['POST'])
def save_score():
    data = request.get_json()
    score = data.get('score', 0)
    with open('scores.txt', 'a') as f:
        f.write(f"{score}\n")
    return jsonify({'message': 'Score saved!'})

@app.after_request
def add_header(response):
    response.headers["Cache-Control"] = "no-store"
    return response

if __name__ == '__main__':
    app.run(debug=True)
