# Utilisation d'une image de base Node.js
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de votre application dans le conteneur
COPY . .

# Installer les dépendances de l'application
RUN npm install

# Exposer le port sur lequel votre application écoute
EXPOSE 3000

# Commande pour démarrer votre application
CMD ["npm", "start"]