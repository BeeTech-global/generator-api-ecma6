# generator-api-ecma6

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Restify api with unit and integrated tests written in ecma6

## Folder structure

```
.
├── src
|   ├── app
|   ├── core
|   ├── features
|   |   ├── {version}
|   |   |   ├── {domain}
|   |   |   |   ├── controllers
|   |   |   |   ├── repositories
|   |   |   |   ├── routes
|   |   |   |   ├── services
|   ├── router
|   ├── util
├── test
|   ├── integration
|   └── unit


```

### app

Folder with server implementation

### core

Folder with objects to be extendeds

### features

Folder with your domains
 
 * **version** - api version
   * **domain**
     * **controllers** - controllers (control the request and response flow) to be used in routes
     * **services** - services (business logic) to be used in controllers
     * **repositories** - repositories (bring data) to be used in services
     * **routes** - routes (only call controller method) to be exported to index.js file  

### router

Route consolidator

### util

Folder with helpers

## Installation

First, install [Yeoman](http://yeoman.io) and generator-restify-with-tests using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-api-ecma6
```

Then generate your new project:

```bash
yo api-ecma6
```

## Features
### Including
  * `.gitignore`
  * `.eslintrc` ([airbnb](https://www.npmjs.com/package/eslint-config-airbnb))
  * `.npmignore`
  * `.codeclimate.yml`
  * `.travis.yml`
  * `.editorconfig`
  * nodemon
  * git-pre-push (run test)
  * git-pre-commit (run lint)
  * git-post-commit (run git status)

## Usage

### Scripts

* Development
  ```
    npm run dev

  ```
  run nodemon src/index
  ```
    npm run dev:tests

  ```
  run nodemon and tests

* Coverage
  ```
    npm run coverage

  ```
  run istanbul coverage and put result in ```coverage/```

* Code Climate
  ```
    npm run climate-coverage

  ```
  run coverage and send it to [code-climate](https://codeclimate.com/) (you need to set CODECLIMATE_REPO_TOKEN as an enviroment variable)

* Code Climate dotenv
  ```
    npm run climate-coverage-dotenv

  ```
  run coverage and send it to [code-climate](https://codeclimate.com/) (you need to set CODECLIMATE_REPO_TOKEN in .env file)

* Start
  ```
    npm start

  ```
  run `node src/index.js`

* Dependencies Vulnerabilities
  ```
    npm run check-dependencies

  ```
  check dependencies vulnerabilities using [nsp](https://github.com/nodesecurity/nsp)

* Post install
  ```
    npm run postinstall

  ```
  call check-dependencies, this is will be called after every package installation

* Linter
  ```
    npm run lint

  ```
  run `eslint src` according `.eslintrc` file

* Tests

  * Unit
    ```
      npm run test:unit

    ```
    run `mocha --opts test/mocha.opts test/unit`

  * Integration
    ```
      npm run test:integration

    ```
    run `mocha --opts test/mocha.opts test/integration`

  * All
    ```
      npm test

    ```
    run `mocha`


## License 

MIT © 

[npm-image]: https://badge.fury.io/js/generator-api-ecma6.svg
[npm-url]: https://npmjs.org/package/generator-api-ecma6
[daviddm-image]: https://david-dm.org/BeeTech-global/generator-api-ecma6.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/BeeTech-global/generator-api-ecma6
