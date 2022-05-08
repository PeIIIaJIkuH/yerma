FROM node:alpine

WORKDIR /app

COPY . .

RUN npm i -g pnpm

RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "run", "dev;"]

#RUN pnpm run build

#FROM nginx:alpine
#
##!/bin/sh
#
#COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
#
### Remove default nginx index page
#RUN rm -rf /usr/share/nginx/html/*
#
## Copy from the stahg 1
#COPY --from=builder /app/dist /usr/share/nginx/html
#
#EXPOSE 3000
#
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
