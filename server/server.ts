import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';
import apirouter from './routers/api';
import userapirouter from './routers/userapi';
import * as path from 'path';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(express.json());
app.use('/api', apirouter);
app.use('/userapi', userapirouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
