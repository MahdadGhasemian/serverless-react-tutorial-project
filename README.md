# serverless-react-tutorial-project

# How to run this project
- npm i
- npm start

# How to create an amplify App

## Setup Amplify Cli
[Document Config](https://docs.amplify.aws/javascript/tools/cli/start/set-up-cli/)
[Document Initialize](https://docs.amplify.aws/javascript/tools/cli/start/key-workflows/#initialize-new-project)

- npm i -g @aws-amplify/cli
- npx create-react-app amplify-react-app
- cd amplify-react-app/
- amplify configure
- amplify init

## Setup Amplify Auth
[Document](https://docs.amplify.aws/javascript/build-a-backend/auth/set-up-auth/)

- amplify add auth
- amplify push
- npm install aws-amplify @aws-amplify/ui-react --save
- edit src/App.js
- npm start

## Setup Amplify GraphQL API
[Document](https://docs.amplify.aws/javascript/build-a-backend/graphqlapi/set-up-graphql-api/)

- amplify add api
- amplify push -y
- npm install aws-amplify --save
- edit src/App.js