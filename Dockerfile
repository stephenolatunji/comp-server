<<<<<<< HEAD
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
=======
FROM node:14
#ENV NODE_ENV=production
WORKDIR /usr/src/app

#Add environmental variables
ARG COMPANY_USER 
ARG COMPANY_HOST
ARG COMPANY_DB
ARG COMPANY_PASSWORD
ARG COMPANY_JWT
#ARG COMPANY_PORT

ENV USER $COMPANY_USER
ENV HOST $COMPANY_HOST
ENV DB $COMPANY_DB
ENV PASSWORD $COMPANY_PASSWORD
ENV JWT_SECRET $COMPANY_JWT
#ENV PORT $COMPANY_PORT

COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 80
#RUN chown -R node /usr/src/app
#USER node
CMD ["node", "index.js"]
>>>>>>> c8e1701443723f3d4cb7dd50a9d1702bdd4e8059
