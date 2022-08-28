# Seja bem vindo ao projeto Trybe-Futebol-Clube! ⚽️


## Stack utilizada

**Back-end:** Typescript com Conceitos POO e SOLID, NodeJs, Express, Sequelize, (Mocha, Chai e Sinon) para testes de integração e Docker


<details>
  <summary><strong>👨‍💻 O que foi desenvolvido</strong></summary>
   ![Exemplo app front](assets/TFC.gif)

  O `TFC` é um site informativo sobre partidas e classificações de futebol simulando a tabela do Brasileirão 2022! ⚽️

  1. Foi desenvolvo o `TFC`, onde fiquei responsável por desenvolver uma API (utilizando o método `TDD`) e também integrar *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de dados.

  Nesse projeto, eu construi **um back-end dockerizado utilizando modelagem de dados através do Sequelize**.O desenvolvimento deste projeto **respeitou regras de negócio** e **a API é consumida pelo front-end**.

  Temos a opção de adicionar uma partida, mas para adicionar é necessário ter um _token_ e a pessoa deverá estar logada para fazer as alterações. Temos um relacionamento entre as tabelas `teams` e `matches` para fazer as atualizações das partidas.

  Pude implementar regras de negócio para popular adequadamente a tabela disponível no front-end onde ela é exibida para a pessoa usuária do sistema.
<br />
</details>

<details>
<summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes na sua estrutura:

1️⃣ **Banco de dados:**
  - Container docker MySQL configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`;
  - Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.
  - Adicionei um arquivo no local `/app/backend/.env.example` para caso você queira rodar o banco de dados localmente, basta renomea-lo para .env e as váriaveis de ambiente já estão configuradas ao docker.
  
2️⃣ **Back-end:**
 - Ele roda na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - Sua aplicação é inicializada a partir do arquivo `app/backend/src/server.ts`;
 - Ela garanta que o `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;

3️⃣ **Front-end:**
  - O front se comunica com serviço de back-end pela url `http://localhost:3001` através dos endpoints que foi construído.

4️⃣ **Docker:**
  - O `docker-compose` une todos os serviços conteinerizados (backend, frontend e db) e sobe o projeto completo com o comando `npm run compose:up`;

</details>

<details>
<summary><strong>🕵️ Linter</strong></summary><br />

Para garantir a qualidade do código, usei o [ESLint](https://eslint.org/) para fazer a sua análise estática.

Este projeto já vem com as dependências relacionadas ao _linter_ configuradas nos arquivos `package.json` nos seguintes caminhos:

- `app/backend/package.json`

Para rodar o `ESLint` em um projeto, basta executar o comando `npm install` dentro do projeto e depois `npm run lint`. Se a análise do `ESLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

Você também pode instalar o plugin do `ESLint` no `VSCode`: bastar ir em extensions e baixar o [plugin `ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

</details>

<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2

➡️ O `node` deve ter versão igual ou superior à `16.15.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16 --lts`
    - `nvm use 16`
    - `nvm alias default 16`

➡️ O`docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:
</details>

# Orientações

<details>
  <summary><strong>🐋 Rodando no Docker</strong></summary>
  
  ## 👉 Com Docker
    ### Docker e Docker-compose

  ⚠ O seu docker-compose precisa estar na versão 1.29 ou superior.  ⚠
[Veja aqui a documentação para atualizar o docker-compose.](https://docs.docker.com/compose/install/)

- Para rodar o projeto por completo, basta digitar o código em seu terminal `npm run compose:up`;

</details>

<details>
<summary><strong> ⚠️ Inicialização do compose e verificação dos logs das aplicações </strong></summary><br />

- Considerando o uso do parâmetro `healthcheck` em cada container do seu `docker-compose.yml`, a inicialização dos containers deve aguardar o comando de status de saúde (o que valida se aquele container está operacional ou não):
  - No container `db`, representado por um comando `ping` no banco de dados;
  - No back-end, representado por um comando `lsof`, que vai procurar aplicações ativas na porta definida (por padrão, no caso `3001`);
  - No front-end, representado por um comando `lsof`, que vai procurar aplicações ativas na porta definida (por padrão, no caso `3000`).

- Caso os containers respeitem as premissas anteriores, os mesmos devem ser criados sem maiores problemas:

![Criação dos containers concluída com sucesso!](assets/compose-status-01.png)

- Em caso de algum problema (no back-end, por exemplo), você deve se deparar com alguma mensagem do tipo:

![Erro no status de saúde do container do back-end](assets/compose-status-03.png)

> Aqui não houve problema com o `tsc`, porém a senha para acesso ao banco pelo sequelize estava errada.

![docker-compose logs backend](assets/compose-status-04.png)

</details>

<details>
  <summary><strong>🎲 Sequelize</strong></summary>
  <br/>

  Para o desenvolvimento, foi baseado no *Diagrama de Entidade-Relacionamento (DER)* para construir a modelagem do banco de dados. Com essa imagem você já consegue saber:
  - Os nome das tabelas e colunas;
  - Os tipos de suas colunas;
  - Relações entre tabelas.

    ![Exemplo banco de dados](assets/er-diagram.png)

</details>
<h1 style="center">Obrigado pela visita ao meu repositório</h1>

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://vinidipaula.vercel.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vinicius-depaula/)


