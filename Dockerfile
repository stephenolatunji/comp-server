FROM node:14-alpine
RUN mkdir -p /usr/src/app

WORKDIR /usr/app

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


COPY package*.json /usr/app/
RUN npm install
COPY . /usr/app
EXPOSE 80


CMD ["npm", "start"]
