import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 
/*
App: Calculator application with basic arithmetic operations and few advanced operations like logarithms and square roots.
NOTE: The code is not 100% complete and flawless. There is room for improvement. These could include:
TODO: Fixes Required
[1] After a invalid operation is performed either 'Error' or 'Error: <error description of invalid operation>' is displayed
    on screen. After which if a user clicks on any number for calculation, this app considers the text for calculation. This
    needs to be fixed to reset the display and add the first clicked operand as the first number.
[2] Need to add check if result is error string and when pressing a 'operation symbol' followed by pressing 'equals' button 
    then do not call backend with the operands. As this generates error 500 code.
[3] Implement robust handling of Error conditions ( example: 'division by zero', etc) by displaying a specific error message
    instead of relying on backend error.
[5] Adding a limit to the number of decimal places that can be entered for avoiding precision issues.
[6] Implement robust handling of extremely large numbers (refer to JavaScript's maximum and minimum number limit) to prevent
    unexpected behavior.

TODO: Enhancements
[1] Add Keyboard input support for ease of use.
[2] Add explicit checks for invalid operations to send-in more accurate requests to backend to minimize error hits to backend 
    and potential 500 server errors.
[3] Add a 'backspace' or 'delete' function to allow users to correct mistakes while entering input number.
[4] Add a dynamic font size adjustment for the display to accommodate very large numbers without overflow.
[5] Add a feature for storing calculation histories to allow users to review past calculations and use these results for further
    calculations.
[6] Add a feature to copy the result in to the clipboard directly from the calculator display.
[7] Add unit tests for the frontend to ensure reliability.
*/
function App() {
  // State variables for calculator functionality
  const [calculator_display, set_calculator_display] = useState('0'); // Current display value
  const [first_operand, set_first_operand] = useState(null); 
  const [current_operation, set_current_operation] = useState(null);
  const [awaiting_second_operand, set_awaiting_second_operand] = useState(false);
  const [is_calculation_complete, set_is_calculation_complete] = useState(false); // Flag for calculation state

  // Helper Function to format large numbers for display after operations
  const format_large_number = (number) => {
    // If number is within printable limit return number as is.
    if (Math.abs(number) < 1e15 && Math.abs(number) > 1e-6) {
      return number.toString();
    }
    // For very large or very small numbers convert to exponential notation with 10 digits maximum 
    return number.toExponential(10);
  };

  // Helper Function to get the symbol for each operation
  const get_operation_symbol = (operation) => {
    switch (operation) {
      case 'add': return '+';
      case 'subtract': return '-';
      case 'multiply': return '×';
      case 'divide': return '÷';
      default: return '';
    }
  };  
  
  // Handle number [0 to 9] button clicks
  const handle_number_input = (input_number) => {
    // When handling the inputs if second number is not yet received or if 'equals' sign is not clicked 
    if (awaiting_second_operand || is_calculation_complete) {
      set_calculator_display(input_number);
      set_awaiting_second_operand(false);
      set_is_calculation_complete(false);
    } else {
      // If user entered only decimal then convert it to 0
      if (input_number === '.') {
        if (!calculator_display.includes('.')) {
          set_calculator_display(calculator_display === '0' ? '0.' : calculator_display + input_number);
        }
      } else {
        set_calculator_display(calculator_display === '0' ? input_number : calculator_display + input_number);
      }
    }
  };

  // Handle operation [Eg.: +,-,x, etc] button clicks by setting first_operand, operation type, second_operand, and operation_status
  // When a operation sign is clicked then await second number
  const handle_operation_click = (operation) => {
    set_first_operand(parseFloat(calculator_display));
    set_current_operation(operation);
    set_awaiting_second_operand(true);
    set_is_calculation_complete(false);
  };

  // Toggle the negative sign of the current number (+/-)
  const toggle_sign = () => {
    set_calculator_display(num_on_display => {
      if (num_on_display === '0') return num_on_display;
      return num_on_display.startsWith('-') ? num_on_display.slice(1) : '-' + num_on_display;
    });
  };
 
  // Perform calculation and display the result
  const calculate_result = async () => {
    // If first_operand and operation type not found then do nothing
    if (first_operand === null || current_operation === null) return;

    try {
      // Request backend API with operands and operation type to get results
      const api_response = await axios.post(`http://localhost:5000/api/${current_operation}`, {
        number_1: first_operand,
        number_2: parseFloat(calculator_display)
      });
      // Format the returned result from API in case if large number
      const formatted_result = format_large_number(api_response.data.result);
      set_calculator_display(formatted_result);
      set_is_calculation_complete(true);
    } catch (error) {
      // If invalid operation then display error
      if (error.response?.data?.error) {
        set_calculator_display('Error: ' + error.response.data.error);
      } else {
        set_calculator_display('Error');
      }
      set_is_calculation_complete(false);
    }

    set_first_operand(null);
    set_current_operation(null);
  };
  
  // Clear the calculator display by clearing the calculator variables. [Reset display]
  const clear_calculator = () => {
    set_calculator_display('0');
    set_first_operand(null);
    set_current_operation(null);
    set_awaiting_second_operand(false);
  };

  // Handle advanced operations (Eg.: sqrt, log)
  const perform_advanced_operation = async (operation) => {
    try {
      let api_endpoint = '';
      let request_payload = {};

      // Create the API request to send to backend API
      switch (operation) {
        case 'sqrt':
          api_endpoint = 'sqrt';
          request_payload = { number: parseFloat(calculator_display) };
          break;
        case 'log':
          api_endpoint = 'log';
          request_payload = { number: parseFloat(calculator_display) };
          break;
        default:
          return;
      }

      // Request backend API with operand and operation type to get results
      const api_response = await axios.post(`http://localhost:5000/api/${api_endpoint}`, request_payload);
      // Format the returned result from API in case if large number
      const formatted_result = format_large_number(api_response.data.result);
      // Display result on the calculator display 
      set_calculator_display(formatted_result);
      set_is_calculation_complete(true);
    } catch (error) {
      if (error.response?.data?.error) {
        set_calculator_display('Error: ' + error.response.data.error);
      } else {
        set_calculator_display('Error');
      }
    }
  };

  return (
    <div className="calculator-box">
      <h1 className="calculator-title">CALCULATOR</h1>
      <div className="calculator">
        {/* A display screen to display the operand, mathematical operation, and the calculated result */}
        <div className="display">
          <div className="operation">
            {first_operand !== null && `${first_operand} ${current_operation ? get_operation_symbol(current_operation) : ''}`}
          </div>
          <div className="current-value">{calculator_display}</div>
          {is_calculation_complete && (
            <div className="result">
              = {calculator_display}
            </div>
          )}
        </div>

        {/* Display all the calculator buttons with 4 buttons on each row*/}
        <div className="buttons">
          <button id="clear-button" onClick={clear_calculator}>C</button>
          <button id="operation-button" onClick={() => perform_advanced_operation('sqrt')}>√</button>
          <button id="operation-button" onClick={() => perform_advanced_operation('log')}>log</button>
          <button id="operation-button" onClick={() => handle_operation_click('divide')}>÷</button>
  
          <button onClick={() => handle_number_input('7')}>7</button>
          <button onClick={() => handle_number_input('8')}>8</button>
          <button onClick={() => handle_number_input('9')}>9</button>
          <button id="operation-button" onClick={() => handle_operation_click('multiply')}>×</button>
  
          <button onClick={() => handle_number_input('4')}>4</button>
          <button onClick={() => handle_number_input('5')}>5</button>
          <button onClick={() => handle_number_input('6')}>6</button>
          <button id="operation-button" onClick={() => handle_operation_click('subtract')}>-</button>
  
          <button onClick={() => handle_number_input('1')}>1</button>
          <button onClick={() => handle_number_input('2')}>2</button>
          <button onClick={() => handle_number_input('3')}>3</button>
          <button id="operation-button" onClick={() => handle_operation_click('add')}>+</button>
          
          <button onClick={toggle_sign}>+/-</button>
          <button onClick={() => handle_number_input('0')}>0</button>
          <button onClick={() => handle_number_input('.')}>.</button>
          <button id="equals-button" onClick={calculate_result}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;