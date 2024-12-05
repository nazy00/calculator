from flask import Flask, request, jsonify
from flask_cors import CORS
import math

# Initialize Flask application
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Function to validate input fields recieved in the request payload
def validate_input_request_fields(data_request, required_fields):
    # Check if (data_request is empty) or (if any required field is missing)
    return ((not data_request) or (not all(field in data_request for field in required_fields)))

# Test route for healthchecks
@app.route('/api/test')
def hello():
    return {'message': 'Hello World!'}

# CALCUlATOR MATHEMATICAL OPERATIONS
# Addition operation
@app.route('/api/add', methods=['POST'])
def add():
    data_request = request.get_json()  # Get 'JSON' data from request payload
    if validate_input_request_fields(data_request, ['number_1', 'number_2']):
        return jsonify({'error': 'Invalid input'}), 400  # Return error if input is invalid

    # Convert request 'input' to 'float' and perform 'addition'
    number_1 = float(data_request['number_1'])
    number_2 = float(data_request['number_2'])
    result = number_1 + number_2
    return jsonify({'result': result})  # Return result to frontend as a 'JSON'


# Multiplication operation
@app.route('/api/multiply', methods=['POST'])
def multiply():
    data_request = request.get_json()
    if validate_input_request_fields(data_request, ['number_1', 'number_2']):
        return jsonify({'error': 'Invalid input'}), 400

    # Convert request 'input' to 'float' and perform 'multiplication'
    number_1 = float(data_request['number_1'])
    number_2 = float(data_request['number_2'])
    result = number_1 * number_2
    return jsonify({'result': result})


# Subtraction operation
@app.route('/api/subtract', methods=['POST'])
def subtract():
    data_request = request.get_json()
    if validate_input_request_fields(data_request, ['number_1', 'number_2']):
        return jsonify({'error': 'Invalid input'}), 400

    # Convert request 'input' to 'float' and perform 'subtraction'
    number_1 = float(data_request['number_1'])
    number_2 = float(data_request['number_2'])
    result = number_1 - number_2
    return jsonify({'result': result})


# Division operation
@app.route('/api/divide', methods=['POST'])
def divide():
    data_request = request.get_json()
    if validate_input_request_fields(data_request, ['number_1', 'number_2']):
        return jsonify({'error': 'Invalid input'}), 400

    # Convert request 'input' to 'float' and perform 'division'
    number_1 = float(data_request['number_1'])
    number_2 = float(data_request['number_2'])
    if number_2 == 0:
        return jsonify({'error': 'Division by zero'}), 400  # Return 'error' if division is by 'zero'
    result = number_1 / number_2
    return jsonify({'result': result})


# Square root operation
@app.route('/api/sqrt', methods=['POST'])
def square_root():
    data_request = request.get_json()
    if validate_input_request_fields(data_request, ['number']):
        return jsonify({'error': 'Invalid input'}), 400

    number = float(data_request['number'])
    if number < 0:
        return jsonify({'error': 'Cannot calculate square root of a negative number'}), 400 # Return 'error' if calculating square root of a negative number
    result = math.sqrt(number)
    return jsonify({'result': result})

# Exponentiation operation
@app.route('/api/power', methods=['POST'])
def power():
    data_request = request.get_json()
    if validate_input_request_fields(data_request, ['base', 'exponent']):
        return jsonify({'error': 'Invalid input'}), 400

    base = float(data_request['base'])
    exponent = float(data_request['exponent'])
    result = math.pow(base, exponent) # Calculate Power
    return jsonify({'result': result})

# Trigonometric functions
@app.route('/api/trig', methods=['POST'])
def trigonometric():
    data_request = request.get_json()
    if validate_input_request_fields(data_request, ['function', 'angle']):
        return jsonify({'error': 'Invalid input'}), 400

    function = data_request['function'].lower()
    angle = float(data_request['angle'])

    # Perform the appropriate trigonometric function
    if function == 'sin':
        result = math.sin(math.radians(angle))
    elif function == 'cos':
        result = math.cos(math.radians(angle))
    elif function == 'tan':
        result = math.tan(math.radians(angle))
    else:
        return jsonify({'error': 'Invalid trigonometric function'}), 400

    return jsonify({'result': result})

# Logarithm operation
@app.route('/api/log', methods=['POST'])
def logarithm():
    data_request = request.get_json()
    if validate_input_request_fields(data_request, ['number']):
        return jsonify({'error': 'Invalid input'}), 400

    number = float(data_request['number'])
    if number <= 0:
        return jsonify({'error': 'Cannot calculate logarithm of a non-positive number'}), 400

    # Use natural log (base e) if no base is provided
    base = float(data_request.get('base', math.e))
    result = math.log(number, base)
    return jsonify({'result': result})

if __name__ == '__main__':
    # Run the Flask application on port 
    app.run(host='0.0.0.0', port=5000)
