from vuejs/ci

COPY ./ /opt/client
WORKDIR /opt/client
RUN npm i
ARG host
ARG base_url
ENV HOST=$host
ENV BASE_URL=$base_url
ENTRYPOINT ["npm", "run", "start"]

# docker build --build-arg base_url=http://192.168.99.100:3000 --build-arg host=0.0.0.0 -t vue-app .