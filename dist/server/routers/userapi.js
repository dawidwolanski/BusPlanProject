"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const DatabaseService_1 = __importDefault(require("../Services/DatabaseService"));
const userapirouter = express_1.default.Router();
userapirouter.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
userapirouter.get('/status', (req, res) => {
    if (req.session.user) {
        res.status(200).json({ loggedIn: true, user: req.session.user });
    }
    else {
        res.status(200).json({ loggedIn: false });
    }
});
userapirouter.post('/login', async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) {
        return res.status(400).send('Username and password are required.');
    }
    try {
        const user = await DatabaseService_1.default.findUser(login, password);
        if (!user) {
            return res.status(400).send('Invalid username or password.');
        }
        const isPasswordValid = password == user.password; // tutaj mozna dorobic hashowanie
        if (!isPasswordValid) {
            return res.status(400).send('Invalid username or password.');
        }
        req.session.user = {
            id: user.id,
            username: user.username,
            type: user.type
        };
        res.status(200).send('Logged in successfully');
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Internal server error');
    }
});
userapirouter.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.status(200).send('Logged out successfully');
    });
});
exports.default = userapirouter;
//# sourceMappingURL=userapi.js.map