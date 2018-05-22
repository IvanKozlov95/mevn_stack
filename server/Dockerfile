FROM node

COPY ./ /opt/server
WORKDIR /opt/server
RUN npm i
ARG mongodb
ENV MONGODB_URI=$mongodb
ENTRYPOINT ["npm", "run", "start"]

# docker build --build-arg mongodb=mongodb://192.168.99.100/ -t rest-server .
