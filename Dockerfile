FROM python:3-alpine

RUN apk --update add --no-cache \
    g++ \
    git \
    make \
    musl-dev \
    nodejs \
    curl \
    tar \
    && rm -rf /var/cache/apk/*

COPY app/package.json app/package.json

WORKDIR /app

RUN npm install

COPY app /app

RUN npm run lint
RUN npm run build:debug

CMD /app/deploy.sh
