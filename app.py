from flask import Flask, request, jsonify, render_template
import chat

app = Flask(__name__)

@app.route('/')
def homepage():
    return render_template('index.html')

@app.route('/chatbot', methods=['POST'])
def chatbot():
    message = request.get_json()['message']
    response = chat.process_text(message)
    return jsonify({'message': response})

if __name__ == '__main__':
    app.run(debug=True)
