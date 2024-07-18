# frontend-app/Dockerfile

# Utilise une image de Node.js comme image de base
FROM node:18

# Définit le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie les fichiers de package et installe les dépendances
COPY package*.json ./
RUN npm install

# Copie tous les fichiers de l'application
COPY . .

# Construis l'application React
RUN npm run build


# Expose le port sur lequel l'application tourne
EXPOSE 3000

# Démarre le serveur pour servir l'application construite
CMD ["npm", "run", "start"]
