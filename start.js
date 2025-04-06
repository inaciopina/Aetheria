const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Função para verificar se um diretório existe
function directoryExists(dirPath) {
  return fs.existsSync(dirPath);
}

// Função para iniciar um processo
function startProcess(command, args, cwd) {
  console.log(`Iniciando: ${command} ${args.join(' ')} em ${cwd}`);
  
  const process = spawn(command, args, { 
    cwd, 
    stdio: 'inherit',
    shell: true
  });
  
  process.on('error', (error) => {
    console.error(`Erro ao iniciar ${command}:`, error);
  });
  
  return process;
}

// Verificar se os diretórios existem
if (!directoryExists('frontend') || !directoryExists('backend')) {
  console.error('Erro: Diretórios frontend ou backend não encontrados.');
  console.error('Execute primeiro: npm run setup');
  process.exit(1);
}

// Verificar se os node_modules existem
if (!directoryExists('frontend/node_modules') || !directoryExists('backend/node_modules')) {
  console.error('Erro: node_modules não encontrados.');
  console.error('Execute primeiro: npm run setup');
  process.exit(1);
}

// Iniciar backend e frontend
console.log('Iniciando o projeto Aetheria...');

// Iniciar backend primeiro
console.log('\nIniciando backend...');
const backendProcess = startProcess('npm', ['start'], 'backend');

// Aguardar um pouco para o backend iniciar
setTimeout(() => {
  // Iniciar frontend
  console.log('\nIniciando frontend...');
  const frontendProcess = startProcess('npm', ['start'], 'frontend');

  // Tratamento de encerramento
  process.on('SIGINT', () => {
    console.log('\nEncerrando processos...');
    backendProcess.kill();
    frontendProcess.kill();
    process.exit();
  });

  console.log('\nProjeto iniciado!');
  console.log('Backend: http://localhost:3001');
  console.log('Frontend: http://localhost:3000');
  console.log('\nPressione Ctrl+C para encerrar.');
}, 2000); 