import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import DatabaseService from '../services/DatabaseService';
import LoginType from 'shared/Enums/LoginType'
import { UserRegistration } from 'shared/Interfaces/UserRegistration';
import { isEmail } from '../utils/utils';

export const getUserStatus = (req: Request, res: Response) => {
    if (req.session.user) {
        
        res.status(200).json({ ok: 1, loggedIn: true, user: req.session.user });
    } else {
        res.status(200).json({ ok: 1, loggedIn: false });
    }
};

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password, repeatedPassword }: UserRegistration = req.body;
    const requiredFields = { username, email, password, repeatedPassword };
    const missingFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

    if (missingFields.length > 0) {
        res.status(200).json({ ok: 0, message: `Missing required fields: ${missingFields.join(', ')}` });
        return;
    }

    if (password !== repeatedPassword) {
        res.status(200).json({ ok: 0, message: 'Passwords are not identical' });
        return;
    }

    if (!isEmail(email)) {
        res.status(200).json({ ok: 0, message: 'Invalid email format' });
        return;
    }

    if (username.length < 3 || username.length > 20) {
        res.status(200).json({ ok: 0, message: 'Username must be between 3 and 20 characters' });
        return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
        res.status(200).json({ ok: 0, message: 'Username can only contain letters, numbers, and underscores' });
        return;
    }

    if (email.length > 254) {
        res.status(200).json({ ok: 0, message: 'Email must be less than 255 characters' });
        return;
    }

    if (password.length < 8) {
        res.status(200).json({ ok: 0, message: 'Password must be at least 8 characters long' });
        return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        res.status(200).json({ ok: 0, message: 'Password must contain at least one letter and one number' });
        return;
    }

    try {
        const existingUserByUsername = await DatabaseService.findUser({ input: username, type: LoginType.Username });
        
        if (existingUserByUsername) {
            res.status(200).json({ ok: 0, message: 'User with this username already exists.' });
            return;
        }

        const existingUserByEmail = await DatabaseService.findUser({ input: email, type: LoginType.Email });
        
        if (existingUserByEmail) {
            res.status(200).json({ ok: 0, message: 'User with this email already exists.' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await DatabaseService.insertUser({
            username,
            email,
            hashedPassword
        });

        res.status(201).json({ ok: 1, message: 'User registered successfully' });
        return;
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ ok: 0, message: 'Internal server error' });
        return;
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { input, password }: { input: string; password: string } = req.body;

    if (!input || !password) {
        res.status(200).json({ ok: 0, message: 'Username and password are required.' });
        return;
    }

    try {
        const type = isEmail(input) ? LoginType.Email : LoginType.Username;
        const user = await DatabaseService.findUser({ input, type });

        if (!user) {
            res.status(200).json({ ok: 0, message: 'Invalid username or password.' });
            return;
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            res.status(200).json({ ok: 0, message: 'Invalid username or password.' });
            return;
        }

        req.session.user = {
            id: user.id,
            email: user.email,
            username: user.username,
            type: user.type
        };

        res.status(200).json({ ok: 1, message: 'Logged in successfully', user: req.session.user, expiresAt: req.session.cookie.expires });
        return;
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ ok: 0, message: 'Internal server error' });
        return;
    }
};

export const logoutUser = (req: Request, res: Response) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ ok: 0, message: 'Logout failed' });
            return;
        }

        res.status(200).json({ ok: 1, message: 'Logged out successfully' });
        return;
    });
};