import { Session } from 'express-session';
import { User } from 'shared/Interfaces/User';

declare module 'express-session' {
  interface Session {
    user?: User
  }
}