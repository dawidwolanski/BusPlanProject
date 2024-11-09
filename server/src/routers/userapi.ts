import 'dotenv/config';
import express, { Router, Request, Response } from 'express';
import session from 'express-session';
import DatabaseService from '../Services/DatabaseService';

const userapirouter: Router = express.Router();

userapirouter.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

userapirouter.get('/status', (req: Request, res: Response) => {
  if (req.session.user) {
    res.status(200).json({ loggedIn: true, user: req.session.user });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});


userapirouter.post('/login', async (req: Request, res: Response) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).send('Username and password are required.');
  }

  try {
    const user = await DatabaseService.findUser(login, password)

    if (!user) {
      return res.status(400).send('Invalid username or password.');
    }

    const isPasswordValid = password == user.password // tutaj mozna dorobic hashowanie

    if (!isPasswordValid) {
      return res.status(400).send('Invalid username or password.');
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      type: user.type
    };

    res.status(200).send('Logged in successfully');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Internal server error');
  }
});

userapirouter.post('/logout', (req: Request, res: Response) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Logout failed');
    }

    res.status(200).send('Logged out successfully');
  });
});

export default userapirouter;
