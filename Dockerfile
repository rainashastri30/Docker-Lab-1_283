Docker File:


FROM ubuntu:latest 
# NodeJS 
RUN apt-get update 
RUN apt-get -y install nodejs 
RUN apt-get -y install npm 
COPY . /src 
RUN cd /src; npm install express 
RUN npm install ejs
RUN npm install debug
RUN npm install mongoose
RUN npm install jade
EXPOSE 8080 
 
#MongoDB 
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/10gen.list 
RUN apt-get update && apt-get install -y mongodb-org 
RUN mkdir -p /data/db 
EXPOSE 27017 
WORKDIR /src 
#ENTRYPOINT ["/bin/bash"]
#ENTRYPOINT usr/bin/mongod
#CMD ["nodejs","/src/sampleStudent.js"]
