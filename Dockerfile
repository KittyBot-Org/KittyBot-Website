FROM nginx:stable-alpine

WORKDIR /home/kittybot-website

COPY dist/ /home/kittybot-website/

COPY nginx.conf /etc/nginx/nginx.conf

RUN apk --no-cache add curl

EXPOSE 80
