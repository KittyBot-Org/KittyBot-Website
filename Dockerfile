FROM nginx:stable-alpine

WORKDIR /home/kittybot-website

COPY dist .

COPY nginx.conf /etc/nginx/nginx.conf

RUN apk --no-cache add curl

EXPOSE 80
