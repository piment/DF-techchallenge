## Sogeti Digital Factory Tech Challenge

#### _This is a project for a technical interview_

_techno used : React, NodeJS, Express.js, Sass, Jest/[Supertest](https://www.npmjs.com/package/supertest), [Joi](https://joi.dev/), SQLITE3, NGINX, [PM2](https://pm2.keymetrics.io/)_

#### The Frontend application is deployed on Github page : https://piment.github.io/DF-techchallenge/

- I choosed to use ReactJS for this application, because I thought this library was well adapted for this kind of application, and it's the library I actually learn.
- One of the instructions was to host the frontend on Github page for the client to see it and follow the development, so I used [gh-pages](https://www.npmjs.com/package/gh-pages) npm package that let me build and deploy the application directly from the CLI.
- I also choosed not to use pre-made CSS libraries like Bootstrap, because instructions said to keep the UI simple, and it also was a manner to show a bit of my CSS (SASS) skills.

#### The Backend API is host on my private server : https://ata.mura.io/

- I arleady have a private server for others projects, host my personnal website, and test things, so I choosed to use it to host the backend part of this project.
- I used my own domain name to create a subdomain, link the API, and used NGINX to serve it.
- I used [PM2](https://pm2.keymetrics.io/) npm package to run and monitor the API, and [UpTimeRobot](https://uptimerobot.com) to monitor the online availability.

**Special Notice :**

- I tried to do "tests" on my application, but to be honest, it's something I theorically know, but not really already applied to real development, so I need to practice myself before being efficient with it, because I think it's a good approach to do application's development.

---

# Context

Our fantastic product owner has a wonderful, amazing and revolutionary idea... he wants to build a new Todo application.
He has a good idea of the application behavior and comes with a backlog containing the following user stories :

# User stories

## 1 : List my TODOs

### Description :

As a user I would like to list my current todos

### Acceptance criterias :

- Each todo could have, at minimal, a related state and title
- Some hard-coded todos will be initialized in this context to demonstrate the tool

## 2 : Change a TODO state

### Description :

As a user I would like to change a todo state by checking a "box"

### Acceptance criterias :

- When a todo is done, it should be placed at the bottom of the list and should be crossed out

## 3 : Detail a TODO

### Description :

As a user I would like to display one of my todo in a separate or dedicated view.
This todo will contain its title and a description (which is a new information not shown in the previous view).

### Acceptance criterias :

- We can click on a todo (by any way) to access the details view of the todo
- The todo could be accessed via a unique URL

## 4 : Add a new TODO

### Description :

As a user I would like to add a new todo in my list

### Acceptance criterias :

- The todo title is required
- The todo description can be empty
- The newly created todo has to be on top of the list of todos
- You are free to choose the design / interaction

# Technical environment

You're working in the WebFactory which provides the following technical recommendations :

- The backend application should be based on your preferred languages (Java , JS, PHP, Python, Go, C++, ...) and/or Framework (Spring Boot, Django, .NetCore , NodeJS, Angular, React, ...)
- To keep the UI simple
- Code quality is very important, so all the code has to be covered by unit tests
- Each user story should be realized in its own commit on master
- The product owner is curious and likes to read the application code on Github and test it via Github Pages
- The application should have a mocked backend and store all todos on it (extension of HttpXhrBackend)

# Bonus

You can add any new functionality in this wonderful project if you want to, in order to satisfy your PO 😉
