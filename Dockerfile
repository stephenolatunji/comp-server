FROM node:14-alpine
RUN mkdir -p /usr/src/app

WORKDIR /usr/app

ARG USER_JWT
ARG USER_HOST
ARG USER_DB
ARG USER_PASSWORD
ARG USER_

ENV JWT_SECRET $USER_JWT
ENV HOST $USER_HOST
ENV DB $USER_DB
ENV PASSWORD $USER_PASSWORD
ENV USER $USER_



COPY package*.json /usr/app/
RUN npm install
COPY . /usr/app/
EXPOSE 2000


CMD ["npm", "start"]
