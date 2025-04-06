const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Função para executar comandos
function runCommand(command, cwd) {
  console.log(`Executando: ${command}`);
  try {
    execSync(command, { cwd, stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Erro ao executar: ${command}`);
    console.error(error.message);
    return false;
  }
}

// Função para verificar se um diretório existe
function directoryExists(dirPath) {
  return fs.existsSync(dirPath);
}

// Função para criar diretório se não existir
function createDirectoryIfNotExists(dirPath) {
  if (!directoryExists(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Diretório criado: ${dirPath}`);
  }
}

// Função para verificar se um arquivo existe
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Função principal
async function setup() {
  console.log('Iniciando configuração do projeto Aetheria...');

  // Criar diretórios se não existirem
  createDirectoryIfNotExists('frontend');
  createDirectoryIfNotExists('backend');
  createDirectoryIfNotExists('frontend/public');
  createDirectoryIfNotExists('frontend/public/sounds');
  createDirectoryIfNotExists('frontend/src');
  createDirectoryIfNotExists('backend/src');

  // Verificar se os arquivos package.json existem
  if (!fileExists('frontend/package.json')) {
    console.error('Erro: frontend/package.json não encontrado.');
    process.exit(1);
  }

  if (!fileExists('backend/package.json')) {
    console.error('Erro: backend/package.json não encontrado.');
    process.exit(1);
  }

  // Configurar backend
  console.log('\nConfigurando backend...');
  if (!directoryExists('backend/node_modules')) {
    console.log('Instalando dependências do backend...');
    runCommand('npm install', 'backend');
  }

  // Configurar frontend
  console.log('\nConfigurando frontend...');
  if (!directoryExists('frontend/node_modules')) {
    console.log('Instalando dependências do frontend...');
    runCommand('npm install', 'frontend');
  }

  // Instalar react-scripts no frontend
  console.log('\nInstalando react-scripts no frontend...');
  runCommand('npm install react-scripts', 'frontend');

  // Verificar se os arquivos principais existem
  if (!fileExists('frontend/src/index.js')) {
    console.log('Criando frontend/src/index.js...');
    fs.writeFileSync('frontend/src/index.js', 
      `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
    );
  }

  if (!fileExists('frontend/public/index.html')) {
    console.log('Criando frontend/public/index.html...');
    fs.writeFileSync('frontend/public/index.html', 
      `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#4A90E2" />
    <meta
      name="description"
      content="Aetheria - Santuário Digital de Bem-estar e Mindfulness"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Aetheria - Santuário Digital</title>
    <link href="https://fonts.googleapis.com/css2?family=Segoe+UI:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <noscript>Você precisa habilitar o JavaScript para executar este aplicativo.</noscript>
    <div id="root"></div>
  </body>
</html>`
    );
  }

  if (!fileExists('frontend/public/manifest.json')) {
    console.log('Criando frontend/public/manifest.json...');
    fs.writeFileSync('frontend/public/manifest.json', 
      `{
  "short_name": "Aetheria",
  "name": "Aetheria - Santuário Digital",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#4A90E2",
  "background_color": "#F5F9FF"
}`
    );
  }

  console.log('\nConfiguração concluída!');
  console.log('\nPara iniciar o projeto:');
  console.log('npm start');
  console.log('\nAcesse o aplicativo em: http://localhost:3000');
}

// Executar a função principal
setup(); 