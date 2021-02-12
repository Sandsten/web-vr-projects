FROM node:14-alpine

# Create a folder called app in our container and set it as our working directory
# I.e all subsequent commands will use this as root
WORKDIR /app

# Copy over our package files in to the root folder of our project in the container
COPY ["package.json", "package-lock.json", "./"]

# Install npm packages
RUN npm install

# Copy our source code into the container
COPY ./src ./src

# Webpack config file needed too!
COPY ./webpack.config.dev.js .
COPY ./babel.config.json .

CMD [ "npm", "start" ]