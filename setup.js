#! /usr/bin/env node

const { execSync } = require("child_process");

console.log("===Inicializando Projeto===");

execSync(`npm init -y`, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
  }
});

console.log("===Instalando dependências===");

execSync(
  `npm install express express-async-errors cors dotenv @prisma/client`,
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.stack}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
  }
);

console.log("===Instalando dependências de desenvolvimento===");

execSync(
  `npm install typescript ts-node nodemon prisma eslint prettier eslint-config-airbnb-base eslint-config-airbnb-typescript eslint-plugin-import eslint-plugin-prettier @types/cors @types/express @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser -D`,
  (error, stdout, stderr) => {
    console.log("===Instalando dependências de desenvolvimento do projeto===");
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
  }
);

console.log("===Apagando setup===");

execSync(`rm setup.js`, (error, stdout, stderr) => {
  console.log("===Apagando setup===");
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
  }
});

console.log("===Tudo Pronto===");
