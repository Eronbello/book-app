FROM node:8-alpine

ENV NODE_ENV="development" \
  APP="/app"

RUN mkdir -p $APP
WORKDIR $APP

COPY package.json $APP/

# Install dependencies
RUN apk add --no-cache git
RUN npm install


CMD ["npm", "run", "serve"]

EXPOSE 8080
