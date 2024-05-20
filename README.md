# AI-Driven Social Media Friend Recommendation System

## Overview
This system comprises two main components: a frontend application and a backend server, alongside a Prolog server for handling specific logic.

![Homepage](Homepage.png)
![Friend Page](Friend%20Page.png)
![Message Page](Message%20Page.png)
![Sentiment Analysis Result](Sentiment%20Analysis%20Result.png)

## Setup Instructions

### Prerequisites
- Node.js and npm
- Python 3.x
- Virtual Environment (optional but recommended for Python)
- SWI-Prolog

### Setting Up Your Development Environment

1. **Frontend Application:**
   - Navigate to the `my-social-media-app` directory.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```

2. **Backend Server:**
   - Navigate to the `social_media_backend` directory.
   - Activate the virtual environment (Linux):
     ```bash
     source <env>/bin/activate
     ```
   - Install Python dependencies:
     ```bash
     pip install Django djangorestframework django-cors-headers transformers torch
     ```
   - Initialize the database:
     ```bash
     python manage.py migrate
     ```
   - Start the server:
     ```bash
     python manage.py runserver
     ```

3. **Prolog Server:**
   - Ensure SWI-Prolog is installed.
   - Start the Prolog server:
     ```bash
     swipl emotions_api_server.pl
     ```

## Contributing
Feel free to fork this repository, make changes, and submit pull requests. Make sure you adhere to the existing code standards and commit guidelines.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

