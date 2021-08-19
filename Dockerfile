FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app

#Add environmental variables
ARG COMPANY_USER 
ARG COMPANY_HOST
ARG COMPANY_DB
ARG COMPANY_PASSWORD
ARG COMPANY_JWT
ARG COMPANY_PORT

ENV USER $COMPANY_USER
ENV HOST $COMPANY_HOST
ENV DB $COMPANY_DB
ENV PASSWORD $COMPANY_PASSWORD
ENV JWT_SECRET $COMPANY_JWT
ENV PORT $COMPANY_PORT

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 80
RUN chown -R node /usr/src/app
USER node
CMD ["node", "index.js"]
