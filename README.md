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

3. Inicie os containers necessários para a aplicação com o docker-compose:

```
docker-compose up -d
```

4. Instale as dependências do projeto:

```
yarn install
```

5. Crie os arquivos `.env` e `.env.test` com base nos arquivos com a extensão `.example`:

## Uso

Para rodar o projeto em modo de desenvolvimento, utilize o seguinte comando:

```
yarn dev
```

Isso iniciará o servidor local e disponibilizará a aplicação em `http://localhost:PORTA` (substitua "PORTA" pelo número da porta configurada no arquivo `.env` do projeto).

## Testes

Para rodar os testes da aplicação, utilize o seguinte comando:

```
yarn test
```
