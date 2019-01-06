FROM golang  

RUN \
go get -v github.com/keybase/client/go/keybase/ && \
go install -tags production github.com/keybase/client/go/keybase

FROM node

RUN mkdir /keybase

COPY --from=0 /go/bin/keybase /bin

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY index.js /app

USER node

CMD ["node", "index.js"]