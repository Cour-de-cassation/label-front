# Installation guide

## Requirements

- Node 22, you can use `nvm` to use the version specify in the `.nvmrc` file.
- This frontend call [label backend](https://github.com/cour-de-cassation/label-back)

## Installation and lauch

Install dependencies with:

```sh
npm i
```

### Frontend

#### With docker:

Start the client with:

```sh
docker compose up
```

#### Without docker:

To lauch the frontend run:

```sh
npm run start:dev
```

Then, on your web browser, open http://localhost:55432/label
