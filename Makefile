install: 
	npm install

lint: 
	npx eslint .

db-migrate:
	npx knex migrate:latest

start:
	npx nodemon src/app.js