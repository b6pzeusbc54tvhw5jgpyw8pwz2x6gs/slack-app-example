# slack-app-example

## 디펜던시 설치

```shell
$ yarn install
```

## 환경변수 준비

```shell
export SLACK_TOKEN=xoxp-440000000000-440000000000-730000000000-80ffffffffffffffffffffffffffffd3
export SLACK_SIGNING_SECRET=6bffffffffffffffffffffffffffff0f
```

## 개발서버 실행

```shell
$ yarn dev
```

## local dynamodb 실행 및 table 생성

```shell
$ docker run -p 8000:8000 -d amazon/dynamodb-local
$ npx babel-node --extensions ".ts" -- bin/create-local-dynamodb-table.ts
```

## ngrok 실행
별도 터미널에서 실행

```shell
$ npx ngrok http 3000
```

