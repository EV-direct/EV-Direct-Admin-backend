FROM node:22.14.0
WORKDIR /app
COPY package*.json .
RUN npm install
copy . .
CMD ["npm", "start"]
EXPOSE 5000