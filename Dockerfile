# Stage 1: Build the React application
FROM node:18-alpine as build

# Set the working directory in the Docker container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./
# If you are using yarn, copy yarn.lock and use yarn commands below
COPY yarn.lock ./

# Install dependencies
RUN yarn install
# For yarn, use:
#RUN yarn build

# Copy the rest of your application's code
COPY . .

CMD yarn start
# Build the application
#RUN npm run build

#CMD npm run start
# Stage 2: Serve the application with Nginx
#FROM nginx:stable-alpine as serve

# Copy the build output to replace the default nginx contents.
#COPY --from=build /app/dist/ /usr/share/nginx/html

# Copy nginx configuration (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the Docker host, so we can access it 
# from the outside.
#EXPOSE 80

# Start Nginx and keep it running in the foreground
#CMD ["nginx", "-g", "daemon off;"]
