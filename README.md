# Frete rápido Desafio Backend

## Descrição

Desenvolver uma API com 2 endpoints, o primeiro deve criar uma cotação com base em uma consulta na API da Frete Rápido, já o segundo deve consultar métricas das cotações armazenadas no banco de dados.

## Pré-requisitos

-   Docker e docker-compose instalados na máquina.

## Instalação

1. Clone o repositório do projeto:

```
git clone <URL_DO_REPOSITÓRIO>
```

2. Navegue para o diretório do projeto:

```
cd nome-do-projeto
```

3. Crie os arquivos `.env` com base no arquivo `.env.example`.

## Uso

Para rodar o projeto utilizando Docker, utilize o seguinte comando:

```
docker compose up -d
```

Após isso, um container docker com o servidor local é iniciado, disponibilizando a aplicação em `http://localhost:PORTA` (substitua "PORTA" pelo número da porta configurada no arquivo `.env` do projeto).

## Testes

Para rodar os testes da aplicação, utilize os seguintes comando:

```
yarn install
```

```
yarn test
```
