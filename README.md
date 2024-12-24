## Multi-Container Docker Application with CI/CD: Calculator App Project

#### Complete Project Instructions: [DevOps Foundations Course/Project](https://github.com/shiftkey-labs/DevOps-Foundations-Course/tree/master/Project)

#### Submission by - **Naziya Tasnim**

### Project Overview

- **Brief project description:**

Calculator application built as a multi-container setup with separate frontend and backend containers. This project was an experiment to explore DevOps principles and containerization.

- **Files implemented:**

  - `README.md`: Provides context about the project and key learnings.
  - `backend/Dockerfile`: Configuration for the backend container image.
  - `frontend/Dockerfile`: Configuration for the frontend container image.
  - `docker-compose.yaml`: Defines multi-container setup for local development.
  - `.github/workflows/github-actions.yml`: GitHub Actions workflow for CI/CD pipeline.
  - `.gitignore`: Configures files and folders to exclude from version control.
  - `backend/requirements.txt`: Lists Python dependencies for the backend.
  - `backend/test_app.py`: Backend unit testing script.


### Docker Implementation

**Explain your Dockerfiles:**

- **Backend Dockerfile** (Python API):

  - Based on Alpine Linux 3.20 with Python 3.12.
  - Configures working directory and copies application files.
  - Installs dependencies via pip.
  - Exposes required ports.

- **Frontend Dockerfile** (React App):

  - Based on Alpine Linux 3.20 with Node.js 23.
  - Configures working directory and copies dependency files.
  - Installs dependencies via npm and builds the React app.
  - Exposes required ports.
  - Runs the React app with npm start.

### Docker Compose YAML Configuration

- **Services:** TODO
- **Networking:** TODO
- **Volumes:** TODO
- **Environment Variables:** TODO

**Use this section to explain how your services interact and are configured within `docker-compose.yml`.**

TODO


### CI/CD Pipeline (YAML Configuration)

**Explain your CI/CD pipeline:**

- What triggers the pipeline (e.g., push to main branch)?
- What are the different stages (build, test, deploy)?
- How are Docker images built and pushed to a registry (if applicable)?

**Use this section to document your automated build and deployment process.**

<!-- Include explanation here -->
<!-- Include explanation here -->
<!-- Include explanation here -->
<!-- Include explanation here -->
<!-- NOTE: It is not compulsory to include detailed explanations, writing succint concise points would also sufice. Make sure maintain readability and clarity. -->


### CI/CD Pipeline (YAML Configuration)

**Simply explain your CI/CD pipeline:**

- What triggers the pipeline (e.g., push to main branch)?
- What are the different stages (build, test, deploy)?
- How are Docker images built and pushed to a registry?

**Use this section to document your automated build, and docker process.**

<!-- Include explanation here -->
<!-- Include explanation here -->
<!-- Include explanation here -->
<!-- Include explanation here -->
<!-- NOTE: It is not compulsory to include detailed explanations, writing succint concise points would also sufice. Make sure maintain readability and clarity. -->


### Assumptions

- List any assumptions you made while creating the Dockerfiles, `docker-compose.yml`, or CI/CD pipeline. 

<!-- Include explanation here -->
<!-- Include explanation here -->
<!-- Include explanation here -->
<!-- Include explanation here -->
<!-- NOTE: It is not compulsory to include detailed explanations, writing succint concise points would also sufice. Make sure maintain readability and clarity. -->


### Lessons Learned

- What challenges did you encounter while working with Docker and CI/CD?
- What did you learn about containerization and automation?

**Use this section to reflect on your experience and learnings when implementing this project.**

<!-- Include explanation here -->
<!-- Include explanation here -->
<!-- Include explanation here -->
<!-- Include explanation here -->
<!-- NOTE: It is not compulsory to include detailed explanations, writing succint concise points would also sufice. Make sure maintain readability and clarity. -->


### Future Improvements

- How could you improve your Dockerfiles, `docker-compose.yml`, or CI/CD pipeline? 
- (Optional-Just for personal reflection) Are there any additional functionalities you would like to consider for the calculator application to crate more stages in the CI/CD pipeline or add additional configuration in the Dockerfiles?

**Use this section to brainstorm ways to enhance your project.**

<!-- Include explanation here -->
<!-- Include explanation here -->
<!-- Include explanation here -->
<!-- Include explanation here -->
<!-- NOTE: It is not compulsory to include detailed explanations, writing succint concise points would also sufice. Make sure maintain readability and clarity. -->






<!-- BEST OF LUCK! -->
