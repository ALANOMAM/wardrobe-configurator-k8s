## Description

The project is a very simple wardrobe elements configurator with a 3d page that helps you see the elements and modify them. The project contains:

- A homepage with a form where you can create a wardrobe project from scratch.
- A wardrobes page where you can see the list of all the wardrobe projects you have created. In that page you can update, delete and have access to a 3d represetation of the elements in your wardrobe project.
- A 3d page where you can see the elements of a specific wordrobe project. By clicking on each element, a modal appears and gives you the ability to modify the dimensions of the wardrobe elements .
- There will be the possibility to create a final pdf of your wardrobe containing the dimensions of your elements, the clients data, manufacturers data and the nae o the one who devloped the wadrobe.

## Technologies

- This is a DOCKERIZED fullstack project with REACT on frontend, EXPRESS-SEQUELIZE-MYSQL on backend.
- The elements were created by me from scratch using BLENDER, in combination with the THREE.JS library, i was able to create a simple and interractive 3d page.
- I used CSS and PRIMEREACT library for styling.

# Setting up the project

## 1-Create and fix the env file

MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=mydb
MYSQL_USER=user
MYSQL_PASSWORD=password

DB_HOST=mysql
DB_USER=user
DB_PASSWORD=password
DB_NAME=mydb

## 2-Install the node modules fro frontend and backend folders

### `docker compose -f docker-compose-dev.yml run --rm npm-frontend npm install`

### `docker compose -f docker-compose-dev.yml run --rm npm-backend npm install`

## 3-Start the three containers

### `docker compose -f docker-compose-dev.yml up -d mysql backend frontend --build`

## 4-Enter in the backend container and run migrate and seed

### `docker exec -it <backend-container-id> sh`

### `npm run refresh-db`

The app runs in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

This project uses [Prime React](https://primereact.org/) and basic css for styling.

## 5-Turn off all the containers

### `docker compose -f docker-compose-dev.yml down`
