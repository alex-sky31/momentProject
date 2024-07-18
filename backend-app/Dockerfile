# backend-app/Dockerfile

# Utilise une image de Node.js comme image de base
FROM node:18

# Définit le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie les fichiers de package et installe les dépendances
COPY package*.json ./
RUN npm install

# Copie tous les fichiers de l'application
COPY . .

# Expose le port sur lequel l'application tourne
EXPOSE 8080

# Démarre l'application
CMD ["npm", "run", "start:dev"]
