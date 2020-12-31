<div align="center">

A simple Node.js API starter using ES6 syntax with social authentication.

![dependencies](https://img.shields.io/david/bangunbagustapa/node-social-auth-api-starter?style=flat-square) ![dev dependencies](https://img.shields.io/david/dev/bangunbagustapa/node-social-auth-api-starter?style=flat-square)

</div>

## About

The main purpose of this repository is to show and setup a new Node.js API project in ES6 syntax with social authentication using Google and Facebook.

It is not a goal to be a comprehensive starter kit to making a Node.js API project, but this repository will be maintained.

## Folder structure

```
node-social-auth-api-starter
└── src                 # App codebase
    ├── config          # Configuration
    ├── controllers     # Controllers for handling routes
    ├── middlewares     # Express middlewares
    ├── models          # Database schema
    ├── routes          # Web routes
    └── utils           # Utility functions
```

## Dependencies

Here is a list of all dependencies:

- Express: Web framework for Node.js
- Mongoose: ODM library for database.
- Passport: Authentication middleware.
- express-validator: Validation middleware.
- Babel: Convert the ES6 code to ES5 code.
- ESLint: Find and fix problems in JavaScript code using airbnb-base.
- Husky: Lint commit messages with lint-staged.

## Getting started

#### Download

Download the code by cloning the repository:

```
git clone https://github.com/bangunbagustapa/node-social-auth-api-starter.git <project_name>
```

#### Install

Install all the dependencies:

```
npm install
```

#### Configuration

Put your credential in `.env.example`:

```
MONGO_URI=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRE=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
```

and rename `.env.example` file to `.env`

#### Start application

Running the app locally:

```
npm run dev
```