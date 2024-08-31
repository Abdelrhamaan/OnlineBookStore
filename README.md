# Online Book Store

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)

## Description

A simple project to upload books, read them, and review them.

## Features

1. Upload new books.
2. View books uploaded by other users.
3. View reviews by other users.
4. Add reviews to books.

## Technologies

1. **BackEnd**:

   - Django
   - Django REST Framework
   - Django Admin

2. **FrontEnd**:

   - React
   - React Router DOM
   - Context API
   - Material UI
   - Axios

3. **Database**:

   - PostgreSQL

4. **Containerization**:
   - Docker
   - Docker Compose

## Installation

1. clone repository

   ```bash
       https://github.com/Abdelrhamaan/OnlineBookStore.git
   ```

2. Install node modules
   ```bash
       cd frontend
   ```
   ```bash
       npm install
   ```
3. build project with docker compose
   ```bash
       docker compose up --build
   ```
4. make migrations

   ```bash
    docker exec -it onlinebookstore-backend-1 python manage.py makemigrations

   ```

5. make migrate

   ```bash
    docker exec -it onlinebookstore-backend-1 python manage.py migrate

   ```

6. run this command to see test cases

   ```bash
    docker exec -it onlinebookstore-backend-1 python manage.py test

   ```

## Usage

1. You can create users by two ways :

- first way run this command docker exec -it paymobtask-backend-1 python manage.py createsuperuser
- second way go to this url http://localhost:3000/signup

2. enter to project by two ways :

- first way django admin panel http://localhost:8000/login
- second way go to react login page http://localhost:3000/login

3. after login you can go to create new book to create books from navbar new book
4. after adding new books you can open it or see reviews or add new reveiew on the book
