# nestJs-Fundamentals
REST API, Banco de Dados com TypeORM e Prisma, como criar autenticação JWT

### DB Postgress
Subir o container Docker e rodar em segundo plano.

Execute o seguinte comando no terminal:

````
docker-compose up -d
````

### Testar conexão - opcional
````
docker exec -it postgres_db psql -U postgres
````

Comandos no psql:
````
\l -- Lista os bancos de dados
\c postgres -- Conecta ao banco 'postgres'
\dt -- Lista as tabelas
````

para sair
`````
\q
`````

### Rodar o projeto
`````
npm run start:dev
`````

### Quando alterar algo na schema
`````
npx prisma migrate dev --name <nome da migrate>
`````
depois
````
npx prisma generate
````

### Para validar podemos usar o prisma studio
````
npx prisma studio   
````
