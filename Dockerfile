FROM node:22-alpine AS builder

ARG http_proxy
ARG https_proxy

USER node
WORKDIR /home/node

RUN npm config set proxy $http_proxy
RUN npm config set https-proxy $https_proxy

COPY package*.json ./
RUN npm ci  

COPY --chown=node:node . .

RUN npm run build

FROM nginx:1.23.0-alpine AS label-front

RUN for dir in client proxy fastcgi uwsgi scgi;do\
  mkdir /var/cache/nginx/${dir}_temp;\
  done

WORKDIR /home/nginx

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/gzip.conf /etc/nginx/gzip.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /home/node/build /usr/share/nginx/html/label/

CMD ["nginx", "-g", "daemon off;"]
