# Aetheria - Santuário Digital de Bem-estar

Aetheria é um aplicativo web pessoal de bem-estar e mindfulness, projetado como um "santuário digital" para o usuário. O objetivo principal é proporcionar alívio de ansiedade e estresse através de experiências imersivas e relaxantes, fortemente inspiradas na natureza.

## Funcionalidades

- **Mixer de Sons Ambientais:** Misture e ajuste o volume de diversos sons da natureza (chuva, ondas, vento, etc.) para criar paisagens sonoras personalizadas.
- **Visualizações Relaxantes:** Animações visuais suaves e texturizadas, como "aquários digitais" personalizáveis.
- **Exercícios de Respiração Guiada:** Guia através de exercícios de respiração com animações visuais fluidas.
- **Diário de Reflexão:** Espaço para registrar pensamentos e sentimentos em uma interface elegante.

## Tecnologias Utilizadas

### Frontend
- React
- Styled Components
- Framer Motion
- Howler.js (para manipulação de áudio)
- React Router

### Backend
- Node.js
- Express
- MongoDB (para armazenamento de dados)
- JWT (para autenticação)

## Instalação Automática

Para instalar e iniciar o projeto automaticamente, siga estes passos:

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/aetheria.git
cd aetheria
```

2. Execute o script de instalação:
```bash
npm run install-all
```

3. Inicie o projeto:
```bash
npm start
```

O script irá:
- Instalar todas as dependências necessárias
- Configurar o ambiente
- Iniciar o backend e o frontend automaticamente

## Instalação Manual

Se preferir instalar manualmente, siga estes passos:

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/aetheria.git
cd aetheria
```

2. Instale as dependências do frontend:
```bash
cd frontend
npm install
```

3. Instale as dependências do backend:
```bash
cd ../backend
npm install
```

4. Configure as variáveis de ambiente:
Crie um arquivo `.env` na pasta backend com as seguintes variáveis:
```
PORT=3001
MONGODB_URI=sua_uri_do_mongodb
JWT_SECRET=seu_segredo_jwt
```

5. Inicie o servidor de desenvolvimento:
```bash
# Terminal 1 (backend)
cd backend
npm start

# Terminal 2 (frontend)
cd frontend
npm start
```

## Estrutura do Projeto

```
aetheria/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── features/
│   │   │   └── layout/
│   │   ├── styles/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── assets/
│   │   ├── context/
│   │   └── services/
│   └── public/
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── services/
    │   ├── config/
    │   └── middleware/
    └── public/
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

## Contato

Seu Nome - [@seu_twitter](https://twitter.com/seu_twitter) - email@exemplo.com

Link do Projeto: [https://github.com/seu-usuario/aetheria](https://github.com/seu-usuario/aetheria) 