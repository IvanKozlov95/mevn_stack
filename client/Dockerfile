from vuejs/ci

COPY ./ /opt/client
WORKDIR /opt/client
RUN npm i
ARG base_url
ENV BASE_URL=$base_url
ENTRYPOINT ["npm", "run", "start"]