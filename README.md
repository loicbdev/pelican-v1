# Project - private social network

Objective: Create an internal social network for the Pelican residence (between neighbors!).

**This project is only a 1st version and another more elaborate version is in progress.**

![screenshot](https://imgur.com/MxbWKAk.png)

![screenshot](https://imgur.com/ll5b58H.png)

## Professional skills

- Design and integrate an user interface (Vue.js)
- Create and implement a REST API
- Implement CRUD operations in a secure manner
- Authenticate an user and maintain his session
- Data storage in a SQL database
- Data security (OWASP)

## Technical skills

- Vue.js / Vuex / Vuetify
- Node.js / Express
- API REST
- Postman
- TinyMCE (WYSIWYG)
- Bcrypt
- JWT
- Sequelize ORM
- MySQL

## Safeguards in place

- Creation of a password verification scheme with **password-validator**
- User password hash with **bcrypt**
- User authentication by token with **jsonwebtoken**
- Secure Express by setting various HTTP headers with **helmet** ([equals 11 protections](https://www.npmjs.com/package/helmet))
- Prevention against brute force attacks with **express-rate-limit**

## Installation

### Prerequisites

- Node.js
- MySQL

### Database

- Connect to **MySQL**, then run the command: `CREATE DATABASE pelican_development;`

- Import the pelican_development.sql file (It is located in: /pelican-backend/database):

  mysql -u root -p pelican_development < (file path in your computer)/pelican_development.sql

Otherwise, you can start the project without importing the ".sql" file. When launching the application, an administrator account is automatically created (The administrator's login credentials must be configured beforehand in the ".env" file: username, email and password.).

### Backend

Open the pelican-backend folder in your editor's terminal then:

- `npm install`

- Create an "upload" folder (for imported images): /pelican-backend/upload

- Configure the ".env" file from the backend folder using the ".env.example" provided (/pelican-backend/.env.example);

- `npm start`

### Frontend

Open the pelican-frontend folder in your editor's terminal then:

- `npm install`

- `npm start`

### API Documentation

[API Documentation Tool | Postman](https://documenter.getpostman.com/view/13772904/TzJvdGQP)

- **USER**

| Method |          Path           |      Purpose      |
| :----: | :---------------------: | :---------------: |
|  POST  |    /api/users/login     |       Login       |
|  POST  |    /api/users/signup    |      Sign-up      |
|  GET   |   /api/users/accounts   |   Get all users   |
|  GET   | /api/users/accounts/:id |   Get one user    |
|  PUT   | /api/users/accounts/:id | Update an account |
| DELETE | /api/users/accounts/:id | Delete an account |

- **POST**

| Method |        Path         |       Purpose        |
| :----: | :-----------------: | :------------------: |
|  POST  |   /api/posts/add    |    Create a post     |
|  GET   |     /api/posts      |    Get all posts     |
|  GET   |   /api/posts/hot    | Get most liked posts |
|  GET   | /api/posts/user/:id | Get one user's posts |
|  GET   |   /api/posts/:id    |     Get one post     |
|  PUT   |   /api/posts/:id    |    Update a post     |
| DELETE |   /api/posts/:id    |    Delete a post     |

- **COMMENT**

| Method |          Path           |     Purpose      |
| :----: | :---------------------: | :--------------: |
|  POST  | /api/posts/:id/comments |  Add a comment   |
| DELETE | /api/posts/comments/:id | Delete a comment |

- **LIKE (FAVORITE)**

| Method |        Path         | Purpose |
| :----: | :-----------------: | :-----: |
|  POST  | /api/posts/:id/like |  Like a post  |

- **ACTUALITY**

| Method |         Path         |       Purpose       |
| :----: | :------------------: | :-----------------: |
|  POST  | /api/actualities/add | Create an actuality |
|  GET   |   /api/actualities   | Get all actualities |
|  GET   | /api/actualities/contain?title=${title}` | Get actualities with title=? |
|  GET   | /api/actualities/:id |  Get one actuality  |
|  PUT   | /api/actualities/:id | Update an actuality |
| DELETE | /api/actualities/:id | Delete an actuality |

## Physical data model of the database

![physical data model](https://imgur.com/nGvVW25.png)

## Use

To register on this social network, you must inform:

- The residence code
- A nickname
- A valid email address
- Your building number
- A password

Once logged in, you can view user posts and post your choice:

- A message
- A message + an image
- A message + a video link (YouTube only)

Posts can be liked and / or commented on.

You can edit and / or delete your posts.

You can modify your profile (profile picture, nickname, email, password, building or biography).

Your account can be deleted by yourself or by the administrator.

The administrator can delete posts, comments and user accounts.

You can consult the news of the residence. Only the administrator can create, update or delete a news item.

## To do

- Backend : reorganize folders structure by layer (ex: A "services" folder will include all the business logic.)
- Frontend : reorganize "store" folder
- Frontend / Backend : testing (units, integration, e2e)

...then refactore code (when relevant!) and add new features!
