# Dockerfile for Blog Service


FROM node:18


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY . .
RUN npm run build

EXPOSE 3001

ENV DB_URI=mongodb+srv://guptashrey163:blog-service@blog-service.copboac.mongodb.net/
ENV JWT_SECRET=yourSecretKey
ENV authBaseUrl=http://auth-service:3000


CMD ["npm", "run", "start"]
