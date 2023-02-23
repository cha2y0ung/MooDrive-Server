// src/index.ts
import express, { NextFunction, Request, response, Response } from "express";
import router from './router';
import cors from 'cors';
import config from './config';
import { ParsedQs } from "qs";

const app = express(); // express 객체 받아옴

const allowedOrigins = [
  'http://localhost:3000',
  'https://hyundai-hackathon-9.vercel.app',
  config.ec2URL,
];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
}

const PORT = 3000; // 사용할 port를 3000번으로 설정
app.use(cors(corsOptions));
app.use((req, res, next) => {
  const origin: string = req.headers.origin!;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, content-type, x-access-token',
  );
  next();
});

app.use(express.json()); // express 에서 request body를 json 으로 받아오겠다.
app.use(express.urlencoded({ extended: true }));
app.use("", router); // use -> 모든 요청
// localhost:8000/api -> api 폴더
// localhost:8000/api/user -> user.ts

//* HTTP method - GET
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("마! 이게 서버다!");
});

app.listen(PORT, () => {
  console.log(`
        #############################################
            🛡️ Server listening on port: ${PORT} 🛡️
        #############################################
    `);
}); // 8000 번 포트에서 서버를 실행하겠다!