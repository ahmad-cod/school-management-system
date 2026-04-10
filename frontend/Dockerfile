FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Next.js dev mode
CMD ["npm", "run", "dev"]