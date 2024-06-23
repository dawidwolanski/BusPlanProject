"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom"); // Założenie, że używasz React Router
const Panel = () => {
    const [loggedIn, setLoggedIn] = (0, react_1.useState)(false);
    const [user, setUser] = (0, react_1.useState)(null); // Typ danych użytkownika
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('userapi/status', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch login status');
                }
                const data = await response.json();
                if (data.loggedIn) {
                    setLoggedIn(true);
                    setUser(data.user);
                }
                else {
                    setLoggedIn(false);
                    navigate('/'); // Przekierowanie do strony logowania
                }
            }
            catch (error) {
                console.error('Error checking login status:', error);
                setLoggedIn(false);
            }
        };
        checkLoginStatus();
    }, [navigate]);
    if (!loggedIn) {
        return <div>Loading...</div>; // Można wyświetlić np. spinner
    }
    return (<div>
      <h2>User Panel</h2>
      {user && (<div>
          <p>Username: {user.username}</p>
          <p>User Type: {user.type}</p>
        </div>)}
      <button onClick={handleLogout}>Logout</button>
    </div>);
    async function handleLogout() {
        try {
            const response = await fetch('http://127.0.0.1:3001/userapi/logout', { method: 'POST' });
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            navigate('/'); // Przekierowanie po wylogowaniu
        }
        catch (error) {
            console.error('Logout error:', error);
        }
    }
};
exports.default = Panel;
//# sourceMappingURL=Panel.js.map