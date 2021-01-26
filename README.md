<div align="center">

An example of Node.js API using ES6 syntax with social authentication.

![dependencies](https://img.shields.io/david/bangunbagustapa/node-mongo-social-auth-api-example?style=flat-square) ![dev dependencies](https://img.shields.io/david/dev/bangunbagustapa/node-mongo-social-auth-api-example?style=flat-square)

</div>

## About

The main purpose of this repository is to show and setup a new Node.js API project in ES6 syntax with social authentication using Google and Facebook.

## Folder structure

```
node-mongo-social-auth-api-example
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
- Mongoose: For interfacing with MongoDB database.
- Passport: Authentication middleware.
- express-validator: Validation middleware.
- Babel: Convert the ES6 code to ES5 code.
- ESLint: Find and fix problems in JavaScript code using airbnb-base.
- Husky: Lint commit messages with lint-staged.

## Getting started

#### Download

Download the code by cloning the repository:

```
git clone https://github.com/bangunbagustapa/node-mongo-social-auth-api-example.git <project_name>
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
ACCESS_TOKEN_EXPIRES=

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