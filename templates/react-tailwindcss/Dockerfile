# Dockerfile optimize for production
FROM node:14.16.1-alpine as build
COPY . /home/node/app
WORKDIR /home/node/app
RUN npm install
RUN npm run build

FROM nginx:1.19.10-alpine
COPY --from=build /home/node/app/dist /usr/share/nginx/html