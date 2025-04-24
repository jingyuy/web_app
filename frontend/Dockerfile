# Use Node.js 18 as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

RUN npm run build
# Expose the port the app runs on
EXPOSE 3000

# Start the React app using npx serve
CMD ["npx", "serve", "-s", "build", "-l", "3000"]