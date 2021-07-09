FROM node:14-alpine as build

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY packages/common ./packages/common
COPY packages/api ./packages/api

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /usr/src/app/packages/common
RUN yarn build

WORKDIR /usr/src/app/packages/api
RUN yarn build

FROM node:14-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

COPY --from=build /usr/src/app/packages/common/package.json /usr/src/app/packages/common/package.json
COPY --from=build /usr/src/app/packages/common/dist /usr/src/app/packages/common/dist

COPY --from=build /usr/src/app/packages/api/package.json /usr/src/app/packages/api/package.json
COPY --from=build /usr/src/app/packages/api/dist /usr/src/app/packages/api/dist

ENV NODE_ENV production

RUN yarn install --pure-lockfile --non-interactive --production

WORKDIR /usr/src/app/packages/api

EXPOSE $API_PORT
CMD ["npm", "run", "prod"]