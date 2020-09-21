## Payment transaction handler

![project logo](static/img/1.png)

## Description

Handle transaction and save it into google spreadsheet

## Prerequisites

1. [Create a service account in Google Cloud Platform](https://cloud.google.com/iam/docs/creating-managing-service-accounts#creating)

   1.1. Create and remember private keys as JSON (`google-account-email` and `google-private-key`)

2. Config google spreadsheet

   2.1. Remember `google-spread-id`

   2.2. Share spreadsheet with `google-account-email` with editing permissions

3. To work with google spreadsheet API the project uses [google-spreadsheet npm package](https://theoephraim.github.io/node-google-spreadsheet/#/)

   3.1. To authenticate service account credentials strategy is used

4. [Firebase](https://firebase.google.com/) is used as infrastructure layer

   4.1 [Cloud Functions](https://firebase.google.com/products/functions) as API layer and pub-sub layer when database is updated

   4.2. [Cloud Firestore](https://firebase.google.com/products/firestore) as database

## Installation

1. Install the dependencies:

```bash
$ npm install
```

2. Setup [environment configuration](https://firebase.google.com/docs/functions/config-env)

   2.1. The project is depend on the following [env variables](runtimeconfig.example.json)

## Development

1. Install `firebase` globally or use by `npx firebase`
2. Export environment configuration:

```bash
$
$ firebase functions:config:get > .runtimeconfig.json
```

3. Use [firebase emulator](https://firebase.google.com/docs/functions/local-emulator#run_the_emulator_suite):

```bash
$ npm start
# will clean dist; build typescript with watch mode; start emulator
```

4. Or use [firebase shell](https://firebase.google.com/docs/functions/local-shell)

```bash
$ npm run start:shell
# will clean dist; build typescript with watch mode; start local shell
```

## Deploy

- Deploy all functions

```bash
$ npm run deploy
# will clean dist; lint and build typescript; deploy firebase functions
```

- Deploy a specific function

```bash
$ npm firebase deploy --only functions:functionName1,functionName2
```

## Test

TODO
