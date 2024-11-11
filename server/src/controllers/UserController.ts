// File: /src/controllers/userController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import DatabaseService from '../services/DatabaseService';
import LoginType from 'shared/Enums/LoginType'
import { UserRegistration } from 'shared/Interfaces/UserRegistration';
import { isEmail } from '../utils/utils';

export const getUserStatus = (req: Request, res: Response) => {
    if (req.session.user) {
        res.status(200).json({ loggedIn: true, user: req.session.user });
    } else {
        res.status(200).json({ loggedIn: false });
    }
};

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password, repeatedPassword }: UserRegistration = req.body;
    const requiredFields = { username, email, password, repeatedPassword };
    const missingFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

    if (missingFields.length > 0) {
        res.status(400).send(`Missing required fields: ${missingFields.join(', ')}`);
        return 
    }

    if (password !== repeatedPassword) {
        res.status(400).send('Passwords are not identical');
        return 
    }

    if (!isEmail(email)) {
        res.status(400).send('Invalid email format');
        return 
    }

    try {
        const existingUserByUsername = await DatabaseService.findUser({ input: username, type: LoginType.Username });
        
        if (existingUserByUsername) {
            res.status(400).send('User with this username already exists.');
            return 
        }

        const existingUserByEmail = await DatabaseService.findUser({ input: email, type: LoginType.Email });
        
        if (existingUserByEmail) {
            res.status(400).send('User with this email already exists.');
            return 
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await DatabaseService.insertUser({
            username,
            email,
            hashedPassword
        });

        res.status(201).send('User registered successfully');
        return 
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send('Internal server error');
        return 
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { input, password }: { input: string; password: string } = req.body;

    if (!input || !password) {
        res.status(400).send('Username and password are required.');
        return 
    }

    try {
        const type = isEmail(input) ? LoginType.Email : LoginType.Username;
        const user = await DatabaseService.findUser({ input, type });

        if (!user) {
            res.status(400).send('Invalid username or password.');
            return 
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            res.status(400).send('Invalid username or password.');
            return 
        }

        req.session.user = {
            id: user.id,
            email: user.email,
            username: user.username,
            type: user.type
        };

        res.status(200).send('Logged in successfully');
        return 
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Internal server error');
        return 
    }
};

export const logoutUser = (req: Request, res: Response) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).send('Logout failed');
            return
        }

        res.status(200).send('Logged out successfully');
        return 
    });
};