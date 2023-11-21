# Start with a base Node.js image
FROM node:20.9.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json ./
COPY yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of your application's code
COPY . .

RUN yarn prisma generate

# Build your application if necessary
RUN yarn build


# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["yarn", "performance:test:clear"]
