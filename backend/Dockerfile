FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Build TypeScript code
RUN npm run build

EXPOSE 7000

CMD ["npx", "nodemon", "src/index.ts"]

