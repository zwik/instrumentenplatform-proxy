FROM node:16.14.0

# Create app directory
WORKDIR /home/node/app

# Install app dependencies
COPY package*.json .
RUN npm install

# Bundle app source
COPY src .

EXPOSE 3000