import unittest
import json
from app import app


class TestApp(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_hello_endpoint(self):
        response = self.client.get('/api/test')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"message": "Hello World!"})

    def test_add_endpoint(self):
        payload = json.dumps({
            "number_1": 5,
            "number_2": 3
        })
        response = self.client.post('/api/add',
                                    data=payload,
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"result": 8})

    def test_add_invalid_input(self):
        payload = json.dumps({
            "number_1": 5
        })
        response = self.client.post('/api/add',
                                    data=payload,
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {"error": "Invalid input"})

    # Optional: Tests for additional operations
    # Uncomment and complete these tests if you implement
    # the below routes

    # def test_multiply_endpoint(self):
    #     # Prepare test data
    #     payload = json.dumps({
    #         "number_1": 4,
    #         "number_2": 5
    #     })
    #
    #     # TODO: Get Response from API endpoint '/api/multiply'
    #     # response = self.client.post('/api/multiply', data=payload,
    #     #                             content_type='application/json')
    #
    #     # TODO: Assert equals if API response is OK (200)
    #     # self.assertEqual(response.status_code, 200)
    #
    #     # TODO: Assert equals if API response 'result' is 20 (4 * 5)
    #     # self.assertEqual(response.json, {"result": 20})

    # def test_subtract_endpoint(self):
    #     # Write test code here

    # def test_divide_endpoint(self):
    #     # Write test code here

    # Add more tests for any additional routes created


if __name__ == '__main__':
    unittest.main()
