import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';
import apirouter from './routers/api';
import userapirouter from './routers/userapi';
import restrictedRouter from './routers/restricted';
import * as path from 'path';
import https from 'https';
import fs from 'fs';
import session from 'express-session';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3001;

const privateKey = fs.readFileSync(path.join(__dirname, '..', 'certificates', 'server.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, '..', 'certificates', 'server.crt'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:5137'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: true,
    httpOnly: true,
    sameSite: 'none'
  }
}));

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(express.json());

app.use('/api', apirouter);
app.use('/api/user', userapirouter);
app.use('/', restrictedRouter);

https.createServer(credentials, app).listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
