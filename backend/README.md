# Backend - Python Flask Calculator API 

## Overview
This directory will contain the backend code in Python programming language for performing the Calculator operations. This backend is a Flask-based REST API that provides various mathematical operations for a calculator application. 

## Features
- **Basic arithmetic operations**: addition, subtraction, multiplication, division
- **Advanced operations**: square root, exponentiation, trigonometric functions, logarithms
- **Error handling** for invalid inputs and edge cases

## API Endpoints

### Test Endpoint
- `GET /api/test`: Returns a simple "Hello World" message

### Arithmetic Operations
- `POST /api/add`: Addition
- `POST /api/subtract`: Subtraction
- `POST /api/multiply`: Multiplication
- `POST /api/divide`: Division

### Advanced Operations
- `POST /api/sqrt`: Square root
- `POST /api/power`: Exponentiation
- `POST /api/trig`: Trigonometric functions (sin, cos, tan)
- `POST /api/log`: Logarithm

## Setup and Installation

### Prerequisites
`Python` installed on your local machine _(Python 3.7 or higher recommended)_
   - To test if it is installed, open your Command Line Terminal, and run:
     ```bash
      python --version
     ```
     or
     ```bash
      python3 --version
     ```
   - If not installed, you can download Python here:
     - Windows OS: https://www.python.org/downloads/
     - macOS: https://www.python.org/downloads/macos/

### Installation Steps

1. Clone this repository.
2. Navigate to the `Project/backend/` directory, and open a command line terminal.
3. Run `pip install -r requirements.txt` to install dependencies.

### Running the Application
To run the application, execute the following command in the project directory:
```bash
python app.py
```

The API will be available at http://localhost:5000.

#### Usage Examples:

- Addition:

   `POST /api/add`
   
   Content-Type: application/json
   ```json
   {
      "number_1": 5,
      "number_2": 3
   }
   ```

   Response:
   ```json
   {
      "result": 8
   }
   ```

- Square Root:
   
   `POST /api/sqrt`

   Content-Type: application/json
   ```json
   {
      "number": 16
   }
   ```

   Response:
   ```json
   {
      "result": 4
   }
   ```

---
