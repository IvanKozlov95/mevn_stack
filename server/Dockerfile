FROM node

COPY ./ /opt/server
WORKDIR /opt/server
RUN npm i
ARG mongodb
ENV MONGODB_URI=$mongodb
ENTRYPOINT ["npm", "run", "start"]