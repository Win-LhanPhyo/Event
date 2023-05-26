# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN yarn install


# Copy the remaining project files to the working directory
COPY . .

# Build the React app
RUN yarn build

# Expose the desired port (e.g., 3000) for accessing the app
EXPOSE 3000

# Define the command to run the app when the container starts
CMD ["yarn", "start"]