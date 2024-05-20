# AI-Driven Social Media Friend Recommendation System

## Overview
This system comprises two main components: a frontend application and a backend server, alongside a Prolog server for handling specific logic.

### System Architecture
Signal utilizes a multi-tiered web application model with a distributed client-server architecture comprising three key components:

- **Frontend Client**: Implemented as a React-based single-page application (SPA), facilitating dynamic user interactions without page reloads, communicating with the backend via HTTP requests.
- **Backend Server**: Hosted within a Django application, handling business logic, database operations, user authentication, and API responses.
- **Prolog Server**: Manages rule-based logic for complex decision-making tasks, including sentiment analysis and friend recommendation logic.

### Internal Functions
- **Sentiment Analysis Module**: Employs a locally downloaded model from Hugging Face's Transformers library for analyzing the emotional tone of posts.
- **Friend Recommendation Engine**: Utilizes a Prolog engine applying rule-based logic to sentiment analysis outputs to suggest potential friends.
- **Content Management**: Manages user-generated content within the Django admin panel, ensuring data integrity and consistency.
  - **User Management**: Administrators can manage user profiles, including details like usernames and statuses.
  - **Posts Management**: Administrators can add, edit, or delete posts, which includes managing the sentiment analysis results and associated images.
  - **Friend and Interaction Tracking**: Oversees friendships, friend requests, and messaging between users.

### Internal Interfaces
- **RESTful API Layer**: Facilitates communication between the frontend and backend, supporting CRUD operations, authentication, and friend recommendation processes.
- **Database ORM**: Django's ORM simplifies database interactions, enhancing maintainability and scalability.
- **Sentiment Analysis Interface**: Processes text to determine underlying emotions through Django views using pre-trained models.
- **Prolog Integration via REST API**: Enables communication between the Django server and the Prolog server for rule-based logic processing.

### System Structure Diagram
The structure diagram illustrates the interactions within Signal:
- **Posted Message**: User-generated content that undergoes sentiment analysis.
- **Labels**: Generated from sentiment analysis indicating emotions like joy, anger, optimism, etc.
- **Rule-Based System**: Employs Prolog to make intelligent friend-pairing suggestions based on the labels.
- **Friends Recommended**: Outputs friend recommendations based on the analysis of posted messages.

![System Structure](Structure%20of%20the%20system.png)




### Homepage
![Homepage](Homepage.png)
*The main landing page where users can post updates and interact with other users' posts.*



### Friend Page
![Friend Page](Friend%20Page.png)
*This page shows friend requests, suggestions, and the current friends list, allowing users to manage their social connections.*



### Message Page
![Message Page](Message%20Page.png)
*Allows users to communicate directly with friends, supporting instant messaging functionalities.*



### Sentiment Analysis Result
![Sentiment Analysis Result](Sentiment%20Analysis%20Result.png)
*Displays sentiment analysis results within the admin dashboard for monitoring the emotional tone of posts.*



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

