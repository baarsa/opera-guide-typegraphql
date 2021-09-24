FROM node:12
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 8080
CMD npm start