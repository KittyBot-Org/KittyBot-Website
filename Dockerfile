FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY ./ .
RUN npm run build

FROM nginx:stable-alpine
RUN mkdir /app
COPY --from=build /app/dist /app
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN apk --no-cache add curl
EXPOSE 80
