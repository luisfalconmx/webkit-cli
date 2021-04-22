FROM node:14.16.1-alpine
COPY . /usr/share/
WORKDIR /usr/share/
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]