FROM node:10
COPY . /instagras-content-ws
WORKDIR /instagras-content-ws
RUN npm install
EXPOSE 3000
CMD [ "node", "api.js" ]