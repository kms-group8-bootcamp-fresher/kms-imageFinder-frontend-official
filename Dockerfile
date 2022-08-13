FROM node:12.7-alpine AS build
WORKDIR /dist/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm build --prod

FROM nginx:latest AS nginx
COPY --from=build /dist/src/app/dist/kms-imagefinder /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80
