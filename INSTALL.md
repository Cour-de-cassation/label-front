# Installation guide

## Requirements

- NodeJs v16, you can use `nvm` to use the version specify in the `.nvmrc` file.

## Configuration

You can lauch the backend with or withour docker. To configure these methods you must have an env file :
- `.env`

Copy and rename `.env.example`.

Label depends on 2 other services from the Cour de cassation : dbsder-api and nlp-pseudonymisation-api. You can lauch these services locally to simulate operation close to production or you can disable theses services from env files. In this case these 2 services are emulated by Label with the storage folder. To do so, follow the `Add documents you want to annotate` step in the [reuser guide](docs/reuserGuide.md) or just rename the `storage-example` folder to `storage`.

You should take a look at [juridependencies](https://github.com/Cour-de-cassation/juridependencies) to install theses services.

## Installation and lauch

Install dependencies with:

```sh
npm i
```

### Frontend

#### With docker:

Start the client with:

```sh
npm run start:docker
```

#### Without docker:

To lauch the frontend run:

```sh
npm run start:dev
```

Then, on your web browser, open http://localhost:55432


