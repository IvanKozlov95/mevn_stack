# Simple application using MEVN stack.

## TOC

* [What is MEVN stack?](#what-is-mevn-stack)
* [Requirements](#requirements)
* [Usage](#usage)
	1. [Localhost](#localhost)
	2. [Docker](#docker)
* [Documentation](#documentation)
* [Features](#features)

## What is MEVN stack?
The acronym “MEVN” stands for “[MongoDB][1] [Express.js][2] [VueJS][3] [Node.js][4]”.

## Requirements
* MongoDB >= v3
* Express.js >= 4
* Node.js >= 10

## Usage

First, clone the repo:

    git clone https://github.com/IvanKozlov95/protranslating
    cd protranslating

Application can be run two ways: locally or via docker. Depends on what you want 
follow the instructions in sections below.

  ### Localhost

  Launch mongod instance in 1st terminal tab:

    mongod

  Launch REST API from 2d terminal tab. From cloned folder root:

    cd server
    npm i
    npm run start

  And finally launch vue application from 3d terminal tab. From cloned folder root:

    cd client
    npm i
    npm run start
  
  Now you can access application on http://localhost:8080/. See [features](#features)
  section to see what app can do.

  ### Docker

## Documentation

## Features


[1]: https://www.mongodb.com/ "MongoDB"
[2]: https://expressjs.com/ "ExpressJs"
[3]: https://vuejs.org/ "VueJS"
[4]: https://nodejs.org/en/ "Node.js"
[GNL]: https://github.com/IvanKozlov95/get_next_line
[printf]: https://github.com/IvanKozlov95/ft_printf
[mock]: https://www.youtube.com/watch?v=dQw4w9WgXcQ