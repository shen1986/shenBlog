FROM ubuntu
LABEL maintainer="shenxf1986@qq.com"
ENV REFRESHED_AT 2019-03-18

RUN sed -i 's/http:\/\/archive.ubuntu.com\/ubuntu\//http:\/\/mirrors.163.com\/ubuntu\//g' /etc/apt/sources.list
RUN apt-get -qq update
RUN apt-get -qq install nodejs npm
RUN mkdir -p /var/log/nodeapp

ADD nodeapp /opt/nodeapp/

WORKDIR /opt/nodeapp
RUN npm install

VOLUME [ "/var/log/nodeapp" ]

EXPOSE 3000

CMD ["npm", "start"]