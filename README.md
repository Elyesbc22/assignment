# A statically generated blog using NextJS

Warning : Make sure that your ports 8080 and 3306 are free

## What you need to install

- docker
- docker-compose
- mariaDB and mariaDB Server extension in you Docker Desktop
- npm
- npx
## Creating the docker

enter command "docker-compose up -d"
then run "docker-compose up"

This will start the dockers and you will have access to the database using Adminer on localhost:8080 which will display all your tables
the username for the db is "root" and password is "password"
## Setting up the database

Either copy paste the code inside Adminer's SQL field and run the script, or connect to mariaDB inside the docker and run the script

Follow the instructions and replace the values according to the configuration
EXAMPLE:
Run
    docker cp hoge.sql [contaier-id]:/hoge.sql
Replace hoge.sql with db.sql and container-id with your container id, you should be able to see it

https://dev.to/n350071/login-to-mysql-on-docker-and-run-a-sql-file-2bk7

Now you should be able to see everything inside Adminer

## Taking a look at the Database

type localhost:8080 inside your browser and type for the following fields

server > "mariadb"
username > "root"
password > "password"
## Setting up nextJS

enter command "npm install" to install node_modules
enter command "npm dev run" to run the website on localhost:3000

## What is missing:

- Proper database update
you need to enter what is inside risklick's post API to have it inside the Database

- Custom Login
as I am using next-auth and Github as the provider, you can only connect to the website with github

Other than that I should have done everything else