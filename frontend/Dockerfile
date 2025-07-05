# 1. Use official Node.js image
FROM node:18

# 2. Set working directory
WORKDIR /usr/app

# 3. Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# 4. Copy rest of the frontend code
COPY . .

# 5. Expose Vite’s default dev port
EXPOSE 5173

# 6. Start the development server
CMD ["npm", "dev"]
