# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for efficient npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Set environment variables (optional, as some may already be in your `.env` file)
# ENV ENABLE_DEBUGGING=true
# ENV DEFAULT_USER_ID=your-default-user-id
# ENV DEFAULT_CHANNEL_ID=your-default-channel-id
# ENV BOT_TOKEN=your-bot-token
# ENV PORT=3000

# Expose the port the app will run on
EXPOSE 3000

# Command to run the app
CMD ["node", "index.js"]
