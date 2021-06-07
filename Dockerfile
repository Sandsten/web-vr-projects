FROM node:lts-alpine3.13@sha256:954f97825c2b535defef235dd8b92a7936b59b12aa6685bc1b5c17864b2812c3 as builder
# v14.17.0

# Create a folder called app in our container and set it as our working directory
# I.e all subsequent commands will use this as root
WORKDIR /app

# Copy over our package files in to the root folder of our project in the container
COPY ["package.json", "package-lock.json", "./"]

# Install npm packages
RUN npm install

# Copy our source code into the container
# Files/folders in .dockerignore will not be copied into the container
COPY . .

####
# Multistage build
####
FROM node:lts-alpine3.13@sha256:954f97825c2b535defef235dd8b92a7936b59b12aa6685bc1b5c17864b2812c3

WORKDIR /app

COPY --from=builder /app/ /app/

CMD [ "npm", "start" ]