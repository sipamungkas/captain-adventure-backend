## How To Run Captain Adventure Backend Service

Captain Adventure Backend requires [Node.js](https://nodejs.org/) v4+ to run.

Clone this repository

```sh
git clone https://github.com/sipamungkas/captain-adventure-backend.git

```

Install the dependencies and devDependencies and start the server.

```sh
$ cd captain-adventure-backend
$ npm install
```

Fill all the configuration

```sh
$ cp env.example .env
```

Open and fill all of the configuration in the .env file

Run the service

```sh
npm run dev //development environment
npm start // production environment
```

Test

```sh
npm test
```

Database Migration

```sh
npx sequelize db:create //create database automatically from skip this if you want to create the databse manually

npx sequelize db:migrate
npx sequelize db:seed:all

```

List of available email service chek this
[SendInBlue](https://nodemailer.com/smtp/well-known/) documentation
