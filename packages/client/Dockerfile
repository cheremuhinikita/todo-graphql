FROM node:14-alpine as build

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY packages/common ./packages/common
COPY packages/client ./packages/client

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /usr/src/app/packages/common
RUN yarn build

WORKDIR /usr/src/app/packages/client
RUN yarn build

FROM nginx:stable-alpine

WORKDIR /usr/src/app

COPY packages/client/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/packages/client/build /usr/share/nginx/html

EXPOSE $CLIENT_PORT
CMD ["nginx", "-g", "daemon off;"]