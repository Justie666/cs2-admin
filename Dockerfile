FROM node:alpine as build

COPY package.json package.json
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /dist /usr/share/nginx/html/2
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3001

CMD ["nginx", "-g", "daemon off;"]