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
npx sequelize-cli db:create //create database automatically from skip this if you want to create the databse manually

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

```

One script to run all database migration and seeder

```sh
npm run db-reset
```

List of available email service chek this
[NodeMailer](https://nodemailer.com/smtp/well-known/) documentation

## How run captain adventure with docker-compose

```sh
$ cp env.example .env
```

setting environment for docker compose

important config (dont change otherwise you change the docker-compose.yml)

```sh
DB_HOST=mysql
DB_USERNAME=root
DB_password=alfatih1453
```

### Start docker container

```sh
$ docker-compose up -d
```

### Stop docker container

```sh
$ docker-compose down
```

### Postman Documentation

[Postman Documentation](https://documenter.getpostman.com/view/6708077/TW6tKpn4)
