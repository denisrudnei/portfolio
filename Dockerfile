FROM node:latest

SHELL [ "/bin/bash", "-c" ]

WORKDIR /opt/portfolio

COPY ./ /opt/portfolio/

RUN npm install
RUN npm run build:server

EXPOSE 80

CMD npm run start:server