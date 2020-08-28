FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY ./ .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN apk --no-cache add curl
EXPOSE 80
