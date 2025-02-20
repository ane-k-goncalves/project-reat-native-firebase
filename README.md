# 1. Qual a diferença de testes unitários e testes E2E (End to End) em aplicação mobile?

Testes Unitários focam em testar partes pequenas e isoladas da aplicação, geralmente uma única função ou componente. Já os Testes E2E testam para verificar o comportamento da aplicação como um todo, simulando a interação do usuário com o app do início ao fim

# Jest e react-testing-library

npx expo install jest-expo jest

npm install --save-dev @testing-library/react-native --legacy-peer-deps

npm i --save-dev @types/jest

# RUN

npm run jest



# Cypress

os testes estão em cypress/e2e/app.cy.ts

npm install cypress --save-dev

# RUN 
 npm start --web
npx cypress run
